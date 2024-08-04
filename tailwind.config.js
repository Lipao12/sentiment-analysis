/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors:{
      backgroud: "#f0f1f5",
      secundary: "#242933",
      terciary: "#ededed"
    }
    },
  },
  plugins: [],
}

