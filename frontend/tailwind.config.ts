import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultConfig')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        accent: '#ec4899',
        dark: {
          50: '#f9fafb',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontSize: defaultTheme.fontSize,
      spacing: defaultTheme.spacing,
      borderRadius: defaultTheme.borderRadius,
    },
  },
  plugins: [],
}

export default config
