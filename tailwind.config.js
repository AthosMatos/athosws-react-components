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
        ".shadow-middle": {
          "--tw-shadow": "0px 0px 0.2rem 1px rgb(0 0 0 / 0.1), 0px 0px 0.2rem 1px rgb(0 0 0 / 0.1)",
          "--tw-shadow-colored": "0px 0px 0.2rem 1px var(--tw-shadow-color), 0px 0px 0.2rem 1px var(--tw-shadow-color)",
          "box-shadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
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
