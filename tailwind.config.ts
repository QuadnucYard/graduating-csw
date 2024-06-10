import type { Config } from "tailwindcss";


export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: ["selector", '[theme="dark"]'],
  plugins: [],
} satisfies Config;
