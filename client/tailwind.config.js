const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './src/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Nunito Sans', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
      black: 900,
    },
    colors: {
      green: colors.lime,
      gray: colors.gray,
      blue: colors.cyan,
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
