import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/theme-context';

type Props = {
  /** Extra classes for placement; visual styling stays owned here. */
  className?: string;
};

/**
 * Light/dark switch for the navbar. The two icons are stacked and cross-faded
 * rather than swapped, which keeps the button from reflowing mid-transition —
 * the same rotate/scale trick the mobile menu button already uses.
 */
export default function ThemeToggle({ className = '' }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-10 h-10 shrink-0 rounded-lg border border-line bg-surface/70 text-fg-muted hover:text-fg hover:bg-surface-2 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${className}`}
    >
      <Sun
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] transition-all duration-300 ${
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
        }`}
      />
    </button>
  );
}
