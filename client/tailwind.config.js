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
      keyframes: {
        marquee: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-100%, 0)" },
        }
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
