module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F3F62",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FFBF39",
          200: "#FF638A",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#ffd7b51",
        },
        orange: "#fad487",
      },
    },
  },
  plugins: [],
};
