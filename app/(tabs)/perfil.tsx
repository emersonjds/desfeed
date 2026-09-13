import { IconOutline, type OutlineGlyphMapType } from '@ant-design/icons-react-native'
import { ActivityIndicator, Button, Progress, Result, Switch, Tag } from '@ant-design/react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useProfileQuery } from '../../src/entities/profile/queries'
import type { Badge, BadgeTier } from '../../src/entities/profile/schema'
import { useSessionTodayQuery } from '../../src/entities/session/queries'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'
import { ForgettingCurve, useChartWidth } from '../../src/widgets/profile/ForgettingCurve'

const SCREEN_PADDING = 12
const CARD_PADDING = 14
const GOAL_MIN = 5
const GOAL_MAX = 60
const GOAL_STEP = 5

const badgeTone: Record<BadgeTier, { background: string; icon: string; label: string }> = {
  ouro: { background: '#fef3c7', icon: '#b45309', label: 'Ouro' },
  prata: { background: '#eef0fd', icon: '#4f46e5', label: 'Prata' },
  bronze: { background: '#fee2e2', icon: '#b91c1c', label: 'Bronze' },
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 8,
  },
  headerTitle: {
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
  statPillText: {
    fontFamily: desfeedFont.bold,
    fontSize: 13,
    color: desfeedColor.text,
  },
  card: {
    borderRadius: 18,
    padding: CARD_PADDING,
    backgroundColor: desfeedColor.surface,
    gap: 10,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  identityText: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 19,
    letterSpacing: -0.3,
    color: desfeedColor.text,
  },
  handle: {
    fontFamily: desfeedFont.medium,
    fontSize: 13,
    color: desfeedColor.textMuted,
  },
  headline: {
    fontFamily: desfeedFont.medium,
    fontSize: 13,
    color: desfeedColor.textMuted,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sectionTitle: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: desfeedColor.text,
  },
  sectionHint: {
    fontFamily: desfeedFont.medium,
    fontSize: 12,
    color: desfeedColor.textMuted,
  },
  heroValue: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 40,
    letterSpacing: -1.4,
    color: desfeedColor.primaryDeep,
  },
  heroUnit: {
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.textMuted,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  progressOuter: {
    height: 9,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: desfeedColor.borderSoft,
  },
  progressBar: {
    borderBottomWidth: 9,
    borderRadius: 999,
    borderColor: desfeedColor.primary,
  },
  statGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 18,
    padding: CARD_PADDING,
    backgroundColor: desfeedColor.surface,
    gap: 4,
  },
  statValue: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 26,
    letterSpacing: -0.8,
    color: desfeedColor.text,
  },
  statCaption: {
    fontFamily: desfeedFont.medium,
    fontSize: 12,
    color: desfeedColor.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.text,
  },
  rowBrief: {
    fontFamily: desfeedFont.medium,
    fontSize: 12,
    color: desfeedColor.textMuted,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: desfeedColor.borderSoft,
  },
  badgeThumb: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierTag: {
    alignSelf: 'flex-start',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 4,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderWidth: 0,
    borderRadius: 22,
    backgroundColor: 'transparent',
  },
  stepperValue: {
    minWidth: 32,
    textAlign: 'center',
    fontFamily: desfeedFont.extrabold,
    fontSize: 17,
    color: desfeedColor.text,
  },
  timePill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  timeText: {
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.text,
  },
  cta: {
    height: 52,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
  },
})

const HeaderStat = ({
  icon,
  value,
  color,
}: {
  icon: OutlineGlyphMapType
  value: string
  color: string
}) => (
  <View style={styles.statPill}>
    <IconOutline name={icon} size={16} color={color} />
    <Text style={styles.statPillText}>{value}</Text>
  </View>
)

const SettingRow = ({
  icon,
  title,
  brief,
  control,
}: {
  icon: OutlineGlyphMapType
  title: string
  brief: string
  control: React.ReactNode
}) => (
  <View style={styles.row}>
    <IconOutline name={icon} size={20} color={desfeedColor.primaryDeep} />
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      <Text style={styles.rowBrief}>{brief}</Text>
    </View>
    {control}
  </View>
)

const BadgeRow = ({ badge }: { badge: Badge }) => {
  const tone = badgeTone[badge.tier]
  return (
    <View style={styles.row}>
      <View style={[styles.badgeThumb, { backgroundColor: tone.background }]}>
        <IconOutline name="trophy" size={20} color={tone.icon} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{badge.title}</Text>
        <Text style={styles.rowBrief}>{badge.description}</Text>
      </View>
      <Tag small style={styles.tierTag}>
        {tone.label}
      </Tag>
    </View>
  )
}

