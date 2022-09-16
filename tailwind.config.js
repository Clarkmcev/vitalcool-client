/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      margin: ["Margin DEMO", "cursive"],
      backgroundImage: {
        alcool: "url('img/alcool-bar-1.png')",
        texture: "url('img/background.png')",
        drinks: "url('img/alcool-drinks.png')",
      },
    },
    colors: {
      primary: "#EC7272",
      secondary: "#F7A76C",
      ternary: "#E0D98C",
      fourthy: "#C3FF99",
      aqua: "#7fffd4",
    },
  },
  plugins: [],
};
