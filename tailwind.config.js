module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#00A14B',
        secondary: {
          100: '#1C75BC',
          200: '#231f20'
        }
      },
      spacing: {
        '95': '95%',
        'logo': '10rem',
        'usertools': '3rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
