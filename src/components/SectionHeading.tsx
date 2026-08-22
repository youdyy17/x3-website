import type { ReactNode } from 'react';

type Props = {
  /** Small uppercase kicker label above the title. Omit to render none (e.g. CTASection). */
  eyebrow?: string;
  title: ReactNode;
  /** Lead paragraph under the title. Omit for sections whose body is custom content. */
  description?: ReactNode;
  /**
   * Heading scale. 'default' (text-3xl/4xl/5xl) is the section-intro size used
   * by most sections; 'large' (text-4xl/5xl/6xl) matches the Hero/CTA tier.
   * Also sets the description's text size (text-lg / text-xl).
   */
  size?: 'default' | 'large';
  /** Space below the title: '' / mb-6 / mb-8. */
  titleSpacing?: 'none' | 'default' | 'loose';
  /** Space below the description: '' / mb-12. Only CTASection needs 'loose' today. */
  descriptionSpacing?: 'none' | 'loose';
};

const TITLE_SIZE = {
  default: 'text-3xl sm:text-4xl lg:text-5xl',
  large: 'text-4xl sm:text-5xl lg:text-6xl',
} as const;

const TITLE_SPACING = {
  none: '',
  default: 'mb-6',
  loose: 'mb-8',
} as const;

const DESCRIPTION_SIZE = {
  default: 'text-lg',
  large: 'text-xl',
} as const;

const DESCRIPTION_SPACING = {
  none: '',
  loose: 'mb-12',
} as const;

/**
 * Shared section-intro markup: eyebrow + title + optional lead paragraph.
 * Renders only that inner block — each section keeps its own outer wrapper
 * (alignment, max-width, and the IntersectionObserver fade-in) untouched.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  size = 'default',
  titleSpacing = 'default',
  descriptionSpacing = 'none',
}: Props) {
  return (
    <>
      {eyebrow && (
        <div className="mb-4">
          <span className="text-xs font-bold tracking-[0.2em] text-fg-subtle uppercase">{eyebrow}</span>
        </div>
      )}
      <h2 className={`font-bold text-fg ${TITLE_SIZE[size]} ${TITLE_SPACING[titleSpacing]}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-fg-muted max-w-2xl mx-auto leading-relaxed ${DESCRIPTION_SIZE[size]} ${DESCRIPTION_SPACING[descriptionSpacing]}`}>
          {description}
        </p>
      )}
    </>
  );
}
