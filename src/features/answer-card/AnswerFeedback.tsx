import { IconOutline } from '@ant-design/icons-react-native'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { memfeedColor, memfeedFont } from '../../shared/theme'

type AnswerFeedbackProps = {
  isCorrect: boolean
  correctLabel: string
  xpGained: number
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  correct: { backgroundColor: memfeedColor.primarySoft },
  wrong: { backgroundColor: '#fee2e2' },
  info: { flex: 1, gap: 2 },
  title: { fontFamily: memfeedFont.extrabold, fontSize: 15 },
  detail: { fontFamily: memfeedFont.medium, fontSize: 12.5, lineHeight: 17 },
  xp: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 13,
    color: memfeedColor.primaryDeep,
    backgroundColor: memfeedColor.surface,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
})

export const AnswerFeedback = ({ isCorrect, correctLabel, xpGained }: AnswerFeedbackProps) => {
  const tone = isCorrect ? memfeedColor.primaryDeep : memfeedColor.error

  return (
    <Animated.View
      entering={FadeInDown.duration(220)}
      style={[styles.bar, isCorrect ? styles.correct : styles.wrong]}
    >
      <IconOutline
        name={isCorrect ? 'check-circle' : 'close-circle'}
        size={26}
        color={tone}
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: tone }]}>
          {isCorrect ? 'Isso aí!' : 'Quase'}
        </Text>
        <Text style={[styles.detail, { color: tone }]}>
          {isCorrect
            ? 'Agora diga o quanto custou lembrar — é isso que define quando o card volta.'
            : `A resposta era ${correctLabel}.`}
        </Text>
      </View>
      {isCorrect ? <Text style={styles.xp}>{`+${xpGained} XP`}</Text> : null}
    </Animated.View>
  )
}
