/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // if using app router
    "./pages/**/*.{js,ts,jsx,tsx}", // if using pages router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-heading)",   // Playfair Display
        poppins: "var(--font-poppins)",   // Poppins
        body: "var(--font-body)",         // Montserrat
      },
    },
  },
  plugins: [],
};
