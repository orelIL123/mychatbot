module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0078ff',
        secondary: '#f0f4f8',
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
