// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDF5EB', // light beige from logo
        primary: '#2C7A7B',    // deep teal
        accent: '#F4A300',     // orange saffron
        ayurBrown: '#703A20',  // brown text
        softGreen: '#4D9C81'   // secondary green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'hero-watermark': "url('/src/assets/niramaya-logo.svg')" // You can customize this path
      },
    },
  },
  plugins: [],
}


