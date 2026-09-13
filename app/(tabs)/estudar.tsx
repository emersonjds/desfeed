import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Result } from '@ant-design/react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import type { Card } from '../../src/entities/card/schema'
import { queueTodayResponseSchema } from '../../src/entities/card/schema'
import { useGenerateSessionMutation, useStudyThemesQuery } from '../../src/entities/study/queries'
import type { StudyTheme } from '../../src/entities/study/schema'
import { fetchJson } from '../../src/shared/api/client'
import { useDailySessionStore } from '../../src/features/daily-session/store'
import { memfeedColor, memfeedFont } from '../../src/shared/theme'

const CARDS_PER_SESSION = 12

// Curadoria local: o aluno toca em vez de digitar. Matéria fora desta lista cai no campo livre.
const TOPICS_BY_SUBJECT: Record<string, readonly string[]> = {
  Biologia: [
    'Fotossíntese: fase clara e ciclo de Calvin',
    'Respiração celular e mitocôndrias',
    'Divisão celular: mitose e meiose',
    'Genética mendeliana',
    'Ecologia: cadeias e teias alimentares',
  ],
  Física: [
    'Termodinâmica: entropia e segunda lei',
    'Leis de Newton e força resultante',
    'Trabalho, energia e potência',
    'Eletrodinâmica: corrente e resistência',
    'Ondulatória: som e luz',
  ],
  História: [
    'Era Vargas e o Estado Novo',
    'Revolução Industrial',
    'Brasil Colônia: economia açucareira',
    'Guerra Fria e a bipolarização',
    'Independências na América Latina',
  ],
  Literatura: [
    'Modernismo brasileiro: primeira fase',
    'Realismo e Machado de Assis',
    'Romantismo: gerações da poesia',
    'Barroco e Arcadismo',
    'Literatura contemporânea brasileira',
  ],
  Matemática: [
    'Derivadas e regra da cadeia',
    'Funções do segundo grau',
    'Probabilidade e análise combinatória',
    'Geometria espacial: prismas e pirâmides',
    'Progressões aritmética e geométrica',
  ],
  Química: [
    'Estequiometria e cálculo de mol',
    'Ligações químicas e geometria molecular',
    'Termoquímica: entalpia e Lei de Hess',
    'Equilíbrio químico e Le Chatelier',
    'Eletroquímica: pilhas e eletrólise',
  ],
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: memfeedColor.surfaceSoft },
  content: { padding: 14, gap: 14, paddingBottom: 30 },
  title: { fontFamily: memfeedFont.extrabold, fontSize: 22, color: memfeedColor.text },
  lede: {
    fontFamily: memfeedFont.medium,
    fontSize: 13,
    lineHeight: 19,
    color: memfeedColor.textMuted,
  },
  card: { backgroundColor: memfeedColor.surface, borderRadius: 18, padding: 16, gap: 12 },
  sectionLabel: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 11,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: memfeedColor.textMuted,
  },
  // 16px é o mínimo: abaixo disso o iOS dá zoom sozinho ao focar o campo.
  input: {
    fontFamily: memfeedFont.medium,
    fontSize: 16,
    color: memfeedColor.text,
    backgroundColor: memfeedColor.surfaceSoft,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: memfeedColor.borderSoft,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: memfeedColor.surfaceSoft,
    borderWidth: 1,
    borderColor: memfeedColor.borderSoft,
  },
  chipOn: { backgroundColor: memfeedColor.primarySoft, borderColor: memfeedColor.primary },
  chipText: { fontFamily: memfeedFont.bold, fontSize: 13, color: memfeedColor.textMuted },
  chipTextOn: { color: memfeedColor.primaryDeep },
  cta: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: memfeedColor.primaryDeep,
    borderBottomWidth: 4,
    borderBottomColor: memfeedColor.text,
  },
  ctaOff: { backgroundColor: memfeedColor.border, borderBottomColor: '#94a3b8' },
  ctaText: { fontFamily: memfeedFont.extrabold, fontSize: 16, color: memfeedColor.surface },
  suggestion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: memfeedColor.surface,
    borderRadius: 16,
    padding: 14,
  },
  suggestionBody: { flex: 1, gap: 3 },
  suggestionSubject: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 10.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: memfeedColor.accent,
  },
  suggestionTitle: { fontFamily: memfeedFont.bold, fontSize: 15, color: memfeedColor.text },
  suggestionReason: {
    fontFamily: memfeedFont.medium,
    fontSize: 12,
    lineHeight: 17,
    color: memfeedColor.textMuted,
  },
  count: {
    fontFamily: memfeedFont.extrabold,
    fontSize: 12,
    color: memfeedColor.primaryDeep,
    backgroundColor: memfeedColor.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  centered: { paddingVertical: 40, alignItems: 'center', gap: 10 },
})

