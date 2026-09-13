import { Tabs } from 'expo-router'
import { View } from 'react-native'

import { Icon, type IconName } from '../../src/shared/ui/Icon'
import { SolidShadow } from '../../src/shared/ui/SolidShadow'

const TabIcon = ({ name, focused }: { name: IconName; focused: boolean }) => (
  <Icon name={name} size={24} color={focused ? '#10b981' : '#94a3b8'} />
)

const ScanTabIcon = () => (
  <SolidShadow height={48} shadowColor="#059669" borderRadius={24}>
    <View className="h-full w-full items-center justify-center rounded-full bg-primary">
      <Icon name="escanear" size={24} color="#ffffff" />
    </View>
  </SolidShadow>
)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          height: 84,
          paddingTop: 10,
          paddingBottom: 22,
          borderTopColor: '#dfe2f1',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'PlusJakartaSans_700Bold',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon name="infinito" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="escanear"
        options={{
          title: 'Escanear',
          tabBarIcon: () => <ScanTabIcon />,
          tabBarLabelStyle: {
            fontSize: 11,
            fontFamily: 'PlusJakartaSans_700Bold',
            marginTop: 6,
          },
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ focused }) => <TabIcon name="ranking" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cadernos"
        options={{
          title: 'Cadernos',
          tabBarIcon: ({ focused }) => <TabIcon name="cadernos" focused={focused} />,
        }}
      />
    </Tabs>
  )
}
