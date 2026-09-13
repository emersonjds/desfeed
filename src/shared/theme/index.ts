import type antdDefaultTheme from '@ant-design/react-native/lib/style/themes/default'

export const desfeedTheme: Partial<typeof antdDefaultTheme> = {
  brand_primary: '#10b981',
  brand_primary_tap: '#059669',
  brand_success: '#10b981',
  brand_error: '#b91c1c',
  brand_warning: '#b45309',
  fill_base: '#ffffff',
  fill_body: '#faf8ff',
  color_text_base: '#0f131d',
  color_text_caption: '#6b7280',
  border_color_base: '#cbd5e1',
  border_color_thin: '#dfe2f1',
  primary_button_fill: '#10b981',
  primary_button_fill_tap: '#059669',
}

// O tema do Ant Design não tem token de família de fonte: cada componente herda a fonte do
// sistema. Estes nomes são os mesmos registrados no `useFonts` de app/_layout.tsx.
export const desfeedFont = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const

export const desfeedColor = {
  primary: '#10b981',
  primaryDeep: '#059669',
  primarySoft: '#e7f8f1',
  surface: '#ffffff',
  surfaceSoft: '#faf8ff',
  border: '#cbd5e1',
  borderSoft: '#dfe2f1',
  text: '#0f131d',
  textMuted: '#6b7280',
  accent: '#4f46e5',
  accentSoft: '#eef0fd',
  error: '#b91c1c',
  warning: '#b45309',
} as const
