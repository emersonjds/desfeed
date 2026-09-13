import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

import { SolidShadow } from '../../src/shared/ui/SolidShadow';

const TabIcon = ({ emoji, focused }: { emoji: string; focused: boolean }) => (
  <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>
);

const ScanTabIcon = () => (
  <SolidShadow height={48} shadowColor="#059669" borderRadius={24}>
    <View className="h-full w-full items-center justify-center rounded-full bg-primary">
      <Text style={{ fontSize: 22 }}>📷</Text>
    </View>
  </SolidShadow>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: '#131b2e',
        tabBarStyle: { height: 80, paddingTop: 8, paddingBottom: 20 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => <TabIcon emoji="♾️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="escanear"
        options={{
          title: 'Escanear',
          tabBarIcon: () => <ScanTabIcon />,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 4 },
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏆" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cadernos"
        options={{
          title: 'Cadernos',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📓" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
