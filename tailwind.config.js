/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        secondary: {
          light: '#F5F5F5',
          dark: '#1A1A1A',
        },
        accent: {
          light: '#FF4D8F',
          dark: '#FF3333',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      cursor: {
        'custom-light': 'url("/cursors/cursor-light.png"), auto',
        'custom-dark': 'url("/cursors/cursor-dark.png"), auto',
      },
    },
  },
  plugins: [],
} 