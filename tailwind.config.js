/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { max: "500px" },
      // => @media (min-width: 576px) { ... }

      md: { max: "700px" },
      // => @media (min-width: 768px) { ... }

      lg: { max: "1124px" },
      // => @media (min-width: 992px) { ... }

      xl: { max: "1200px" },
      // => @media (min-width: 1200px) { ... }
    },
    extend: {
      colors: {
        customBlue: "#1FBEC4",
        customGrey: "#323232",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
