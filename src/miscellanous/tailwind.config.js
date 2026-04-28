/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16A34A",
        forest: "#065F46",
        mist: "#F4F7F4",
        sand: "#FFF6DC",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(6, 95, 70, 0.08)",
        float: "0 24px 60px rgba(6, 95, 70, 0.18)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Sora", "sans-serif"],
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.28) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
