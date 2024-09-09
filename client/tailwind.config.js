/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: "selector",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        'mona-regular': ['Mona Regular', 'sans'],
        'mona-medium': ['Mona Medium', 'sans'],
        'mona-bold': ['Mona Bold', 'sans'],
        'mona-semibold': ['Mona SemiBold', 'sans'],
        'mona-black': ['Mona Black', 'sans'],
        'mona-extrabold': ['Mona ExtraBold', 'sans'],


      },  
      colors: {
        primary: {
          DEFAULT: "#041632", // This sets the default primary color
          light: "#2a3b55", // Optional: Add light variations if needed
          dark: "#000a1c", // Optional: Add dark variations if needed
        },
      },  
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.1)' },
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
