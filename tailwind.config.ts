import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gruvbox: {
          light: {
            background: "#fbf1c7", // Gruvbox Light Medium Background
            foreground: "#3c3836", // Gruvbox Dark Text
            primary: "#d65d0e", // Orange Accent
            secondary: "#b16286", // Purple
            highlight: "#458588", // Blue
          },
          dark: {
            background: "#282828", // Gruvbox Dark Medium Background
            foreground: "#ebdbb2", // Gruvbox Light Text
            primary: "#fe8019", // Orange Accent
            secondary: "#d3869b", // Purple
            highlight: "#83a598", // Blue
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
