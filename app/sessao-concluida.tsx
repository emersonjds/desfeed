import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { Button, Flex } from '@ant-design/react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSessionTodayQuery } from '../src/entities/session/queries'
import { useDailySessionStore } from '../src/features/daily-session/store'
import { desfeedColor, desfeedFont } from '../src/shared/theme'

const formatFocusTime = (startedAt: Date | null): string => {
  if (!startedAt) {
    return '0m'
  }
  const elapsedMinutes = Math.max(1, Math.round((Date.now() - startedAt.getTime()) / 60_000))
  return `${elapsedMinutes}m`
}

const formatNextReview = (nextDue: Date | null): string => {
  if (!nextDue) {
    return 'Assim que houver novos cards'
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(nextDue)
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 14,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
  },
  heroMark: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.surface,
  },
  heroTag: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: desfeedColor.primarySoft,
  },
  heroTagText: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.6,
    color: desfeedColor.primaryDeep,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 25,
    letterSpacing: -0.5,
    color: desfeedColor.text,
    textAlign: 'center',
    marginTop: 4,
  },
  heroText: {
    fontFamily: desfeedFont.regular,
    fontSize: 14,
    lineHeight: 20,
    color: desfeedColor.textMuted,
    textAlign: 'center',
  },
  quote: {
    flexDirection: 'row',
    gap: 12,
    borderRadius: 18,
    padding: 14,
    backgroundColor: desfeedColor.surface,
  },
  quoteBar: {
    width: 5,
    borderRadius: 999,
    backgroundColor: desfeedColor.primary,
  },
  quoteText: {
    flex: 1,
    fontFamily: desfeedFont.medium,
    fontSize: 14,
    lineHeight: 21,
    fontStyle: 'italic',
    color: desfeedColor.text,
  },
  statRow: {
    gap: 12,
  },
  statCard: {
    flex: 1,
    gap: 8,
    borderRadius: 18,
    padding: 14,
    backgroundColor: desfeedColor.surface,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontFamily: desfeedFont.bold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: desfeedColor.textMuted,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  statValue: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 20,
    color: desfeedColor.text,
  },
  statHelper: {
    fontFamily: desfeedFont.regular,
    fontSize: 12,
    color: desfeedColor.textMuted,
    marginTop: 2,
  },
  footer: {
    marginTop: 'auto',
    gap: 10,
    paddingBottom: 10,
  },
  primaryAction: {
    borderRadius: 16,
    height: 54,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  neutralAction: {
    borderRadius: 16,
    height: 54,
    borderWidth: 0,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
  restedBlock: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  restedText: {
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.primaryDeep,
  },
})

const StatCard = ({
  label,
  value,
  helper,
  icon,
}: {
  label: string
  value: string
  helper: string
  icon: OutlineGlyphMapType
}) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
      <IconOutline name={icon} size={17} color={desfeedColor.primaryDeep} />
    </View>
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statHelper}>{helper}</Text>
    </View>
  </View>
)

export default function SessaoConcluidaScreen() {
  const router = useRouter()
  const sessionQuery = useSessionTodayQuery()
  const completed = useDailySessionStore((state) => state.completed)
  const startedAt = useDailySessionStore((state) => state.startedAt)
  const xpEarned = useDailySessionStore((state) => state.xpEarned)
  const lastIntervalLabel = useDailySessionStore((state) => state.lastIntervalLabel)
  const lastNextDue = useDailySessionStore((state) => state.lastNextDue)
  const [rested, setRested] = useState(false)

  const streak = sessionQuery.data?.streak ?? 0

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <View style={styles.hero}>
          <View style={styles.heroMark}>
            <IconOutline name="experiment" size={40} color={desfeedColor.primary} />
          </View>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>Modo repouso consciente</Text>
          </View>
          <Text style={styles.heroTitle}>Acabou por hoje</Text>
          <Text style={styles.heroText}>
            Seu cérebro concluiu a cota de hoje. O algoritmo pausou seu feed de propósito para
            evitar fadiga neural e fixar a memória de longo prazo.
          </Text>
        </View>

        <View style={styles.quote}>
          <View style={styles.quoteBar} />
          <Text style={styles.quoteText}>
            Seu cérebro precisa esquecer um pouco para lembrar melhor. A neurociência agradece a
            pausa.
          </Text>
        </View>

        <Flex align="stretch" style={styles.statRow}>
          <StatCard
            label="Cards revisados"
            value={`${completed} cards`}
            helper={`${formatFocusTime(startedAt)} de foco`}
            icon="book"
          />
          <StatCard
            label="Sequência"
            value={`${streak} dias`}
            helper="Streak protegido"
            icon="fire"
          />
        </Flex>
        <Flex align="stretch" style={styles.statRow}>
          <StatCard
            label="XP ganho"
            value={`+${xpEarned} XP`}
            helper="Nesta sessão"
            icon="thunderbolt"
          />
          <StatCard
            label="Próxima revisão"
            value={lastIntervalLabel ?? '—'}
            helper={formatNextReview(lastNextDue)}
            icon="clock-circle"
          />
        </Flex>

        <View style={styles.footer}>
          {rested ? (
            <View style={styles.restedBlock}>
              <Text style={styles.restedText}>Sessão salva. Até amanhã</Text>
            </View>
          ) : (
            <Button type="primary" style={styles.primaryAction} onPress={() => setRested(true)}>
              Fechar app e descansar
            </Button>
          )}
          <Button style={styles.neutralAction} onPress={() => router.push('/materias')}>
            Ver meus cadernos e estatísticas
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
