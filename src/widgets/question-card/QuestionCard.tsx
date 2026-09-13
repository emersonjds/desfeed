import { IconFill, IconOutline } from '@ant-design/icons-react-native'
import * as Haptics from 'expo-haptics'
import { List, Tag } from '@ant-design/react-native'
import { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { formatReviewLabel, type SelfEvalRating } from '../../entities/card/fsrs'
import type { Card, OptionId } from '../../entities/card/schema'
import { AnswerFeedback } from '../../features/answer-card/AnswerFeedback'
import { SelfEvaluation } from '../../features/answer-card/SelfEvaluation'
import { memfeedColor, memfeedFont } from '../../shared/theme'
import { TimerRing } from './TimerRing'

type QuestionCardProps = {
  card: Card
  xpReward: number
  /** Só o card em tela conta o tempo — ver o efeito da contagem. */
  isActive: boolean
  onRate: (rating: SelfEvalRating) => void
}

const CARD_TIMER_SECONDS = 15

type OptionState = 'idle' | 'correct' | 'wrong'

const compactCount = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value)

const splitOnHighlight = (question: string, highlightTerm: string) => {
  const index = question.toLowerCase().indexOf(highlightTerm.toLowerCase())
  if (index === -1) {
    return { before: question, match: '', after: '' }
  }
  return {
    before: question.slice(0, index),
    match: question.slice(index, index + highlightTerm.length),
    after: question.slice(index + highlightTerm.length),
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 4,
    gap: 6,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  contextTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  tagContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  tagOuter: {
    flexShrink: 1,
    overflow: 'hidden',
  },
  tagOuterFixed: {
    flexShrink: 0,
  },
  tagWrap: {
    height: 28,
    flexShrink: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    backgroundColor: memfeedColor.surface,
    borderColor: memfeedColor.borderSoft,
  },
  tagWrapAccent: {
    height: 28,
    borderRadius: 999,
    paddingHorizontal: 10,
    backgroundColor: memfeedColor.accentSoft,
    borderColor: memfeedColor.accentSoft,
  },
  tagText: {
    fontFamily: memfeedFont.bold,
    fontSize: 12,
    color: memfeedColor.text,
    flexShrink: 1,
  },
  tagTextAccent: {
    fontFamily: memfeedFont.bold,
    fontSize: 12,
    color: memfeedColor.accent,
  },
  media: {
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 56,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: memfeedColor.surfaceSoft,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  mediaOverlay: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  mediaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: memfeedColor.surface,
  },
  mediaBadgeText: {
    fontFamily: memfeedFont.bold,
    fontSize: 11,
    color: memfeedColor.text,
  },
  mediaBadgePrimary: {
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: memfeedColor.primary,
  },
  mediaBadgePrimaryText: {
    fontFamily: memfeedFont.bold,
    fontSize: 11,
    color: memfeedColor.surface,
  },
  question: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 15,
    lineHeight: 20,
    color: memfeedColor.text,
  },
  questionHighlight: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 15,
    lineHeight: 20,
    color: memfeedColor.primaryDeep,
    textDecorationLine: 'underline',
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  optionList: {
    flexShrink: 1,
    flexGrow: 1,
    gap: 6,
  },
  optionItem: {
    borderRadius: 14,
    backgroundColor: memfeedColor.surface,
    borderWidth: 1,
    borderColor: memfeedColor.borderSoft,
    borderBottomWidth: 3,
    borderBottomColor: memfeedColor.border,
    paddingLeft: 10,
  },
  optionItemCorrect: {
    borderRadius: 14,
    backgroundColor: memfeedColor.surface,
    borderWidth: 1,
    borderColor: memfeedColor.primary,
    borderBottomWidth: 3,
    borderBottomColor: memfeedColor.primaryDeep,
    paddingLeft: 10,
  },
  optionItemWrong: {
    borderRadius: 14,
    backgroundColor: memfeedColor.surface,
    borderWidth: 1,
    borderColor: memfeedColor.error,
    borderBottomWidth: 3,
    borderBottomColor: memfeedColor.error,
    paddingLeft: 10,
  },
  optionLine: {
    minHeight: 44,
    borderBottomWidth: 0,
    paddingRight: 10,
    paddingVertical: 0,
  },
  optionContent: {
    fontFamily: memfeedFont.semibold,
    fontSize: 14,
    color: memfeedColor.text,
  },
  optionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: memfeedColor.surfaceSoft,
  },
  optionBadgeCorrect: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: memfeedColor.primary,
  },
  optionBadgeWrong: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: memfeedColor.error,
  },
  optionBadgeText: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 13,
    color: memfeedColor.textMuted,
  },
  optionMarkEmpty: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: memfeedColor.borderSoft,
  },
  optionBadgeTextActive: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 13,
    color: memfeedColor.surface,
  },
  rail: {
    width: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 2,
  },
  railAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: memfeedColor.primarySoft,
    borderWidth: 2,
    borderColor: memfeedColor.surface,
  },
  railItem: {
    alignItems: 'center',
    gap: 2,
  },
  railValue: {
    fontFamily: memfeedFont.bold,
    fontSize: 11,
    color: memfeedColor.textMuted,
  },
  hint: {
    fontFamily: memfeedFont.medium,
    fontSize: 11,
    textAlign: 'center',
    color: memfeedColor.textMuted,
  },
})

