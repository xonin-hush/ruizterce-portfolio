import { useEffect, useState } from "react";

const STORAGE_KEY = "xonin-dark-mode";

// Route changes remount the page components, so the theme lives in storage
// rather than in whichever page happens to be mounted.
const readStored = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false; // Storage can throw in private browsing — fall back to light.
  }
};

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(isDarkMode));
    } catch {
      // A failed write only costs persistence, so let the toggle stand.
    }
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;
