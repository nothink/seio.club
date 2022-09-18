/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    themes: ["cupcake"],
    styled: true,
    themes: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
