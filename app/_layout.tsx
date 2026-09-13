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
import { Platform, StyleSheet, useWindowDimensions, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { queryClient } from '../src/shared/api/query-client'
import { memfeedColor, memfeedTheme } from '../src/shared/theme'

SplashScreen.preventAutoHideAsync()

const isWeb = Platform.OS === 'web'

const DEVICE_WIDTH = 393
const DEVICE_HEIGHT = 852
const BEZEL = 12
const ISLAND_AREA = 34

const styles = StyleSheet.create({
  fill: { flex: 1 },
  // O export web é a demo que abre por link, e no monitor ela herda a largura inteira da
  // janela: alternativa de 2000px, imagem gigante, barra de abas esticada. A moldura prende
  // o app na largura de um aparelho e devolve o enquadramento que as telas foram desenhadas.
  webBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: memfeedColor.text,
  },
  webFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: memfeedColor.surface,
    overflow: 'hidden',
  },
  deviceBezel: {
    width: DEVICE_WIDTH + BEZEL * 2,
    height: '100%',
    maxHeight: DEVICE_HEIGHT + BEZEL * 2,
    borderRadius: 56,
    padding: BEZEL,
    backgroundColor: '#10131a',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 24 },
  },
  deviceScreen: {
    flex: 1,
    borderRadius: 44,
    overflow: 'hidden',
    backgroundColor: memfeedColor.surface,
    paddingTop: ISLAND_AREA,
  },
  // A ilha cobriria o topo do conteúdo se o `paddingTop` da tela não a tivesse empurrado.
  dynamicIsland: {
    position: 'absolute',
    top: BEZEL + 10,
    alignSelf: 'center',
    width: 118,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000000',
  },
})

export default function RootLayout() {
  const { width, height } = useWindowDimensions()
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

  const app = (
    <Provider theme={memfeedTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="sessao-concluida" options={{ presentation: 'fullScreenModal' }} />
        </Stack>
      </QueryClientProvider>
    </Provider>
  )

  if (!isWeb) return <SafeAreaProvider>{app}</SafeAreaProvider>

  // Navegador estreito já é um aparelho: a moldura só rouba área útil, some abaixo dela.
  const fitsDevice = width >= DEVICE_WIDTH + 120 && height >= 640

  return (
    <SafeAreaProvider>
      <View style={styles.webBackdrop}>
        {fitsDevice ? (
          <View style={styles.deviceBezel}>
            <View style={styles.deviceScreen}>{app}</View>
            <View style={styles.dynamicIsland} />
          </View>
        ) : (
          <View style={styles.webFrame}>{app}</View>
        )}
      </View>
    </SafeAreaProvider>
  )
}
