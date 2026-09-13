import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { Tabs } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { memfeedColor, memfeedFont } from '../../src/shared/theme'
import { MemfeedMark } from '../../src/shared/ui/MemfeedMark'
import { ICON_SLOT_HEIGHT, TabIconSlot } from '../../src/shared/ui/TabIconSlot'

const INACTIVE = '#94a3b8'
const BAR_CONTENT_HEIGHT = 76
const STUDY_SIZE = 44

const styles = StyleSheet.create({
  bar: {
    backgroundColor: memfeedColor.surface,
    borderTopColor: memfeedColor.borderSoft,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 4,
    elevation: 0,
  },
  item: {
    maxWidth: 92,
  },
  // Sem altura explícita a barra encolhe o slot do ícone e o círculo central
  // invade o rótulo — foi assim que o rótulo vazava da barra no Android.
  iconStyle: {
    height: ICON_SLOT_HEIGHT,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: memfeedFont.bold,
    marginTop: 2,
  },
  studyButton: {
    width: STUDY_SIZE,
    height: STUDY_SIZE,
    borderRadius: STUDY_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: memfeedColor.primary,
    // Sombra sólida sem blur: a assinatura visual do produto, em vez de sombra difusa.
    borderBottomWidth: 4,
    borderBottomColor: memfeedColor.primaryDeep,
  },
})

const TabIcon = ({ name, focused }: { name: OutlineGlyphMapType; focused: boolean }) => (
  <TabIconSlot focused={focused} haloColor={memfeedColor.primarySoft}>
    <IconOutline name={name} size={23} color={focused ? memfeedColor.primary : INACTIVE} />
  </TabIconSlot>
)

const TodayIcon = ({ focused }: { focused: boolean }) => (
  <TabIconSlot focused={focused} haloColor={memfeedColor.primarySoft}>
    <MemfeedMark size={25} color={focused ? memfeedColor.primary : INACTIVE} />
  </TabIconSlot>
)

// O botão central é a ação que o aluno mais quer: dizer o que quer estudar agora.
const StudyIcon = ({ focused }: { focused: boolean }) => (
  <TabIconSlot focused={focused} lift={3}>
    <View
      style={[
        styles.studyButton,
        focused ? { backgroundColor: memfeedColor.primaryDeep } : null,
      ]}
    >
      <IconOutline name="thunderbolt" size={24} color={memfeedColor.surface} />
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
        tabBarActiveTintColor: memfeedColor.primary,
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
        name="hoje"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ focused }) => <TodayIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="materias"
        options={{
          title: 'Matérias',
          tabBarIcon: ({ focused }) => <TabIcon name="book" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="estudar"
        options={{
          title: 'Estudar',
          tabBarIcon: ({ focused }) => <StudyIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="evolucao"
        options={{
          title: 'Evolução',
          tabBarIcon: ({ focused }) => <TabIcon name="line-chart" focused={focused} />,
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
