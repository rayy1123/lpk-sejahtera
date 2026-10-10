/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#163A5F', // Navy Blue resmi LPK
          light: '#235384',
          dark: '#0E2640',
        },
        secondary: {
          DEFAULT: '#16A6A1', // Teal resmi LPK
          light: '#20C5BF',
          dark: '#0E7A76',
        },
        surface: {
          light: '#FFFFFF',
          muted: '#F5F7FA', // Abu-abu terang background
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
