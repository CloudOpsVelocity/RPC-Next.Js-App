import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        btnPrimary: "#0073C6",
        greenPrimary: "#148B16",
      },
      fontSize: {
        h2: "18px",
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
