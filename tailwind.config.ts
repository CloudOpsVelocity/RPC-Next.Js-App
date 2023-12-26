import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   colors: {
  //     'primary': '#148B16',
  //     'secondary': '#227FBC',
  //     'accent': '#222222',
  //   },
  // },
  
  plugins: [],
}
export default config
