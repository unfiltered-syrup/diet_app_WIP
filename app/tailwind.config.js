/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "rgba(17, 51, 3, 0.8)",
        "light-white": "#F9F9F9",
        "light-pink": "rgba(176, 39, 46, 0.20)",
        "light-green": "rgba(3, 176, 0, 0.12)",
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'mono': ['Menlo', 'monospace'],
        'display': ['Oswald', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
  },
  
  plugins: [],
}
}

