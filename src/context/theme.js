// src/context/theme.js
import React, { useState, useEffect, useMemo, createContext } from "react";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  GlobalStyles,
  StyledEngineProvider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Utility to get initial theme from localStorage
const getInitialMode = () => {
  const saved = localStorage.getItem("themeMode");
  return saved === "dark" ? "dark" : "light";
};

const darkGlobalStyles = {
  ":root": {
    "--text-light": "#e2e8f0",
    "--text-lighter": "#94a3b8",
    "--heading-color": "#ffffff",
    "--accent-blue": "#3b82f6",
    "--accent-blue-dark": "#1e3a8a",
    colorScheme: "dark",
  },
  body: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    color: "var(--text-light)",
    backgroundColor: "hsl(240, 10%, 3.9%)",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  h1: { color: "var(--heading-color)", margin: "0.5em 0", fontWeight: 600 },
  /* ... other headings and elements same as before ... */
};

const lightGlobalStyles = {
  body: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    color: "#000000",
    backgroundColor: "#ffffff",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
  h1: { color: "#000000", margin: "0.5em 0", fontWeight: 600 },
  /* ... other headings and elements same as before ... */
};
export const ThemeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Joy theme with light/dark schemes
  const joyTheme = useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: { palette: { mode: "light" } },
          dark: { palette: { mode: "dark" } },
        },
      }),
    []
  );

  // MUI Material theme
  const muiTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  // Toggle handler
  const handleToggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <CssVarsProvider theme={joyTheme} mode={mode} disableTransitionOnChange>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={mode === "dark" ? darkGlobalStyles : lightGlobalStyles}
          />
          <IconButton onClick={handleToggle} sx={{}}>
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </CssVarsProvider>
  );
}
