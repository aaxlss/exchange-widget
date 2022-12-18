/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    rotate:{
      '135': '135deg',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#FFFFFF',
      'gray-widget': '#9c9c9c',
      'primary-widget': '#49cd5e',
      'secondary-widget': '#223cc7',
      'tertiary-widget': '#6581a3',
      'dark-widget': '#000000',
      'neutral-widget': '#e1e8ed',

    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}
