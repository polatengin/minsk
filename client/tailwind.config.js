module.exports = {
  purge: [
    './src/**/*.html'
  ],
  darkMode: false,
  theme: {
    extend: {
      transitionDuration: {
        '10000': '10000ms',
        '60000': '60000ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
