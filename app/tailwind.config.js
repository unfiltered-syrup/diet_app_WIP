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
        "light-white": "rgba(247, 255, 248, 0.3)",
        "light-pink": "rgba(235, 35, 0, 0.08)",
        "light-green": "rgba(3, 176, 0, 0.12)",
        'mid-green': 'rgba(199, 235, 217, 0.78)',
        'olivine': 'rgba(153,172,93)',
        'moss-green': 'rgba(119, 135, 69)',
        'sage': 'rgba(186, 200, 147)',
        'beige': 'rgba(233,237,201)',
        'cornsilk': 'rgba(254,250,224)',
        'papaya-whip': 'rgba(250,237,205)',
        'buff': 'rgba(212,163,115)',
        'sand': 'rgba(226,194,161)',
        'porange': 'rgba(202, 143, 83)'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'mono': ['Menlo', 'monospace'],
        'display': ['Oswald', 'sans-serif'],
        'UI': ['helvetica'],
      },
      fontWeight: {
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
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

