/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      boxShadow: { 
        "3xl": "0 0 50px 50px rgba(0, 0, 0, 0.9)",
        "very-large": "0px 0px 0px 1000px #3C3C3B"
      },
      colors: { 
        hightlight: "#050d30",
        "ball-color": "#F0F1F5"
      },
      animation: { 
        "move": "move 0.4s ease-in-out forwards",
      },
      keyframes: { 
        "move": {
          "0%": { transform: "translate(0px, 0px)" },
          "100%": {
            transform: "translate(var(--move-x), var(--move-y))",
          },
      }}
    },
  },
  plugins: [],
};
