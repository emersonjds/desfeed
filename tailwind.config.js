/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        jk: ['PlusJakartaSans_400Regular'],
        'jk-medium': ['PlusJakartaSans_500Medium'],
        'jk-semibold': ['PlusJakartaSans_600SemiBold'],
        'jk-bold': ['PlusJakartaSans_700Bold'],
        'jk-extrabold': ['PlusJakartaSans_800ExtraBold'],
      },
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
