'use client';

import { useServerInsertedHTML } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

const COOKIE_NAME = 'active_theme';
const DEFAULT_THEME = 'default';

function setThemeCookie(theme: string) {
  if (typeof window === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === 'https:' ? 'Secure;' : ''
  }`;
}

function getThemeFromCookies(): string {
  if (typeof document === 'undefined') return DEFAULT_THEME;

  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${COOKIE_NAME}=`));

  if (cookie) {
    const cookieTheme = cookie.split('=')[1];
    if (cookieTheme) return cookieTheme;
  }

  return DEFAULT_THEME;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState<string>(DEFAULT_THEME);

  // Inject script to read theme from cookie before React hydration
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            try {
              const themeCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('active_theme='));
              if (themeCookie) {
                const theme = themeCookie.split('=')[1];
                document.body.classList.add('theme-' + theme);
              }
            } catch (e) {}
          })();
        `
        }}
      />
    );
  });

  // Only run once after hydration is complete
  useEffect(() => {
    const initialTheme = getThemeFromCookies();
    setActiveTheme(initialTheme);
    setMounted(true);
  }, []);

  // Apply theme changes after component is mounted
  useEffect(() => {
    if (!mounted) return;

    setThemeCookie(activeTheme);

    Array.from(document.body.classList)
      .filter(className => className.startsWith('theme-'))
      .forEach(className => {
        document.body.classList.remove(className);
      });

    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith('-scaled')) {
      document.body.classList.add('theme-scaled');
    }
  }, [activeTheme, mounted]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useThemeConfig must be used within an ActiveThemeProvider'
    );
  }
  return context;
}
