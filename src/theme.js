import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: "#6C63FF",
      background: "#0F172A",
      surface: "#1E293B",
      text: "#F8FAFC",
      success: "#34D399",
      danger: "#EF4444",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "24px",
      5: "32px",
    },
    fontSizes: {
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    radii: {
      sm: "4px",
      md: "8px",
      lg: "12px",
    },
  },
  media: {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },
});

export const globalStyles = globalCss({
  body: {
    backgroundColor: "$background",
    color: "$text",
    fontFamily: "Inter, sans-serif",
  },
});
