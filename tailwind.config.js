module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'manapink': {
          100: '#FFAEAE',
        },
        'manapurple': {
          100: '#A5ADF0',
        },
        'manablack': {
          100: '#323438',
        },
        'managray': {
          100: '#A9AAAE',
          200: '#909094',
          300: '#747578',
          400: '#404142',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  // darkMode: 'media'
}
