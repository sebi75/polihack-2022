/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(29, 155, 240)",
        "primary-opacity": "rgba(29, 155, 240, 0.1)",
        "primary-dark": "rgb(26, 138, 214)",
        "primary-disabled": "rgba(29, 155, 240, 0.5)",
        "opacity-shadow": "rgba(0, 0, 0, 0.05)",
        "text-color": "rgb(26, 26, 26)",
        "primary-light-opacity": "rgb(239, 243, 244)",
      },
    },
  },
  plugins: [require("daisyui")],
};
