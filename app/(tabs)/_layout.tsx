import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { Tabs } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { desfeedColor, desfeedFont } from '../../src/shared/theme'
import { InfinityMark } from '../../src/shared/ui/InfinityMark'

const INACTIVE = '#94a3b8'
const BAR_CONTENT_HEIGHT = 62
const SCAN_SIZE = 50
const SCAN_LIFT = 14

const styles = StyleSheet.create({
  bar: {
    backgroundColor: desfeedColor.surface,
    borderTopColor: desfeedColor.borderSoft,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    // O FAB sobe acima da barra e precisa desenhar por cima da borda superior.
    elevation: 0,
  },
  // Sem limite de largura os quatro itens se espalham até encostar nas bordas da tela.
  item: {
    maxWidth: 92,
  },
  label: {
    fontSize: 11,
    fontFamily: desfeedFont.bold,
    marginTop: 2,
  },
  scanButton: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    borderRadius: SCAN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primary,
    // Sombra sólida sem blur: a assinatura visual do produto, em vez de sombra difusa.
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
    // Puxa o círculo para cima. Usar marginBottom empurraria o rótulo para fora da barra;
    // marginTop negativo eleva o botão e deixa o rótulo na mesma linha dos outros.
    marginTop: -SCAN_LIFT,
  },
})

const TabIcon = ({ name, focused }: { name: OutlineGlyphMapType; focused: boolean }) => (
  <IconOutline name={name} size={24} color={focused ? desfeedColor.primary : INACTIVE} />
)

const FeedIcon = ({ focused }: { focused: boolean }) => (
  <InfinityMark size={26} color={focused ? desfeedColor.primary : INACTIVE} />
)

const ScanIcon = () => (
  <View style={styles.scanButton}>
    <IconOutline name="scan" size={26} color={desfeedColor.surface} />
  </View>
)

export default function TabsLayout() {
  const insets = useSafeAreaInsets()
  // O indicador de home do iPhone e a barra de gestos do Android ocupam altura variável.
  // Somar o inset em vez de fixar um número evita rótulo colado no gesto em um aparelho
  // e sobra de espaço vazio em outro.
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 10 : 0)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: desfeedColor.primary,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: [
          styles.bar,
          { height: BAR_CONTENT_HEIGHT + bottomInset, paddingBottom: bottomInset },
        ],
        tabBarItemStyle: styles.item,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <FeedIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="escanear"
        options={{
          title: 'Escanear',
          tabBarIcon: () => <ScanIcon />,
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ focused }) => <TabIcon name="bar-chart" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cadernos"
        options={{
          title: 'Cadernos',
          tabBarIcon: ({ focused }) => <TabIcon name="book" focused={focused} />,
        }}
      />
    </Tabs>
  )
}
