import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#181716",
        paper: "#fbfaf7",
        line: "#ded8ce",
        moss: "#68745f",
        clay: "#9b654c",
        denim: "#40566f",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
