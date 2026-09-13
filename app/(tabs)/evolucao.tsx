import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Result } from '@ant-design/react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useProgressQuery } from '../../src/entities/progress/queries'
import type { ConceptAtRisk, SubjectProgress } from '../../src/entities/progress/schema'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'

const BAR_MAX_HEIGHT = 74

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: desfeedColor.surfaceSoft },
  content: { padding: 14, gap: 12, paddingBottom: 30 },
  title: { fontFamily: desfeedFont.extrabold, fontSize: 22, color: desfeedColor.text },
  lede: { fontFamily: desfeedFont.medium, fontSize: 13, color: desfeedColor.textMuted },
  card: { backgroundColor: desfeedColor.surface, borderRadius: 18, padding: 16, gap: 12 },
  sectionLabel: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: desfeedColor.textMuted,
  },

  heroRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  heroValue: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 44,
    lineHeight: 48,
    color: desfeedColor.text,
  },
  heroUnit: { fontFamily: desfeedFont.extrabold, fontSize: 20, color: desfeedColor.textMuted },
  delta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: desfeedColor.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginBottom: 7,
  },
  deltaText: { fontFamily: desfeedFont.extrabold, fontSize: 12, color: desfeedColor.primaryDeep },
  heroCaption: {
    fontFamily: desfeedFont.medium,
    fontSize: 12.5,
    lineHeight: 18,
    color: desfeedColor.textMuted,
  },

  week: { flexDirection: 'row', alignItems: 'flex-end', gap: 7, height: BAR_MAX_HEIGHT + 20 },
  weekColumn: { flex: 1, alignItems: 'center', gap: 5 },
  bar: { width: '100%', borderRadius: 6, backgroundColor: desfeedColor.primary, minHeight: 4 },
  barRest: { backgroundColor: desfeedColor.borderSoft },
  weekDay: { fontFamily: desfeedFont.bold, fontSize: 11, color: desfeedColor.textMuted },

  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streakValue: { fontFamily: desfeedFont.extrabold, fontSize: 19, color: desfeedColor.text },
  freeze: {
    fontFamily: desfeedFont.bold,
    fontSize: 11.5,
    color: desfeedColor.accent,
    backgroundColor: desfeedColor.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },

  subjectRow: { gap: 6 },
  subjectHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subjectName: { fontFamily: desfeedFont.bold, fontSize: 14, color: desfeedColor.text },
  subjectMeta: { fontFamily: desfeedFont.medium, fontSize: 12, color: desfeedColor.textMuted },
  track: { height: 9, borderRadius: 999, backgroundColor: desfeedColor.borderSoft, overflow: 'hidden' },
  fill: { height: 9, borderRadius: 999, backgroundColor: desfeedColor.primary },
  subjectDelta: { fontFamily: desfeedFont.extrabold, fontSize: 12 },

  riskRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  riskBody: { flex: 1, gap: 2 },
  riskConcept: { fontFamily: desfeedFont.bold, fontSize: 14, color: desfeedColor.text },
  riskSubject: { fontFamily: desfeedFont.medium, fontSize: 12, color: desfeedColor.textMuted },
  riskDays: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 11.5,
    color: '#b45309',
    backgroundColor: '#fef3c7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },

  classRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  className: { fontFamily: desfeedFont.extrabold, fontSize: 15, color: desfeedColor.text },
  classCount: { fontFamily: desfeedFont.extrabold, fontSize: 15, color: desfeedColor.primaryDeep },
  centered: { paddingVertical: 50, alignItems: 'center', gap: 10 },
})

