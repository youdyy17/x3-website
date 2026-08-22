type Props = {
  className?: string;
};

/**
 * The "Cursor Mark" wordmark — Geist Bold "X3" with a trailing accent bar
 * built from the same shape as the hero's .typing-cursor. Font size on the
 * wrapper drives the whole mark's scale.
 */
export default function Logo({ className = '' }: Props) {
  return (
    <span className={`font-heading font-bold tracking-tight text-fg ${className}`}>
      X3
      <span className="logo-cursor" aria-hidden="true" />
      <span className="sr-only">X3 Software Solution</span>
    </span>
  );
}
