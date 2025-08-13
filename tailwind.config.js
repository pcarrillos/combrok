/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          500: 'rgb(13 110 253)',
          600: 'rgb(10 88 202)',
          700: 'rgb(8 69 158)',
          900: 'rgb(5 39 103)',
        },
        gray: {
          50: 'rgb(248 249 250)',
          100: 'rgb(233 236 239)',
          200: 'rgb(222 226 230)',
          300: 'rgb(206 212 218)',
          400: 'rgb(173 181 189)',
          500: 'rgb(108 117 125)',
          600: 'rgb(73 80 87)',
          700: 'rgb(52 58 64)',
          800: 'rgb(33 37 41)',
          900: 'rgb(13 17 23)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}