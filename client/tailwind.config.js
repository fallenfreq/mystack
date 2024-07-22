/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // Use 'media' to control dark mode with a os-level setting
  // Use 'selector' to control dark mode with a class

  // if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //   document.documentElement.classList.add('dark')
  // } else {
  //   document.documentElement.classList.remove('dark')
  // }

  darkMode: 'selector',
  theme: {
    extend: {
      // On instruction from tailwind.primevue.org
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          inverse: 'rgb(var(--primary-inverse))',
          hover: 'rgb(var(--primary-hover))',
          activeColor: 'rgb(var(--primary-active-color))',
          highlight: {
            DEFAULT: 'rgb(var(--primary)/var(--primary-highlight-opacity))',
            inverse: 'rgb(var(--primary-highlight-inverse))',
            hover: 'rgb(var(--primary)/var(--primary-highlight-hover-opacity))'
          },
          50: 'rgb(var(--primary-50))',
          100: 'rgb(var(--primary-100))',
          200: 'rgb(var(--primary-200))',
          300: 'rgb(var(--primary-300))',
          400: 'rgb(var(--primary-400))',
          500: 'rgb(var(--primary-500))',
          600: 'rgb(var(--primary-600))',
          700: 'rgb(var(--primary-700))',
          800: 'rgb(var(--primary-800))',
          900: 'rgb(var(--primary-900))',
          950: 'rgb(var(--primary-950))'
        },
        surface: {
          0: 'rgb(var(--surface-0))',
          50: 'rgb(var(--surface-50))',
          100: 'rgb(var(--surface-100))',
          200: 'rgb(var(--surface-200))',
          300: 'rgb(var(--surface-300))',
          400: 'rgb(var(--surface-400))',
          500: 'rgb(var(--surface-500))',
          600: 'rgb(var(--surface-600))',
          700: 'rgb(var(--surface-700))',
          800: 'rgb(var(--surface-800))',
          900: 'rgb(var(--surface-900))',
          950: 'rgb(var(--surface-950))'
        },
        secondary: 'rgb(var(--secondary))',
        success: 'rgb(var(--success))',
        info: 'rgb(var(--info))',
        danger: 'rgb(var(--danger))',
        warning: 'rgb(var(--warning))',
        backgroundPrimary: 'rgb(var(--backgroundPrimary))',
        backgroundSecondary: 'rgb(var(--backgroundSecondary))',
        backgroundElement: 'rgb(var(--backgroundElement))',
        backgroundBorder: 'rgb(var(--backgroundBorder))',
        textPrimary: 'rgb(var(--textPrimary))',
        textInverted: 'rgb(var(--textInverted))',
        shadow: 'rgb(var(--shadow)/var(--shadow-opacity))',
        focus: 'rgb(var(--focus))'
      }
    }
  },
  plugins: []
}
