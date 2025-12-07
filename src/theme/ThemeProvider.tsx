import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "bdms.theme";

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedValue = window.localStorage.getItem(
    STORAGE_KEY
  ) as ThemeMode | null;
  if (storedValue === "light" || storedValue === "dark") {
    return storedValue;
  }
  return "light";
};

const applyThemeClass = (theme: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const initialTheme = getPreferredTheme();
    applyThemeClass(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    applyThemeClass(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (_event: MediaQueryListEvent) => {
      const storedValue = window.localStorage.getItem(
        STORAGE_KEY
      ) as ThemeMode | null;
      if (storedValue === "light" || storedValue === "dark") {
        setThemeState(storedValue);
        return;
      }
      // No stored preference: keep the current selection (default is light).
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const setTheme = (value: ThemeMode) => {
    setThemeState(value);
  };

  const toggleTheme = () => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  };

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};
