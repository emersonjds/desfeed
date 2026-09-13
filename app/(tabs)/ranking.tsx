import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Result } from '@ant-design/react-native'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useRankingQuery } from '../../src/entities/ranking/queries'
import type { RankingEntry, RankingTrend } from '../../src/entities/ranking/schema'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'

const trendIcon: Record<RankingTrend, { name: 'arrow-up' | 'arrow-down' | 'minus'; color: string }> = {
  subindo: { name: 'arrow-up', color: desfeedColor.primaryDeep },
  caindo: { name: 'arrow-down', color: desfeedColor.error },
  estavel: { name: 'minus', color: desfeedColor.textMuted },
}

const podiumHeights = [86, 104, 72]

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: desfeedColor.surfaceSoft },
  content: { padding: 14, gap: 12, paddingBottom: 28 },
  title: { fontFamily: desfeedFont.extrabold, fontSize: 22, color: desfeedColor.text },
  card: { backgroundColor: desfeedColor.surface, borderRadius: 18, padding: 16 },
  leagueHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  leagueInfo: { flex: 1, gap: 2 },
  leagueName: { fontFamily: desfeedFont.extrabold, fontSize: 17, color: desfeedColor.text },
  muted: { fontFamily: desfeedFont.medium, fontSize: 12, color: desfeedColor.textMuted },
  endsIn: {
    fontFamily: desfeedFont.bold,
    fontSize: 11,
    color: desfeedColor.accent,
    backgroundColor: desfeedColor.accentSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  podium: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginTop: 18 },
  podiumColumn: { flex: 1, alignItems: 'center', gap: 6 },
  podiumAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  podiumName: { fontFamily: desfeedFont.bold, fontSize: 12, color: desfeedColor.text, textAlign: 'center' },
  podiumXp: { fontFamily: desfeedFont.extrabold, fontSize: 13, color: desfeedColor.primaryDeep },
  podiumBase: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.surfaceSoft,
  },
  podiumPosition: { fontFamily: desfeedFont.extrabold, fontSize: 18, color: desfeedColor.textMuted },
  sectionTitle: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: desfeedColor.text,
    marginTop: 4,
  },
  zone: {
    fontFamily: desfeedFont.bold,
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  entry: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11 },
  entryHighlight: {
    backgroundColor: desfeedColor.primarySoft,
    borderRadius: 14,
    paddingHorizontal: 12,
  },
  position: { width: 22, fontFamily: desfeedFont.extrabold, fontSize: 14, color: desfeedColor.textMuted },
  entryInfo: { flex: 1, gap: 1 },
  entryName: { fontFamily: desfeedFont.bold, fontSize: 14, color: desfeedColor.text },
  entryXp: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  entryXpText: { fontFamily: desfeedFont.extrabold, fontSize: 14, color: desfeedColor.text },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: desfeedColor.borderSoft },
  duelRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  duelInfo: { flex: 1, gap: 3 },
  duelTitle: { fontFamily: desfeedFont.extrabold, fontSize: 15, color: desfeedColor.text },
  duelButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: desfeedColor.primary,
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  duelButtonText: { fontFamily: desfeedFont.extrabold, fontSize: 15, color: desfeedColor.surface },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
})

const EntryRow = ({ entry }: { entry: RankingEntry }) => {
  const trend = trendIcon[entry.trend]

  return (
    <View style={[styles.entry, entry.isCurrentUser ? styles.entryHighlight : null]}>
      <Text style={styles.position}>{entry.position}</Text>
      <View style={styles.podiumAvatar}>
        <IconOutline name="user" size={20} color={desfeedColor.primaryDeep} />
      </View>
      <View style={styles.entryInfo}>
        <Text style={styles.entryName}>{entry.name}</Text>
        <Text style={styles.muted}>{entry.headline}</Text>
      </View>
      <View style={styles.entryXp}>
        <IconOutline name={trend.name} size={13} color={trend.color} />
        <Text style={styles.entryXpText}>{entry.xp.toLocaleString('pt-BR')}</Text>
      </View>
    </View>
  )
}

export default function RankingScreen() {
  const rankingQuery = useRankingQuery()

  if (rankingQuery.isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <View style={styles.centered}>
          <ActivityIndicator color={desfeedColor.primary} />
          <Text style={styles.muted}>Carregando a liga…</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (rankingQuery.isError || !rankingQuery.data) {
    return (
      <SafeAreaView style={styles.screen} edges={['top']}>
        <Result
          title="Não deu para carregar o ranking"
          message="Confira sua conexão e tente de novo."
          buttonText="Tentar novamente"
          onButtonClick={() => rankingQuery.refetch()}
        />
      </SafeAreaView>
    )
  }

  const ranking = rankingQuery.data
  // O pódio é exibido 2º · 1º · 3º, como num pódio de verdade.
  const podiumOrder = [ranking.podium[1], ranking.podium[0], ranking.podium[2]]

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Ranking</Text>

        <View style={styles.card}>
          <View style={styles.leagueHeader}>
            <IconOutline name="trophy" size={22} color={desfeedColor.accent} />
            <View style={styles.leagueInfo}>
              <Text style={styles.leagueName}>{ranking.leagueName}</Text>
              <Text style={styles.muted}>{ranking.leagueRankLabel}</Text>
            </View>
            <Text style={styles.endsIn}>{ranking.endsInLabel}</Text>
          </View>

          <View style={styles.podium}>
            {podiumOrder.map((entry, index) => (
              <View key={entry.id} style={styles.podiumColumn}>
                <View style={styles.podiumAvatar}>
                  <IconOutline name="user" size={22} color={desfeedColor.primaryDeep} />
                </View>
                <Text style={styles.podiumName} numberOfLines={1}>
                  {entry.name}
                </Text>
                <Text style={styles.podiumXp}>{entry.xp.toLocaleString('pt-BR')}</Text>
                <View style={[styles.podiumBase, { height: podiumHeights[index] }]}>
                  <Text style={styles.podiumPosition}>{entry.position}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Classificação da semana</Text>

        <View style={styles.card}>
          <Text style={[styles.zone, { color: desfeedColor.primaryDeep }]}>
            {`Zona de promoção · top ${ranking.promotionCutoff}`}
          </Text>
          {ranking.entries.map((entry, index) => (
            <View key={entry.id}>
              {entry.position === ranking.relegationCutoff ? (
                <Text style={[styles.zone, { color: desfeedColor.error, marginTop: 10 }]}>
                  Zona de rebaixamento
                </Text>
              ) : null}
              <EntryRow entry={entry} />
              {index < ranking.entries.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.duelRow}>
            <IconOutline name="thunderbolt" size={24} color={desfeedColor.accent} />
            <View style={styles.duelInfo}>
              <Text style={styles.duelTitle}>{ranking.duel.title}</Text>
              <Text style={styles.muted}>{ranking.duel.description}</Text>
            </View>
          </View>
          <Pressable style={styles.duelButton}>
            <IconOutline name="share-alt" size={18} color={desfeedColor.surface} />
            <Text style={styles.duelButtonText}>Compartilhar desafio</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
