import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ThemeContext,
  THEME_STORAGE_KEY,
  readStoredTheme,
  systemTheme,
  type Theme,
} from './theme-context';

/** The class the bootstrap script in index.html has already put on <html>. */
function currentDocumentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  // The bootstrap script ran before React mounted, so the document is already
  // correct — read from it rather than recomputing and risking a mismatch.
  const [theme, setThemeState] = useState<Theme>(currentDocumentTheme);
  const [isSystem, setIsSystem] = useState(() => readStoredTheme() === null);

  // Single writer for the document: everything else just moves this state.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, [theme]);

  // Only track the OS while the user hasn't made an explicit choice.
  useEffect(() => {
    if (!isSystem) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setThemeState(systemTheme());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [isSystem]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setIsSystem(false);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage unavailable — the theme still applies for this session.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Storage unavailable — the theme still applies for this session.
      }
      return next;
    });
    setIsSystem(false);
  }, []);

  const value = useMemo(
    () => ({ theme, isSystem, setTheme, toggleTheme }),
    [theme, isSystem, setTheme, toggleTheme]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
