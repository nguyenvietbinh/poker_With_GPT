module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'bs': '12px 12px 12px rgba(0, 0, 0, 0.1), -10px -10px 10px rgb(255, 255, 255)'
      }
    },
  },
  plugins: [],
}