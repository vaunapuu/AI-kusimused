import { useEffect, useState } from "react";

// Define valid CSS variables as constants
const VALID_VARIABLES = {
  "host-primary": "--host-primary",
  "host-primary-dark": "--host-primary-dark",
  "host-primary-darker": "--host-primary-darker",
  "host-body-bg": "--host-body-bg",
} as const;

type ValidVariableKey = keyof typeof VALID_VARIABLES;

const ThemeHandler = ({ children }: { children?: React.ReactNode }) => {
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const root = document.documentElement;

    // Helper function to validate hex color
    const isValidHexColor = (color: string): boolean => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
    };

    // Process each URL parameter
    urlParams.forEach((value, key) => {
      const variableKey = key as ValidVariableKey;

      if (VALID_VARIABLES[variableKey]) {
        if (isValidHexColor(value)) {
          root.style.setProperty(VALID_VARIABLES[variableKey], value);
        } else {
          console.warn(
            `Invalid color value for ${key}: ${value}. Must be a hex color (e.g., #005aa7)`
          );
        }
      }
    });

    // Mark theme as ready
    setIsThemeReady(true);

    // Cleanup function
    return () => {
      Object.values(VALID_VARIABLES).forEach((cssVar) => {
        root.style.removeProperty(cssVar);
      });
    };
  }, []);

  if (!isThemeReady) {
    // Return an invisible div that takes up space to prevent layout shift
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
};

export default ThemeHandler;
