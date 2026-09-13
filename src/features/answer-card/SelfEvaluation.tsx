import { IconOutline } from '@ant-design/icons-react-native'
import { Button, Flex } from '@ant-design/react-native'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { previewSelfEvalIntervals, type SelfEvalRating } from '../../entities/card/fsrs'
import type { CardFsrsData } from '../../entities/card/schema'
import { memfeedColor, memfeedFont } from '../../shared/theme'

type SelfEvaluationProps = {
  fsrsData: CardFsrsData
  onRate: (rating: SelfEvalRating) => void
  xpReward: number
  disabled?: boolean
}

const ratingOrder: SelfEvalRating[] = ['again', 'hard', 'good', 'easy']

const ratingLabel: Record<SelfEvalRating, string> = {
  again: 'Errei',
  hard: 'Difícil',
  good: 'Bom',
  easy: 'Fácil',
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: memfeedColor.surface,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 9,
    borderWidth: 1,
    borderColor: memfeedColor.borderSoft,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  headerTitle: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: memfeedColor.text,
    textTransform: 'uppercase',
  },
  xpBadge: {
    backgroundColor: memfeedColor.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  xpText: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 11,
    color: memfeedColor.primaryDeep,
  },
  ratingRow: {
    gap: 6,
  },
  ratingButton: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 0,
    backgroundColor: memfeedColor.surfaceSoft,
    borderBottomWidth: 3,
    borderBottomColor: memfeedColor.borderSoft,
    paddingHorizontal: 2,
  },
  ratingButtonPrimary: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: memfeedColor.primaryDeep,
    paddingHorizontal: 2,
  },
  ratingInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  ratingLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  labelAgain: { fontFamily: memfeedFont.extrabold, fontSize: 13, color: memfeedColor.error },
  labelHard: { fontFamily: memfeedFont.extrabold, fontSize: 13, color: memfeedColor.warning },
  labelGood: { fontFamily: memfeedFont.extrabold, fontSize: 13, color: '#2563eb' },
  labelEasy: { fontFamily: memfeedFont.extrabold, fontSize: 13, color: memfeedColor.surface },
  interval: { fontFamily: memfeedFont.bold, fontSize: 11, color: memfeedColor.textMuted },
  intervalPrimary: { fontFamily: memfeedFont.bold, fontSize: 11, color: memfeedColor.surface },
})

const ratingLabelStyle = {
  again: styles.labelAgain,
  hard: styles.labelHard,
  good: styles.labelGood,
  easy: styles.labelEasy,
} satisfies Record<SelfEvalRating, unknown>

export const SelfEvaluation = ({
  fsrsData,
  onRate,
  xpReward,
  disabled = false,
}: SelfEvaluationProps) => {
  const preview = useMemo(() => previewSelfEvalIntervals(fsrsData, new Date()), [fsrsData])

  return (
    <View style={styles.block}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <IconOutline name="bulb" size={14} color={memfeedColor.primary} />
          <Text style={styles.headerTitle} numberOfLines={1}>
            Autoavaliação da lembrança
          </Text>
        </View>
        <View style={styles.xpBadge}>
          <Text style={styles.xpText}>{`+${xpReward} XP`}</Text>
        </View>
      </View>

      <Flex align="stretch" style={styles.ratingRow}>
        {ratingOrder.map((rating) => {
          const isPrimary = rating === 'easy'
          return (
            <Button
              key={rating}
              type={isPrimary ? 'primary' : undefined}
              disabled={disabled}
              onPress={() => onRate(rating)}
              style={isPrimary ? styles.ratingButtonPrimary : styles.ratingButton}
            >
              <View style={styles.ratingInner}>
                <View style={styles.ratingLabelRow}>
                  {isPrimary ? (
                    <IconOutline name="thunderbolt" size={12} color={memfeedColor.surface} />
                  ) : null}
                  <Text style={ratingLabelStyle[rating]}>{ratingLabel[rating]}</Text>
                </View>
                <Text style={isPrimary ? styles.intervalPrimary : styles.interval}>
                  {preview[rating].intervalLabel}
                </Text>
              </View>
            </Button>
          )
        })}
      </Flex>
    </View>
  )
}