const optionItemStyle = {
  idle: styles.optionItem,
  correct: styles.optionItemCorrect,
  wrong: styles.optionItemWrong,
} satisfies Record<OptionState, unknown>

const optionBadgeStyle = {
  idle: styles.optionBadge,
  correct: styles.optionBadgeCorrect,
  wrong: styles.optionBadgeWrong,
} satisfies Record<OptionState, unknown>

const OptionBadge = ({ letter, state }: { letter: OptionId; state: OptionState }) => (
  <View style={optionBadgeStyle[state]}>
    <Text style={state === 'idle' ? styles.optionBadgeText : styles.optionBadgeTextActive}>
      {letter}
    </Text>
  </View>
)

const OptionMark = ({ state }: { state: OptionState }) => {
  if (state === 'correct') {
    return <IconFill name="check-circle" size={20} color={memfeedColor.primary} />
  }
  if (state === 'wrong') {
    return <IconFill name="close-circle" size={20} color={memfeedColor.error} />
  }
  return <View style={styles.optionMarkEmpty} />
}

const RailItem = ({
  icon,
  value,
}: {
  icon: 'experiment' | 'star' | 'share-alt'
  value: string
}) => (
  <View style={styles.railItem}>
    <IconOutline name={icon} size={21} color={memfeedColor.text} />
    <Text style={styles.railValue}>{value}</Text>
  </View>
)

