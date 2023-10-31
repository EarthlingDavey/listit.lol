import { useFetcher } from '@remix-run/react';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

/**
 * @see https://www.mattstobbs.com/remix-dark-mode/
 * @see https://github.com/remix-run/examples/blob/main/dark-mode/app/utils/theme-provider.tsx
 */

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
  return typeof value === 'string' && themes.includes(value as Theme);
}

/**
 * This is the context that will be used to set the theme.
 */

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * This is the provider that will be used to set the theme.
 */

function ThemeProvider({
  children,
  specifiedTheme,
}: {
  children: ReactNode;
  specifiedTheme: Theme | null;
}) {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (isTheme(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }
    // there's no way for us to know what the theme should be in this context
    // the client will have to figure it out before hydration.
    if (typeof window !== 'object') {
      return null;
    }

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  // TODO: remove this when persistTheme is memoized properly
  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    // This catches the initial render which isn't a theme change.
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    persistThemeRef.current.submit(
      { theme },
      { action: 'action/set-theme', method: 'post' },
    );
  }, [theme]);

  // On mount add a listener for the media query.
  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersDarkMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.DARK : Theme.LIGHT);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * This is the hook that will be used to get the theme.
 * It will throw an error if it is used outside of a ThemeProvider.
 * It saves us from having to import the context and useContext.
 */

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Code that is inlined on the client to prevent a flash of the wrong theme.
 * It is not relatted to react or Remix.
 */

const prefersDarkMQ = '(prefers-color-scheme: dark)';
const getPreferredTheme = () =>
  window.matchMedia(prefersDarkMQ).matches ? Theme.DARK : Theme.LIGHT;

/**
 * If the warning is triggered in this code it has triggered an unexpected code path.
 * This script shouldn't exist if the theme is already applied!
 * @see https://www.mattstobbs.com/remix-dark-mode/
 * > Hi there, could you let Matt know you're seeing this message? Thanks!
 */

const clientThemeCode = `
// hi there dear reader 👋
// this is how I make certain we avoid a flash of the wrong theme. If you select
// a theme, then I'll know what you want in the future and you'll not see this
// script anymore.
;(() => {
  const theme = window.matchMedia('${prefersDarkMQ}').matches
    ? '${Theme.DARK}'
    : '${Theme.LIGHT}';

  const cl = document.documentElement.classList;
  if (
    cl.contains('${Theme.LIGHT}') || cl.contains('${Theme.DARK}')
  ) {
    // The theme is already applied...
    // this script shouldn't exist if the theme is already applied!
    console.warn("See theme-provider.tsx>clientThemeCode>cl.contains");
    // Hi there, could you let me know you're seeing this console.warn? Thanks!
  } else {
    cl.add(theme);
  }

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    meta.content = theme === '${Theme.DARK}' ? 'dark light' : 'light dark';
  } else {
    console.warn("See theme-provider.tsx>clientThemeCode>meta");
    // Hey, could you let me know you're seeing this console.warn? Thanks!
  }
})();
`
  // The replace regex is used to minify the script.
  // Remove double slash comments & replace excess white space with a single space.
  .replace(/((?<=[^:])\/\/.*|\s)+/g, ' ')
  .trim();

function NonFlashOfWrongThemeEls({ ssrTheme }: { ssrTheme: boolean }) {
  const [theme] = useTheme();
  return (
    <>
      <meta
        name="color-scheme"
        content={theme === Theme.LIGHT ? 'light dark' : 'dark light'}
      />
      {ssrTheme ? null : (
        <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
      )}
    </>
  );
}

export { NonFlashOfWrongThemeEls, Theme, ThemeProvider, isTheme, useTheme };
