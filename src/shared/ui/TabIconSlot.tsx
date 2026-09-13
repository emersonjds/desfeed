import { type ReactNode, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

export const ICON_SLOT_HEIGHT = 44

const LIFT = 6

const styles = StyleSheet.create({
  // Todo ícone ocupa o mesmo slot de altura fixa, então os rótulos ficam na mesma linha
  // mesmo com o círculo do escaneamento sendo o dobro do tamanho dos outros glifos.
  slot: {
    height: ICON_SLOT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  halo: {
    position: 'absolute',
    width: 44,
    height: 30,
    borderRadius: 15,
  },
})

type TabIconSlotProps = {
  focused: boolean
  children: ReactNode
  haloColor?: string
  /** O botão de escanear já é um círculo elevado; ele salta menos que os glifos comuns. */
  lift?: number
}

export const TabIconSlot = ({
  focused,
  children,
  haloColor,
  lift = LIFT,
}: TabIconSlotProps) => {
  const progress = useSharedValue(focused ? 1 : 0)

  useEffect(() => {
    // O ícone que sai precisa descer junto com o que entra subindo, senão os dois ficam
    // elevados por um instante e a barra parece quebrada durante a transição.
    progress.value = withSpring(focused ? 1 : 0, { damping: 14, stiffness: 220, mass: 0.6 })
  }, [focused, progress])

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -lift * progress.value },
      { scale: 1 + 0.12 * progress.value },
    ],
  }))

  const haloStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focused ? 1 : 0, { duration: 160 }),
    transform: [{ scale: 0.8 + 0.2 * progress.value }],
  }))

  return (
    <View style={styles.slot}>
      {haloColor ? (
        <Animated.View style={[styles.halo, { backgroundColor: haloColor }, haloStyle]} />
      ) : null}
      <Animated.View style={iconStyle}>{children}</Animated.View>
    </View>
  )
}
