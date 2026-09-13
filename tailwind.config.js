/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        'primary-deep': '#059669',
        surface: '#ffffff',
        'surface-soft': '#faf8ff',
        border: '#cbd5e1',
        'border-soft': '#dfe2f1',
        text: '#0f131d',
        'text-muted': '#131b2e',
        accent: '#4f46e5',
      },
    },
  },
  plugins: [],
};
