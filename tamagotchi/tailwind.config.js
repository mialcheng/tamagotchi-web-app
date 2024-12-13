/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hoverdarkblue: "#142545",
        darkblue: "#1D3461",
        lightblue: "#89CFF0",
        hoverlightblue: "#6EC6FF",
        periwinkle: "#8F99FB",
        hoverperiwinkle: "#5A6DFF",
        pink: "#FFD1DC",
        white: "#F8F7FF",
      },
    },
  },
  plugins: [],
};
