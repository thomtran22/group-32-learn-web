module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Giữ lại các screens tùy chỉnh của bạn
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px", // CSS gốc dùng 992px cho breakpoint này
      xl: "1280px",
      "2xl": "1280px",
    },
    extend: {
      // 1. Tùy chỉnh Colors
      colors: {
        'color-text-dark': '#000',
        'color-text-light': '#EE1010', // Màu đỏ của hotline
      },

      // 2. Tùy chỉnh Font Family
      fontFamily: {
        // Đặt 'Inter Tight' làm font mặc định (sẽ kế thừa bởi sans)
        sans: ['"Inter Tight"', 'sans-serif'], 
      },

      // 3. Tùy chỉnh Font Size để khớp với các biến --fs-*
      fontSize: {
        'xxl': '36px', // --fs-xxl
        'xl': '22px',  // --fs-xl
        'lg': '20px',  // --fs-lg
        'md': '16px',  // --fs-md
        'sm': '14px',  // --fs-sm
      },

      // 4. Cấu hình Container
      container: {
        center: true, // Căn giữa container
        padding: '15px', // Padding hai bên
        screens: {
          // Định nghĩa max-width cho container, áp dụng cho các kích thước lớn
          'sm': '576px',
          'md': '768px',
          'lg': '992px',
          'xl': '1180px', // Đặt max-width: 1180px như trong CSS gốc
          '2xl': '1180px',
        },
      },
    },
  },
  plugins: [],
}