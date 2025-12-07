// Design System Theme - Based on DESIGN_SYSTEM.md

export const theme = {
  colors: {
    background: "#F5F5F5",
    surface: "#F9F9FA",
    text: {
      primary: "#1D2227",
      secondary: "#9AA6B2",
      disabled: "#DCDCDC",
    },
    semantic: {
      info: "#4C98FD",
      success: "#1A7E33",
      warning: "#745D00",
      error: "#A60003",
    },
    primary: "#3B5998", // Primary Blue from design
    shadow: "rgba(29, 34, 39, 0.1)",
  },
  typography: {
    fontFamily: {
      primary: "'Inter', sans-serif",
    },
    fontSize: {
      h1: "1.5rem", // 24px
      h2: "1.375rem", // 22px
      h3: "1.125rem", // 18px
      h4: "1rem", // 16px
      body: "1rem", // 16px
      small: "0.875rem", // 14px
      tiny: "0.75rem", // 12px
    },
    fontWeight: {
      thin: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
    xxxl: "4rem", // 64px
  },
  borderRadius: {
    none: 0,
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "1rem", // 16px
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
  },
  transitions: {
    duration: {
      fast: "150ms",
      normal: "250ms",
      slow: "350ms",
    },
    easing: {
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  iconSizes: {
    sm: "1rem", // 16px
    md: "1.25rem", // 20px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  layout: {
    sidebar: {
      expanded: "240px",
      collapsed: "64px",
    },
    navbar: {
      height: "64px",
    },
  },
} as const;

export type Theme = typeof theme;
