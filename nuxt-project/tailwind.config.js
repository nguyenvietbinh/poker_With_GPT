module.exports = {
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './composables/**/*.{vue,js}',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example custom color
      },
    },
  },
  plugins: [require('daisyui')],
}
