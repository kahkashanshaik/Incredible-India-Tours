/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
            center: true,
      },
    extend: {
      fontFamily: {
        montserrat: ['montserrat', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
      },
      colors: {
        'gray': '#424955',
        primary: {
          DEFAULT: '#29C3E5',
          dark: '#179FBD'
        },
        danger: {
            DEFAULT: '#e7515a',
            light: '#fff5f5',
            'dark-light': 'rgba(231,81,90,.15)',
        },
        secondary: {
                    DEFAULT: '#805dca',
                    light: '#ebe4f7',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
}

