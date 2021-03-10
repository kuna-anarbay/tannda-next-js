module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#00457C",
        primary: {
          50: "#D9DCDF",
          100: "#CFD6DB",
          200: "#B7C5D0",
          300: "#A1B6C6",
          400: "#89A5BB",
          500: "#7294B0",
          600: "#5C85A6",
          700: "#45759C",
          800: "#2E6591",
          900: "#175587"
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
