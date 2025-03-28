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
        ".text-coal": {
          "--tw-text-opacity": 1,
          color: "rgb(36 36 36 / var(--tw-text-opacity, 1))",
        },
        ".text-coal-light": {
          "--tw-text-opacity": 1,
          color: "rgb(142 142 142 / var(--tw-text-opacity, 1))",
        },
        ".text-snow": {
          "--tw-text-opacity": 1,
          color: "rgb(249 249 249 / var(--tw-text-opacity, 1))",
        },
        "bg-snow": {
          "--tw-bg-opacity": 1,
          backgroundColor: "rgb(249 249 249 / var(--tw-bg-opacity, 1))",
        },
        ".bg-coal": {
          "--tw-bg-opacity": 1,
          backgroundColor: "rgb(36 36 36 / var(--tw-bg-opacity, 1))",
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
