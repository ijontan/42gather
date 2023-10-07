/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'cyanAcc': '#00BABC',
        'cyanLight': '#C5F5F6',
        'cyanDark': '#007B7D',
        'black': '#1B1A1A',
        'white': '#ffffff',
        'gray': '#F4F4F4',
        'orangeAcc': '#E96200',
        'orangeLight': '#FFE8D8',
        'greenAcc': '#629034',
        'greenLight': '#EFFFDF',
        'tealAcc': '#08A96F',
        'tealLight': '#E9FFF7',
        'blueAcc': '#4267E9',
        'blueLight': '#DFE6FF',
        'pinkAcc': '#B146B3',
        'pinkLight': '#FEDFFF',
        'yellowAcc': '#C3AF00',
        'yellowLight': '#FFFDEA',
      },
      boxShadow:{
        'large':  '15px 50px 150px rgba(0, 0, 0, 0.1)',
      }
    },
    fontFamily:{
      sans: ['poppins','sans-serif']
    }
  },
  plugins: [
    require('tailwindcss-labeled-groups')(['button',])
  ],
}

