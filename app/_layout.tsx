import { Provider } from '@ant-design/react-native'
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/plus-jakarta-sans'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '../src/shared/api/query-client'
import { memfeedColor, memfeedTheme } from '../src/shared/theme'

SplashScreen.preventAutoHideAsync()

const isWeb = Platform.OS === 'web'

const styles = StyleSheet.create({
  fill: { flex: 1 },
  // O export web é a demo que abre por link, e no monitor ela herda a largura inteira da
  // janela: alternativa de 2000px, imagem gigante, barra de abas esticada. A moldura prende
  // o app na largura de um aparelho e devolve o enquadramento que as telas foram desenhadas.
  webBackdrop: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: memfeedColor.text,
  },
  webFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: memfeedColor.surface,
    overflow: 'hidden',
  },
})

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    antoutline: require('@ant-design/icons-react-native/fonts/antoutline.ttf'),
    antfill: require('@ant-design/icons-react-native/fonts/antfill.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  // Renderizar antes das fontes carregarem mostra a tela inteira na fonte do sistema e
  // depois salta para a Jakarta — o salto é mais feio que a espera de alguns quadros.
  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <View style={isWeb ? styles.webBackdrop : styles.fill}>
        <View style={isWeb ? styles.webFrame : styles.fill}>
          <Provider theme={memfeedTheme}>
            <QueryClientProvider client={queryClient}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="sessao-concluida"
                  options={{ presentation: 'fullScreenModal' }}
                />
              </Stack>
            </QueryClientProvider>
          </Provider>
        </View>
      </View>
    </SafeAreaProvider>
  )
}
