/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: { 
      colors: { hightlight: "#050d30" },
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
