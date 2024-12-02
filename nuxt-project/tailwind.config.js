module.exports = {
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './composables/**/*.{vue,js}',
    './nuxt.config.ts', // Don't forget to include nuxt.config.ts for full build-time purging
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example custom color
      },
    },
  },
  plugins: [],
}
