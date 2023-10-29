// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-env node */
// // @ts-check

// const defaultTheme = require('tailwindcss/defaultTheme')
// const colors = require('tailwindcss/colors')

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   theme: {
//     extend: {
//       colors: {
//         gray: colors.zinc,
//       },
//       fontFamily: {
//         mono: ['var(--font-inconsolata)', ...defaultTheme.fontFamily.mono],
//       },
//     },
//   },
//   plugins: [],
// }

/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/flowbite/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('rippleui')],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // ...colors,
        primaryGreen: '#014421',
        primaryBeige: '#F5F5DC',
        primaryYellow: '#EEC438',
        primaryYellowTrans: 'rgba(238, 196, 56, 0.2)',
        primaryGray: '#3C4142',
        secondaryGray: '#A8ABAC',
      },
    },
  },
};
export default config;
