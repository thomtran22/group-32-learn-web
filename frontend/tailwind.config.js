/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1280px",
    },
    extend: {
      colors: {
        'color-text-dark': '#000',
        'color-text-light': '#EE1010',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'sans-serif'], 
      },

      fontSize: {
        'xxl': '36px', 
        'xl': '22px', 
        'lg': '20px',  
        'md': '16px', 
        'sm': '14px', 
      },

      container: {
        center: true, 
        padding: '15px', 
        screens: {
          'sm': '576px',
          'md': '768px',
          'lg': '992px',
          'xl': '1180px',
          '2xl': '1180px',
        },
      },
    },
  },
  plugins: [],
}

