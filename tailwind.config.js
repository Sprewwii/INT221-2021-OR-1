module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'abc': '#1b1c1e58',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  // darkMode: 'media'
}