export const QuestionCard = ({ card, xpReward, isActive, onRate }: QuestionCardProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<OptionId | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(CARD_TIMER_SECONDS)
  const question = useMemo(
    () => splitOnHighlight(card.question, card.highlightTerm),
    [card.question, card.highlightTerm],
  )

  useEffect(() => {
    setSelectedOptionId(null)
    setSecondsLeft(CARD_TIMER_SECONDS)
  }, [card.id])

  // A lista monta os cards vizinhos antes de o usuário chegar neles. Contar a partir da
  // montagem queimava os 15 segundos do próximo card enquanto ele ainda estava fora da tela,
  // e ele aparecia zerado. O relógio também para na resposta: o tempo de ler o feedback não
  // é tempo de recuperação.
  const isCountingDown = isActive && selectedOptionId === null && secondsLeft > 0

  useEffect(() => {
    if (!isCountingDown) return
    const timer = setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [isCountingDown])

  const pickOption = (optionId: OptionId) => {
    if (selectedOptionId) return
    setSelectedOptionId(optionId)
    // Vibração diferente para acerto e erro: o corpo entende antes dos olhos lerem.
    void Haptics.notificationAsync(
      optionId === card.correctOptionId
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    )
  }

  const optionStateFor = (optionId: OptionId): OptionState => {
    if (!selectedOptionId) {
      return 'idle'
    }
    if (optionId === card.correctOptionId) {
      return 'correct'
    }
    if (optionId === selectedOptionId) {
      return 'wrong'
    }
    return 'idle'
  }

  return (
    <View style={styles.card}>
      <View style={styles.contextRow}>
        <View style={styles.contextTags}>
          <Tag small style={styles.tagOuter} styles={{ wrapSmall: styles.tagWrap }}>
            <View style={styles.tagContent}>
              <IconOutline
                name={card.origin.kind === 'turma' ? 'team' : 'thunderbolt'}
                size={13}
                color={memfeedColor.primaryDeep}
              />
              <Text style={styles.tagText} numberOfLines={1}>
                {card.origin.kind === 'turma'
                  ? `${card.origin.teacher} • ${card.origin.lesson}`
                  : `Você escolheu • ${card.origin.theme}`}
              </Text>
            </View>
          </Tag>
          <Tag small style={styles.tagOuterFixed} styles={{ wrapSmall: styles.tagWrapAccent }}>
            <View style={styles.tagContent}>
              <IconOutline name="clock-circle" size={13} color={memfeedColor.accent} />
              <Text style={styles.tagTextAccent} numberOfLines={1}>
                {formatReviewLabel(card.reviewNumber, card.fsrs.scheduled_days)}
              </Text>
            </View>
          </Tag>
        </View>
        <TimerRing secondsLeft={secondsLeft} totalSeconds={CARD_TIMER_SECONDS} />
      </View>

      <View style={styles.media}>
        {/* `cover` preenche a faixa e corta a borda rotulada da figura — o rótulo costuma
            nomear a resposta, e o card existe para o aluno recuperá-la sozinho. */}
        {card.imageUrl ? (
          <Image source={{ uri: card.imageUrl }} style={styles.mediaImage} resizeMode="cover" />
        ) : null}
        <View style={styles.mediaOverlay}>
          <View style={styles.mediaBadge}>
            <IconOutline name="book" size={12} color={memfeedColor.primaryDeep} />
            <Text style={styles.mediaBadgeText} numberOfLines={1}>
              {card.chapter}
            </Text>
          </View>
          {/* `keyTerm` é o conceito que a pergunta cobra, então quase sempre É a resposta.
              Ele só aparece depois que o aluno responde. */}
          {selectedOptionId ? (
            <View style={styles.mediaBadgePrimary}>
              <Text style={styles.mediaBadgePrimaryText} numberOfLines={1}>
                {card.keyTerm}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <Text style={styles.question}>
        {question.before}
        {question.match ? <Text style={styles.questionHighlight}>{question.match}</Text> : null}
        {question.after}
      </Text>

      <View style={styles.answerRow}>
        <View style={styles.optionList}>
          {card.options.map((option) => {
            const state = optionStateFor(option.id)
            return (
              <List.Item
                key={option.id}
                style={optionItemStyle[state]}
                styles={{ Line: styles.optionLine, Content: styles.optionContent }}
                underlayColor={memfeedColor.surfaceSoft}
                disabled={selectedOptionId !== null}
                onPress={() => pickOption(option.id)}
                thumb={<OptionBadge letter={option.id} state={state} />}
                extra={<OptionMark state={state} />}
              >
                {option.label}
              </List.Item>
            )
          })}
        </View>

        <View style={styles.rail}>
          <View style={styles.railAvatar}>
            <IconOutline name="user" size={18} color={memfeedColor.primaryDeep} />
          </View>
          <RailItem icon="experiment" value={`${card.masteryPercent}%`} />
          <RailItem icon="star" value={compactCount(card.bookmarkCount)} />
          <RailItem icon="share-alt" value={compactCount(card.shareCount)} />
        </View>
      </View>

      {selectedOptionId ? (
        <AnswerFeedback
          isCorrect={selectedOptionId === card.correctOptionId}
          correctLabel={
            card.options.find((option) => option.id === card.correctOptionId)?.label ?? ''
          }
          xpGained={xpReward}
        />
      ) : null}

      <SelfEvaluation
        fsrsData={card.fsrs}
        xpReward={xpReward}
        onRate={onRate}
        disabled={selectedOptionId === null}
      />

      <Text style={styles.hint}>Avalie sua lembrança para avançar automaticamente</Text>
    </View>
  )
}
