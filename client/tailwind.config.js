/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        bg1: "#F8FAFB",
        bg2: "#FFFFFF",
        bg3:"#EFF4F8",
        bg4:"#B3C0CE",
        bgWhite:"#EAEDF0",
        text1: "#44566C",
        text2: "#8697A8",
        blue1: "#0081FF",
        blue2: "#22CCE2",
        red: "#FF3D57",
        green:"#09B66D",
        yellow:"#FDBF5E",
        orange:"#FF8A48"

      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
