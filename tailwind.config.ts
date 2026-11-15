import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#05070D",
          900: "#090D16",
          850: "#0E1524",
          800: "#131C31",
          700: "#1E2B4A",
          600: "#2A3C66",
        },
        nasa: {
          blue: "#0B3D91",
          orange: "#FC3D21",
          cyan: "#00E5FF",
          emerald: "#10B981",
          amber: "#F59E0B",
          ruby: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radar 4s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
