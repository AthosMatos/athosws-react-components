/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // or 'media' or 'class'
  plugins: [
    require("daisyui"),
    plugin(({ addBase, theme }) => {
      addBase({
        ".hide-scrollbar": {
          scrollbarWidth: "none",
        },
        ".scrollbar": {
          scrollbarWidth: "thin",
        },
        /*  ".scrollbar::-webkit-scrollbar": {
          height: "2px",
          width: "2px",
        }, */
        /*  ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.blue.600"),
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: theme("colors.blue.200"),
        },
        ".scrollbar::-webkit-scrollbar-track": {
          backgroundColor: theme("colors.blue.200"),
        }, */
      });
    }),
  ],
};