export default function PerfilScreen() {
  const router = useRouter()
  const profileQuery = useProfileQuery()
  const sessionQuery = useSessionTodayQuery()
  const chartWidth = useChartWidth(SCREEN_PADDING * 2 + CARD_PADDING * 2)
  // A preferência ainda não persiste: não existe endpoint de configurações na API.
  const [goalOverride, setGoalOverride] = useState<number | null>(null)
  const [isAlgorithmOn, setAlgorithmOn] = useState(true)
  const [isQuietNightOn, setQuietNightOn] = useState(false)

  if (profileQuery.isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator color={desfeedColor.primary} />
          <Text style={styles.sectionHint}>Carregando seu perfil…</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <Result
            img={<IconOutline name="close-circle" size={54} color={desfeedColor.error} />}
            title="Não deu para carregar seu perfil"
            message="Confira sua conexão e tente de novo."
            buttonText="Tentar novamente"
            buttonType="primary"
            onButtonClick={() => profileQuery.refetch()}
          />
        </View>
      </SafeAreaView>
    )
  }

  const profile = profileQuery.data
  const dailyGoal = goalOverride ?? profile.dailyGoal
  const streak = sessionQuery.data?.streak ?? 0
  const xp = sessionQuery.data?.xp ?? 0
  const remainingToday = Math.max(
    0,
    (sessionQuery.data?.goal ?? dailyGoal) - (sessionQuery.data?.completed ?? 0),
  )
  const retentionAgainstTarget = Math.min(
    100,
    Math.round((profile.retentionPercent / profile.retentionTarget) * 100),
  )

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerStats}>
          <HeaderStat icon="fire" value={`${streak}d`} color="#ea580c" />
          <HeaderStat icon="thunderbolt" value={`${xp} XP`} color={desfeedColor.warning} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <View style={styles.identityRow}>
            <View style={styles.avatar}>
              <IconOutline name="user" size={28} color={desfeedColor.primaryDeep} />
            </View>
            <View style={styles.identityText}>
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.handle}>{profile.handle}</Text>
            </View>
          </View>
          <Text style={styles.headline}>{profile.headline}</Text>
          <View style={styles.tagRow}>
            <Tag small>{profile.levelLabel}</Tag>
            <Tag small>{profile.leagueLabel}</Tag>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Retenção do que você já estudou</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroValue}>{profile.retentionPercent.toFixed(1)}%</Text>
            <Text style={styles.heroUnit}>{`alvo ${profile.retentionTarget}%`}</Text>
          </View>
          <Progress
            percent={retentionAgainstTarget}
            styles={{ progressOuter: styles.progressOuter, progressBar: styles.progressBar }}
          />
          <Text style={styles.sectionHint}>
            {`Média do que você acerta quando um card volta. Medimos o quanto fica, nunca quanto tempo você passa aqui.`}
          </Text>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.stabilizedFacts}</Text>
            <Text style={styles.statCaption}>fatos firmes há mais de 21 dias</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{profile.cardsReviewed}</Text>
            <Text style={styles.statCaption}>cards que você já respondeu</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <IconOutline name="fire" size={20} color="#ea580c" />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{`Sequência de ${streak} dias`}</Text>
              <Text style={styles.rowBrief}>
                {`${profile.activeDaysLast30} dos últimos 30 dias com a meta batida`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sua curva de esquecimento</Text>
          <Text style={styles.sectionHint}>
            O que a revisão espaçada segurou nos últimos 30 dias.
          </Text>
          <ForgettingCurve
            retentionPercent={profile.retentionPercent}
            chartWidth={chartWidth}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          {profile.badges.map((badge, index) => (
            <View key={badge.id}>
              {index > 0 ? <View style={styles.divider} /> : null}
              <BadgeRow badge={badge} />
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Você no controle</Text>
          <SettingRow
            icon="flag"
            title="Meta diária"
            brief="Quantos cards a sessão de hoje vai ter"
            control={
              <View style={styles.stepper}>
                <Button
                  style={styles.stepperButton}
                  disabled={dailyGoal <= GOAL_MIN}
                  onPress={() => setGoalOverride(Math.max(GOAL_MIN, dailyGoal - GOAL_STEP))}
                >
                  −
                </Button>
                <Text style={styles.stepperValue}>{dailyGoal}</Text>
                <Button
                  style={styles.stepperButton}
                  disabled={dailyGoal >= GOAL_MAX}
                  onPress={() => setGoalOverride(Math.min(GOAL_MAX, dailyGoal + GOAL_STEP))}
                >
                  +
                </Button>
              </View>
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="clock-circle"
            title="Revisão espaçada"
            brief="Deixa o app escolher a hora de cada card voltar"
            control={
              <Switch
                checked={isAlgorithmOn}
                onChange={setAlgorithmOn}
                color={desfeedColor.primary}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="bell"
            title="Silêncio à noite"
            brief="Nenhum aviso depois do pôr do sol"
            control={
              <Switch
                checked={isQuietNightOn}
                onChange={setQuietNightOn}
                color={desfeedColor.primary}
              />
            }
          />
          <View style={styles.divider} />
          <SettingRow
            icon="notification"
            title="Lembrete do dia"
            brief="Único aviso, sempre no mesmo horário"
            control={
              <View style={styles.timePill}>
                <Text style={styles.timeText}>{profile.reminderTime}</Text>
              </View>
            }
          />
        </View>

        <Button type="primary" style={styles.cta} onPress={() => router.push('/hoje')}>
          {remainingToday > 0
            ? `Revisar os ${remainingToday} cards de hoje`
            : 'Meta de hoje concluída'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}
