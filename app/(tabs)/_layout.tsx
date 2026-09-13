import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { Tabs } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { desfeedColor, desfeedFont } from '../../src/shared/theme'

const styles = StyleSheet.create({
  scanButton: {
    width: 46,
    height: 46,
    marginTop: -12,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primary,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  bar: {
    height: 88,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 12,
    backgroundColor: desfeedColor.surface,
    borderTopColor: desfeedColor.borderSoft,
  },
  // Sem largura máxima os quatro itens se espalham até encostar na borda da tela.
  item: {
    maxWidth: 96,
  },
  label: {
    fontSize: 11,
    fontFamily: desfeedFont.bold,
  },
})

const TabIcon = ({ name, focused }: { name: OutlineGlyphMapType; focused: boolean }) => (
  <IconOutline name={name} size={23} color={focused ? desfeedColor.primary : '#94a3b8'} />
)

const ScanTabIcon = () => (
  <View style={styles.scanButton}>
    <IconOutline name="scan" size={24} color={desfeedColor.surface} />
  </View>
)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: desfeedColor.primary,
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: styles.bar,
        tabBarItemStyle: styles.item,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon name="retweet" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="escanear"
        options={{
          title: 'Escanear',
          tabBarIcon: () => <ScanTabIcon />,
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
