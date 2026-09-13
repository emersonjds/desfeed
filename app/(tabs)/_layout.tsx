import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { Tabs } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { desfeedColor, desfeedFont } from '../../src/shared/theme'
import { InfinityMark } from '../../src/shared/ui/InfinityMark'
import { ICON_SLOT_HEIGHT, TabIconSlot } from '../../src/shared/ui/TabIconSlot'

const INACTIVE = '#94a3b8'
const BAR_CONTENT_HEIGHT = 76
const SCAN_SIZE = 44

const styles = StyleSheet.create({
  bar: {
    backgroundColor: desfeedColor.surface,
    borderTopColor: desfeedColor.borderSoft,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 4,
    elevation: 0,
  },
  item: {
    maxWidth: 92,
  },
  // Sem altura explícita a barra encolhe o slot do ícone e o círculo do escaneamento
  // invade o rótulo — foi assim que o rótulo vazava da barra no Android.
  iconStyle: {
    height: ICON_SLOT_HEIGHT,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
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
  },
})

const TabIcon = ({ name, focused }: { name: OutlineGlyphMapType; focused: boolean }) => (
  <TabIconSlot focused={focused} haloColor={desfeedColor.primarySoft}>
    <IconOutline name={name} size={23} color={focused ? desfeedColor.primary : INACTIVE} />
  </TabIconSlot>
)

const FeedIcon = ({ focused }: { focused: boolean }) => (
  <TabIconSlot focused={focused} haloColor={desfeedColor.primarySoft}>
    <InfinityMark size={25} color={focused ? desfeedColor.primary : INACTIVE} />
  </TabIconSlot>
)

const ScanIcon = ({ focused }: { focused: boolean }) => (
  <TabIconSlot focused={focused} lift={3}>
    <View
      style={[
        styles.scanButton,
        focused ? { backgroundColor: desfeedColor.primaryDeep } : null,
      ]}
    >
      <IconOutline name="scan" size={24} color={desfeedColor.surface} />
    </View>
  </TabIconSlot>
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
        tabBarIconStyle: styles.iconStyle,
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
        name="cadernos"
        options={{
          title: 'Cadernos',
          tabBarIcon: ({ focused }) => <TabIcon name="book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="escanear"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ focused }) => <ScanIcon focused={focused} />,
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
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabIcon name="user" focused={focused} />,
        }}
      />
    </Tabs>
  )
}
