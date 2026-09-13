import type { Config } from 'tailwindcss'
import nativewindPreset from 'nativewind/preset'

export default {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [nativewindPreset],
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
} satisfies Config
