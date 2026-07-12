/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#eef7f1',
          100: '#d5ecdc',
          200: '#aad9ba',
          300: '#7cc396',
          400: '#4fa872',
          500: '#358a58',
          600: '#296f46',
          700: '#22583a',
          800: '#1b4332',
          900: '#123024',
        },
        leaf: {
          400: '#6fbf73',
          500: '#40916c',
          600: '#2f7a56',
        },
        harvest: {
          300: '#f2d38a',
          400: '#e9c46a',
          500: '#d9a441',
        },
        sage: {
          50: '#f6faf7',
          100: '#f1f8f4',
        },
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(27, 67, 50, 0.08), 0 8px 24px -8px rgba(27, 67, 50, 0.10)',
        card: '0 1px 2px rgba(27,67,50,0.06), 0 6px 16px -6px rgba(27,67,50,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