const SuggestionRow = ({ theme, onPick }: { theme: StudyTheme; onPick: () => void }) => (
  <Pressable style={styles.suggestion} onPress={onPick} accessibilityRole="button">
    <View style={styles.suggestionBody}>
      <Text style={styles.suggestionSubject}>{theme.subject}</Text>
      <Text style={styles.suggestionTitle}>{theme.title}</Text>
      <Text style={styles.suggestionReason}>{theme.reason}</Text>
    </View>
    <Text style={styles.count}>{`${theme.cardCount}`}</Text>
    <IconOutline name="right" size={16} color={memfeedColor.textMuted} />
  </Pressable>
)

export default function EstudarScreen() {
  const router = useRouter()
  const themesQuery = useStudyThemesQuery()
  const generate = useGenerateSessionMutation()
  const startSession = useDailySessionStore((state) => state.start)

  const [subject, setSubject] = useState<string | null>(null)
  const [topic, setTopic] = useState('')

  const subjectTopics = subject ? (TOPICS_BY_SUBJECT[subject] ?? []) : []
  const canGenerate = subject !== null && topic.trim().length >= 3 && !generate.isPending

  const finishWithCards = (cards: Card[]) => {
    startSession(cards, cards.length)
    router.push('/hoje')
  }

  const runGeneration = (chosenSubject: string, chosenTopic: string) => {
    generate.mutate(
      { subject: chosenSubject, theme: chosenTopic, cardCount: CARDS_PER_SESSION },
      {
        onSuccess: (response) => finishWithCards(response.cards),
        // Gerador fora do ar não pode derrubar a demo: a fila do dia assume o
        // lugar dos cards novos e a sessão começa do mesmo jeito, sem erro na tela.
        onError: () => {
          fetchJson('/api/queue/today', queueTodayResponseSchema)
            .then((fallback) => finishWithCards(fallback.cards))
            .catch(() => router.push('/hoje'))
        },
      },
    )
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>Estudar agora</Text>
          <Text style={styles.lede}>
            Diga o assunto que você quer treinar. O Memfeed escreve as perguntas e agenda a
            volta de cada uma.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionLabel}>Matéria</Text>
          <View style={styles.chips}>
            {(themesQuery.data?.subjects ?? []).map((item) => {
              const selected = item === subject
              return (
                <Pressable
                  key={item}
                  onPress={() => {
                    setSubject(selected ? null : item)
                    setTopic('')
                  }}
                  style={[styles.chip, selected ? styles.chipOn : null]}
                  accessibilityRole="button"
                >
                  <Text style={[styles.chipText, selected ? styles.chipTextOn : null]}>{item}</Text>
                </Pressable>
              )
            })}
          </View>

          <Text style={styles.sectionLabel}>Assunto</Text>
          {subjectTopics.length > 0 ? (
            <View style={styles.chips}>
              {subjectTopics.map((item) => {
                const selected = item === topic
                return (
                  <Pressable
                    key={item}
                    onPress={() => setTopic(selected ? '' : item)}
                    style={[styles.chip, selected ? styles.chipOn : null]}
                    accessibilityRole="button"
                  >
                    <Text style={[styles.chipText, selected ? styles.chipTextOn : null]}>
                      {item}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          ) : (
            <TextInput
              value={topic}
              onChangeText={setTopic}
              placeholder={
                subject
                  ? 'Ex.: entropia em processos irreversíveis'
                  : 'Escolha uma matéria acima'
              }
              placeholderTextColor={memfeedColor.textMuted}
              style={styles.input}
              returnKeyType="go"
              onSubmitEditing={() => canGenerate && subject && runGeneration(subject, topic.trim())}
            />
          )}

          <Pressable
            disabled={!canGenerate}
            onPress={() => subject && runGeneration(subject, topic.trim())}
            style={[styles.cta, canGenerate ? null : styles.ctaOff]}
            accessibilityRole="button"
          >
            {generate.isPending ? (
              <ActivityIndicator color={memfeedColor.surface} />
            ) : (
              <IconOutline name="thunderbolt" size={19} color={memfeedColor.surface} />
            )}
            <Text style={styles.ctaText}>
              {generate.isPending ? 'Gerando com Gemini…' : 'Gerar feed'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.sectionLabel}>Sugestões para você</Text>

        {themesQuery.isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={memfeedColor.primary} />
          </View>
        ) : null}

        {themesQuery.isError ? (
          <Result
            img={<IconOutline name="close-circle" size={48} color={memfeedColor.error} />}
            title="Não deu para buscar as sugestões"
            buttonText="Tentar novamente"
            buttonType="primary"
            onButtonClick={() => themesQuery.refetch()}
          />
        ) : null}

        {(themesQuery.data?.suggested ?? []).map((theme) => (
          <SuggestionRow
            key={theme.id}
            theme={theme}
            onPick={() => runGeneration(theme.subject, theme.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
