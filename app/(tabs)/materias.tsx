import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Result } from '@ant-design/react-native'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle } from 'react-native-svg'

import {
  type ForgettingPeak,
  type NotebookStatus,
  type NotebookSummary,
} from '../../src/entities/notebook/library-schema'
import { useNotebookLibraryQuery } from '../../src/entities/notebook/library-queries'
import { memfeedColor, memfeedFont } from '../../src/shared/theme'

const RING_SIZE = 84
const RING_STROKE = 8

const statusStyle: Record<NotebookStatus, { label: string; color: string; background: string }> = {
  'revisao-hoje': { label: 'Revisão hoje', color: memfeedColor.primaryDeep, background: memfeedColor.primarySoft },
  estavel: { label: 'Retenção estável', color: memfeedColor.accent, background: memfeedColor.accentSoft },
  reforco: { label: 'Reforço necessário', color: memfeedColor.warning, background: '#fef3c7' },
}

const urgencyColor: Record<ForgettingPeak['urgency'], string> = {
  alta: memfeedColor.error,
  media: memfeedColor.warning,
  baixa: memfeedColor.primary,
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: memfeedColor.surfaceSoft },
  content: { padding: 14, gap: 12, paddingBottom: 28 },
  title: { fontFamily: memfeedFont.extrabold, fontSize: 22, color: memfeedColor.text },
  card: { backgroundColor: memfeedColor.surface, borderRadius: 18, padding: 16 },
  healthRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  healthInfo: { flex: 1, gap: 4 },
  eyebrow: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: memfeedColor.primaryDeep,
  },
  healthTitle: { fontFamily: memfeedFont.extrabold, fontSize: 19, color: memfeedColor.text },
  muted: { fontFamily: memfeedFont.medium, fontSize: 13, color: memfeedColor.textMuted, lineHeight: 18 },
  ringWrap: { width: RING_SIZE, height: RING_SIZE, alignItems: 'center', justifyContent: 'center' },
  ringLabel: { position: 'absolute', alignItems: 'center' },
  ringValue: { fontFamily: memfeedFont.extrabold, fontSize: 19, color: memfeedColor.primaryDeep },
  ringCaption: { fontFamily: memfeedFont.bold, fontSize: 9, color: memfeedColor.textMuted },
  stabilityRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: memfeedColor.surfaceSoft,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  stabilityText: { flex: 1, fontFamily: memfeedFont.semibold, fontSize: 13, color: memfeedColor.text },
  stabilityValue: { fontFamily: memfeedFont.extrabold, fontSize: 13, color: memfeedColor.primaryDeep },
  sectionTitle: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: memfeedColor.text,
    marginTop: 4,
  },
  notebook: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  cover: { width: 60, height: 60, borderRadius: 14, backgroundColor: memfeedColor.surfaceSoft },
  notebookInfo: { flex: 1, gap: 3 },
  notebookTitle: { fontFamily: memfeedFont.bold, fontSize: 15, color: memfeedColor.text },
  badge: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3 },
  badgeText: { fontFamily: memfeedFont.bold, fontSize: 10 },
  notebookMeta: { fontFamily: memfeedFont.medium, fontSize: 12, color: memfeedColor.textMuted },
  peak: { flexDirection: 'row', gap: 10 },
  peakDot: { width: 9, height: 9, borderRadius: 5, marginTop: 5 },
  peakInfo: { flex: 1, gap: 2 },
  peakWhen: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  peakTitle: { fontFamily: memfeedFont.bold, fontSize: 14, color: memfeedColor.text },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
})

const HealthRing = ({ percent }: { percent: number }) => {
  const radius = (RING_SIZE - RING_STROKE) / 2
  const circumference = 2 * Math.PI * radius
  const filled = circumference * (percent / 100)

  return (
    <View style={styles.ringWrap}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          stroke={memfeedColor.borderSoft}
          strokeWidth={RING_STROKE}
          fill="none"
        />
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={radius}
          stroke={memfeedColor.primary}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          fill="none"
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      </Svg>
      <View style={styles.ringLabel}>
        <Text style={styles.ringValue}>{percent}%</Text>
        <Text style={styles.ringCaption}>RETENÇÃO</Text>
      </View>
    </View>
  )
}

const NotebookRow = ({ notebook }: { notebook: NotebookSummary }) => {
  const status = statusStyle[notebook.status]

  return (
    <Pressable style={[styles.card, styles.notebook]}>
      <Image source={{ uri: notebook.coverUrl }} style={styles.cover} resizeMode="cover" />
      <View style={styles.notebookInfo}>
        <View style={[styles.badge, { backgroundColor: status.background }]}>
          <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
        </View>
        <Text style={styles.notebookTitle}>{notebook.title}</Text>
        <Text style={styles.notebookMeta}>
          {`${notebook.cardCount} cards · ${notebook.retentionPercent}% de retenção`}
        </Text>
        <Text style={styles.notebookMeta}>{notebook.nextReviewLabel}</Text>
      </View>
      <IconOutline name="right" size={18} color={memfeedColor.textMuted} />
    </Pressable>
  )
}

export default function MateriasScreen() {
  const libraryQuery = useNotebookLibraryQuery()

  if (libraryQuery.isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator color={memfeedColor.primary} />
          <Text style={styles.muted}>Carregando suas matérias…</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (libraryQuery.isError || !libraryQuery.data) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <Result
          title="Não deu para carregar suas matérias"
          message="Confira sua conexão e tente de novo."
          buttonText="Tentar novamente"
          onButtonClick={() => libraryQuery.refetch()}
        />
      </SafeAreaView>
    )
  }

  const library = libraryQuery.data

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Matérias</Text>

        <View style={styles.card}>
          <View style={styles.healthRow}>
            <View style={styles.healthInfo}>
              <Text style={styles.eyebrow}>FSRS ativo</Text>
              <Text style={styles.healthTitle}>Saúde sináptica global</Text>
              <Text style={styles.muted}>
                {`${library.consolidatedConcepts} de ${library.totalConcepts} conceitos consolidados em memória de longo prazo.`}
              </Text>
            </View>
            <HealthRing percent={library.globalRetentionPercent} />
          </View>
          <View style={styles.stabilityRow}>
            <IconOutline name="line-chart" size={17} color={memfeedColor.primaryDeep} />
            <Text style={styles.stabilityText}>Índice de estabilidade</Text>
            <Text style={styles.stabilityValue}>{`S = ${library.stabilityDays} dias`}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          {`Matérias ativas · ${library.notebooks.length}`}
        </Text>

        {library.notebooks.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.muted}>
              Nenhum caderno ainda. Escaneie uma página para gerar seus primeiros cards.
            </Text>
          </View>
        ) : (
          library.notebooks.map((notebook) => (
            <NotebookRow key={notebook.id} notebook={notebook} />
          ))
        )}

        <Text style={styles.sectionTitle}>Picos de esquecimento</Text>

        <View style={[styles.card, { gap: 16 }]}>
          {library.peaks.map((peak) => (
            <View key={peak.id} style={styles.peak}>
              <View style={[styles.peakDot, { backgroundColor: urgencyColor[peak.urgency] }]} />
              <View style={styles.peakInfo}>
                <Text style={[styles.peakWhen, { color: urgencyColor[peak.urgency] }]}>
                  {`${peak.whenLabel} · ${peak.cardCount} cards`}
                </Text>
                <Text style={styles.peakTitle}>{peak.title}</Text>
                <Text style={styles.muted}>{peak.detail}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
