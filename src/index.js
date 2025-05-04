import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const container = document.getElementById("root");
const root = createRoot(container);
const joyTheme = extendTheme({
  colorSchemes: {
    light: { palette: { mode: "light" } },
    dark: { palette: { mode: "dark" } },
  },
});
// Immediately check localStorage when page loads
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  const root = document.documentElement;

  if (savedTheme === "light") {
    root.style.setProperty("--background-color", "#f2f2f2");
  }
});
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <CssVarsProvider theme={joyTheme} disableTransitionOnChange>
          <App />
        </CssVarsProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