const SubjectRow = ({ item }: { item: SubjectProgress }) => {
  const rising = item.delta >= 0
  return (
    <View style={styles.subjectRow}>
      <View style={styles.subjectHead}>
        <Text style={styles.subjectName}>{item.subject}</Text>
        <Text
          style={[
            styles.subjectDelta,
            { color: rising ? desfeedColor.primaryDeep : '#b45309' },
          ]}
        >
          {`${rising ? '+' : ''}${item.delta} pts`}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${item.retention}%` }]} />
      </View>
      <Text style={styles.subjectMeta}>
        {`${item.retention}% retido · ${item.consolidated} de ${item.total} conceitos`}
      </Text>
    </View>
  )
}

const RiskRow = ({ item }: { item: ConceptAtRisk }) => (
  <View style={styles.riskRow}>
    <IconOutline name="clock-circle" size={19} color="#b45309" />
    <View style={styles.riskBody}>
      <Text style={styles.riskConcept}>{item.concept}</Text>
      <Text style={styles.riskSubject}>{item.subject}</Text>
    </View>
    <Text style={styles.riskDays}>
      {item.daysUntilForgotten <= 1 ? 'hoje' : `${item.daysUntilForgotten}d`}
    </Text>
  </View>
)

export default function EvolucaoScreen() {
  const progressQuery = useProgressQuery()

  if (progressQuery.isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator color={desfeedColor.primary} />
        </View>
      </SafeAreaView>
    )
  }

  if (progressQuery.isError || !progressQuery.data) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <Result
          img={<IconOutline name="close-circle" size={50} color={desfeedColor.error} />}
          title="Não deu para carregar sua evolução"
          buttonText="Tentar novamente"
          buttonType="primary"
          onButtonClick={() => progressQuery.refetch()}
        />
      </SafeAreaView>
    )
  }

  const data = progressQuery.data
  const gain = data.retentionD7 - data.retentionD7LastMonth
  const peakMinutes = Math.max(...data.weekMinutes.map((entry) => entry.minutes), 1)

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.title}>Sua evolução</Text>
          <Text style={styles.lede}>Você contra o seu esquecimento — não contra a turma.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Retenção em 7 dias</Text>
          <View style={styles.heroRow}>
            <Text style={styles.heroValue}>{data.retentionD7}</Text>
            <Text style={styles.heroUnit}>%</Text>
            <View style={styles.delta}>
              <IconOutline name="arrow-up" size={12} color={desfeedColor.primaryDeep} />
              <Text style={styles.deltaText}>{`${gain} pts`}</Text>
            </View>
          </View>
          <Text style={styles.heroCaption}>
            {`De cada 10 conceitos estudados, você ainda lembra de ${Math.round(
              data.retentionD7 / 10,
            )} uma semana depois. No mês passado eram ${Math.round(
              data.retentionD7LastMonth / 10,
            )}.`}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Sua semana</Text>
          <View style={styles.week}>
            {data.weekMinutes.map((entry, index) => (
              <View key={`${entry.day}-${index}`} style={styles.weekColumn}>
                <View
                  style={[
                    styles.bar,
                    { height: (entry.minutes / peakMinutes) * BAR_MAX_HEIGHT },
                    entry.minutes === 0 ? styles.barRest : null,
                  ]}
                />
                <Text style={styles.weekDay}>{entry.day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.streakRow}>
            <IconOutline name="fire" size={21} color="#ea580c" />
            <Text style={styles.streakValue}>{`${data.streakDays} dias seguidos`}</Text>
            <View style={{ flex: 1 }} />
            <Text style={styles.freeze}>{`${data.freezesLeft} folgas`}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Por matéria</Text>
          {data.subjects.map((item) => (
            <SubjectRow key={item.subject} item={item} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Prestes a esquecer</Text>
          {data.atRisk.map((item) => (
            <RiskRow key={item.concept} item={item} />
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Meta da turma</Text>
          <View style={styles.classRow}>
            <Text style={styles.className}>{data.classGoal.className}</Text>
            <Text
              style={styles.classCount}
            >{`${data.classGoal.done}/${data.classGoal.total}`}</Text>
          </View>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${Math.round((data.classGoal.done / data.classGoal.total) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.heroCaption}>{data.classGoal.label}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
