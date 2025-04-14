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
        ".text-snow": {
          "--tw-text-opacity": `1`,
          color: "rgb(249 249 249 / var(--tw-text-opacity, 1))",
        },
        ".text-coal": {
          "--tw-text-opacity": `1`,
          color: "rgb(36 36 36 / var(--tw-text-opacity, 1))",
        },
        ".text-coal-light": {
          "--tw-text-opacity": `1`,
          color: "rgb(142 142 142 / var(--tw-text-opacity, 1))",
        },
        ".text-coal-dark": {
          "--tw-text-opacity": `1`,
          color: "rgb(19 19 19 / var(--tw-text-opacity, 1))",
        },

        ".bg-snow": {
          "--tw-bg-opacity": `1`,
          "background-color": "rgb(249 249 249 / var(--tw-bg-opacity, 1))",
        },
        ".bg-pixe": {
          "--tw-bg-opacity": `1`,
          "background-color": "rgb(41 41 41 / var(--tw-bg-opacity, 1))",
        },
        ".bg-coal": {
          "--tw-bg-opacity": `1`,
          "background-color": "rgb(36 36 36 / var(--tw-bg-opacity, 1))",
        },

        ".bg-coal-light": {
          "--tw-bg-opacity": `1`,
          "background-color": "rgb(142 142 142 / var(--tw-bg-opacity, 1))",
        },
        ".bg-coal-dark": {
          "--tw-bg-opacity": `1`,
          "background-color": "rgb(19 19 19 / var(--tw-bg-opacity, 1))",
        },
        ".bg-smooth-grey": {
          "background-color": "rgb(229 229 229 / 0.7)",
        },
        ".border-smooth-darker-grey": {
          "border-color": "rgb(190, 190, 190)",
        },
        ".scale-102": {
          "--tw-scale-x": "1.02",
          "--tw-scale-y": "1.02",
          transform:
            " translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
        },
        ".scale-98": {
          "--tw-scale-x": "0.98",
          "--tw-scale-y": "0.98",
          transform:
            " translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
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
