import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Progress, Result } from '@ant-design/react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import type { SelfEvalRating } from '../../src/entities/card/fsrs'
import { useTodayQueueQuery } from '../../src/entities/card/queries'
import type { Card } from '../../src/entities/card/schema'
import { useSubmitReviewMutation } from '../../src/entities/review/mutations'
import { useSessionTodayQuery } from '../../src/entities/session/queries'
import { currentSessionCard, useDailySessionStore } from '../../src/features/daily-session/store'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'
import { InfinityMark } from '../../src/shared/ui/InfinityMark'
import { QuestionCard } from '../../src/widgets/question-card/QuestionCard'

const XP_PER_CARD = 30

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  brandName: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 19,
    letterSpacing: -0.4,
    color: desfeedColor.text,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 6,
    backgroundColor: desfeedColor.surface,
  },
  statText: {
    fontFamily: desfeedFont.bold,
    fontSize: 14,
    color: desfeedColor.text,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  goal: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 5,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  goalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  goalDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: desfeedColor.primary,
  },
  goalLabel: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: desfeedColor.text,
    textTransform: 'uppercase',
  },
  goalCount: {
    fontFamily: desfeedFont.bold,
    fontSize: 11,
    color: desfeedColor.textMuted,
  },
  progressOuter: {
    height: 9,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: desfeedColor.borderSoft,
  },
  // A barra do Progress é desenhada como borda inferior, não como altura de View.
  progressBar: {
    borderBottomWidth: 9,
    borderRadius: 999,
    borderColor: desfeedColor.primary,
  },
  body: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  centeredText: {
    fontFamily: desfeedFont.medium,
    fontSize: 14,
    textAlign: 'center',
    color: desfeedColor.textMuted,
  },
})

const HeaderStat = ({
  icon,
  value,
  color,
}: {
  icon: 'fire' | 'thunderbolt'
  value: string
  color: string
}) => (
  <View style={styles.statPill}>
    <IconOutline name={icon} size={17} color={color} />
    <Text style={styles.statText}>{value}</Text>
  </View>
)

export default function FeedScreen() {
  const router = useRouter()
  const queueQuery = useTodayQueueQuery()
  const sessionQuery = useSessionTodayQuery()
  const submitReview = useSubmitReviewMutation()
  // Seletor por campo: assinar a store inteira re-renderiza a tela a cada
  // resposta, e o card do feed remonta junto — perde o estado de seleção.
  const card = useDailySessionStore(currentSessionCard)
  const isStarted = useDailySessionStore((state) => state.isStarted)
  const isFinished = useDailySessionStore((state) => state.isFinished)
  const currentIndex = useDailySessionStore((state) => state.currentIndex)
  const sessionGoal = useDailySessionStore((state) => state.goal)
  const sessionCompleted = useDailySessionStore((state) => state.completed)
  const startSession = useDailySessionStore((state) => state.start)
  const answerCard = useDailySessionStore((state) => state.answer)
  const addXp = useDailySessionStore((state) => state.addXp)

  useEffect(() => {
    if (queueQuery.data && !isStarted) {
      startSession(queueQuery.data.cards, queueQuery.data.cards.length)
    }
  }, [queueQuery.data, isStarted, startSession])

  useEffect(() => {
    if (!isFinished) return
    // O expo-router monta o navegador depois do primeiro render da tela.
    // Navegar dentro do mesmo quadro dispara update em componente não montado.
    const frame = requestAnimationFrame(() => router.replace('/sessao-concluida'))
    return () => cancelAnimationFrame(frame)
  }, [isFinished, router])

  const handleRate = (answered: Card, rating: SelfEvalRating) => {
    answerCard(rating)
    submitReview.mutate(
      { cardId: answered.id, rating, reviewedAt: new Date().toISOString() },
      { onSuccess: (response) => addXp(response.xpGained) },
    )
  }

  const streak = sessionQuery.data?.streak ?? 0
  const xp = sessionQuery.data?.xp ?? 0
  const goal = sessionQuery.data?.goal ?? sessionGoal
  const completedToday = (sessionQuery.data?.completed ?? 0) + sessionCompleted
  const goalPercent = goal > 0 ? Math.min(100, Math.round((completedToday / goal) * 100)) : 0

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <InfinityMark size={26} color={desfeedColor.primary} />
          <Text style={styles.brandName}>Desfeed</Text>
        </View>
        <View style={styles.headerStats}>
          <HeaderStat icon="fire" value={`${streak}d`} color="#ea580c" />
          <HeaderStat icon="thunderbolt" value={`${xp}`} color={desfeedColor.warning} />
          <View style={styles.avatar}>
            <IconOutline name="user" size={20} color={desfeedColor.primaryDeep} />
          </View>
        </View>
      </View>

      <View style={styles.goal}>
        <View style={styles.goalRow}>
          <View style={styles.goalLabelRow}>
            <View style={styles.goalDot} />
            <Text style={styles.goalLabel} numberOfLines={1}>
              Meta diária • sprint ativo
            </Text>
          </View>
          <Text style={styles.goalCount}>{`${completedToday}/${goal} concluídos`}</Text>
        </View>
        <Progress
          percent={goalPercent}
          styles={{ progressOuter: styles.progressOuter, progressBar: styles.progressBar }}
        />
      </View>

      <View style={styles.body}>
        {queueQuery.isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={desfeedColor.primary} />
            <Text style={styles.centeredText}>Carregando a fila de hoje…</Text>
          </View>
        ) : null}

        {queueQuery.isError ? (
          <Result
            img={<IconOutline name="close-circle" size={54} color={desfeedColor.error} />}
            title="Não deu para buscar a fila de hoje"
            message="Confira sua conexão e tente de novo."
            buttonText="Tentar novamente"
            buttonType="primary"
            onButtonClick={() => queueQuery.refetch()}
          />
        ) : null}

        {queueQuery.data && queueQuery.data.cards.length === 0 ? (
          <Result
            img={<IconOutline name="book" size={54} color={desfeedColor.primary} />}
            title="Nada para revisar agora"
            message="Escaneie um caderno para gerar novos cards de recuperação ativa."
            buttonText="Escanear um caderno"
            buttonType="primary"
            onButtonClick={() => router.push('/escanear')}
          />
        ) : null}

        {card && !isFinished ? (
          <QuestionCard
            key={`${card.id}-${currentIndex}`}
            card={card}
            xpReward={XP_PER_CARD}
            onRate={(rating) => handleRate(card, rating)}
          />
        ) : null}
      </View>
    </SafeAreaView>
  )
}
