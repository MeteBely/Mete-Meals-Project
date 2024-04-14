/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coolGray: {
          200: '#f5f6f8',
          DEFAULT: '#6a6d75',
        },
        orange: {
          500: '#f26c29',
        },
        blue: {
          700: '#002684;',
        },
      },
      backgroundImage: {
        redeemDiv: "url('https://media.blueapron.com/assets/learn-more/homepage-hero-c0aa1f5417cb80adfae9725bfa4acf54a5fc53604add3ac801ddeb8e115aa58b.jpg')",
      },
    },
  },
  plugins: [],
};
