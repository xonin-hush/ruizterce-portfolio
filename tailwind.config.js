/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import themer from "tailwindcss-themer";

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 -1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      dropShadow: {
        primary: "0 0 5px #BF0A30",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
      animation: {
        orbit: "orbit 7s linear infinite",
        "orbit-inverse":
          "orbit-inverse 5s cubic-bezier(0.5, 0.25, 0.4, 0.7) infinite",
        "custom-pulse": "custom-pulse 2s infinite",
      },
      keyframes: {
        "custom-pulse": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [
    themer({
      defaultTheme: {
        extend: {
          colors: {
            primary: "#BF0A30",
            primaryContrast: "#3d344d",
            secondary: "#8c95f2",
            accent: "#38c172",
            light: "#f5f5f4",
            lightMild: "#e7e5e4",
            lightMedium: "#a8a29e",
            medium: "#78716c",
            darkMedium: "#44403c",
            darkMild: "#292524",
            dark: "#1c1917",
          },
        },
      },
      themes: [
        {
          name: "darkTheme",
          selectors: [".dark-mode"],
          extend: {
            colors: {
              // Lighter shade of the light-theme #BF0A30 so the red stays
              // legible on the near-black dark background (pure #BF0A30 there
              // is only ~2.6:1 contrast).
              primary: "#E63946",
              primaryContrast: "#3d344d",
              secondary: "#34cba5",
              accent: "#14b8a6",
              light: "#1c1917",
              lightMild: "#292524",
              lightMedium: "#44403c",
              medium: "#78716c",
              darkMedium: "#a8a29e",
              darkMild: "#e7e5e4",
              dark: "#f5f5f4",
            },
          },
        },
      ],
    }),
    plugin(({ addUtilities, theme }) => {
      const textShadowUtilities = Object.fromEntries(
        Object.entries(theme("textShadow")).map(([key, value]) => [
          `.text-shadow-${key}`,
          { textShadow: value },
        ])
      );
      addUtilities(textShadowUtilities);
    }),
  ],
};
