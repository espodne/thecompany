/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'oracle': ['var(--font-oracle)', 'ABC Oracle Cyrillic Plus Variable Unlicensed Trial', 'Arial', 'Helvetica', 'sans-serif'],
        'sans': ['var(--font-oracle)', 'ABC Oracle Cyrillic Plus Variable Unlicensed Trial', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontVariationSettings: {
        'trip-1': "'TRIP' 1",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
}
