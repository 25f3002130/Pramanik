import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f8faf8",
          100: "#eef2ee",
          200: "#d6dfd8",
          300: "#b3c0b8",
          400: "#809088",
          500: "#5e6d65",
          600: "#46534c",
          700: "#313b36",
          800: "#202722",
          900: "#121613"
        },
        brand: {
          50: "#effaf4",
          100: "#d6f4e1",
          200: "#a8e9c2",
          300: "#70dba0",
          400: "#3fcf86",
          500: "#1cb26e",
          600: "#128454",
          700: "#0f6643",
          800: "#0d5036",
          900: "#0a3f2b"
        },
        sand: {
          50: "#fcfaf6",
          100: "#f6f1e8",
          200: "#eadfcf",
          300: "#d2c0a8",
          400: "#b79f7f",
          500: "#947c60",
          600: "#745e49",
          700: "#554530",
          800: "#3a3022",
          900: "#241d15"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(18, 22, 19, 0.08)",
        lift: "0 18px 50px rgba(18, 22, 19, 0.12)"
      },
      backgroundImage: {
        "veritas-grid":
          "radial-gradient(circle at 1px 1px, rgba(18,22,19,0.08) 1px, transparent 0)",
        "veritas-glow":
          "radial-gradient(circle at top, rgba(28,178,110,0.16), transparent 45%), radial-gradient(circle at bottom right, rgba(179,192,184,0.36), transparent 42%)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
