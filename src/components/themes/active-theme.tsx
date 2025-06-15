'use client';

import { useServerInsertedHTML } from 'next/navigation';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';

import { baseThemes } from '@/lib/themes';

const COOKIE_NAME = 'active_theme';
const DEFAULT_THEME = baseThemes[0].name;

// useIsClient hook - widely recommended pattern for Next.js
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

function setThemeCookie(theme: string) {
  if (typeof window === 'undefined') return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === 'https:' ? 'Secure;' : ''
  }`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const [activeTheme, setActiveTheme] = useState<string>(DEFAULT_THEME);

  // Server-inserted script - runs before hydration
  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            try {
              const themeCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('${COOKIE_NAME}='));
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

  // Only run after hydration is complete to set initial theme
  useEffect(() => {
    if (!isClient) return;

    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`));

    if (cookie) {
      const cookieTheme = cookie.split('=')[1];
      if (cookieTheme && cookieTheme !== activeTheme) {
        setActiveTheme(cookieTheme);
      }
    } else if (activeTheme !== DEFAULT_THEME) {
      // If no cookie and activeTheme is not default, reset to default
      setActiveTheme(DEFAULT_THEME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  // Apply theme changes after component is mounted
  useEffect(() => {
    if (!isClient) return;

    setThemeCookie(activeTheme);

    // Update body classes
    Array.from(document.body.classList)
      .filter(className => className.startsWith('theme-'))
      .forEach(className => {
        document.body.classList.remove(className);
      });

    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith('-scaled')) {
      document.body.classList.add('theme-scaled');
    }
  }, [activeTheme, isClient]);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setActiveTheme,
        // Only expose ready state when we know client hydration is complete
        ready: isClient
      }}
    >
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
