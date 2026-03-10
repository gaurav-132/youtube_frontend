/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yt: {
          black: '#0f0f0f',
          red: '#ff0000',
          white: '#fff',
          hover: 'hsla(0, 0%, 100%, 0.08)',
          spec: {
            border: 'hsl(0,0%,18.82%)',
            base: '#0f0f0f'
          },
          gray: {
            DEFAULT: '#272727',
            light: '#f1f1f1',
            text: '#aaa'
          }
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}