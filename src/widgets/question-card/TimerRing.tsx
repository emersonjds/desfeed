import { StyleSheet, Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

import { desfeedColor, desfeedFont } from '../../shared/theme'

type TimerRingProps = {
  secondsLeft: number
  totalSeconds: number
}

const RING_SIZE = 38
const STROKE = 3
const RADIUS = (RING_SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const styles = StyleSheet.create({
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  label: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 10,
    color: desfeedColor.text,
  },
})

const formatClock = (seconds: number): string =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

export const TimerRing = ({ secondsLeft, totalSeconds }: TimerRingProps) => {
  const remaining = Math.max(0, Math.min(1, secondsLeft / totalSeconds))

  return (
    <View style={styles.ring}>
      <Svg width={RING_SIZE} height={RING_SIZE} style={styles.svg}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke={desfeedColor.borderSoft}
          strokeWidth={STROKE}
          fill={desfeedColor.surface}
        />
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke={desfeedColor.primary}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - remaining)}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </Svg>
      <Text style={styles.label}>{formatClock(secondsLeft)}</Text>
    </View>
  )
}
