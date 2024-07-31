import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        xl: "1600px",
      },
      colors: {
        btnPrimary: "#0073C6",
        greenPrimary: "#148B16",
        bgPrimary: "#f1f1f1",
      },
      fontSize: {
        h2: "18px",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
