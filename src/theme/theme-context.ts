import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

/** Kept in sync with the no-flash bootstrap script in index.html. */
export const THEME_STORAGE_KEY = 'x3-theme';

export type ThemeContextValue = {
  /** The theme actually applied to the document. */
  theme: Theme;
  /** True while the theme is still following the OS rather than an explicit choice. */
  isSystem: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

/** Reads the stored preference. Returns null when the user has never chosen. */
export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    // Safari private mode / storage disabled — fall back to the OS preference.
    return null;
  }
}

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
