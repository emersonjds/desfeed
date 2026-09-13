import { IconOutline } from '@ant-design/icons-react-native'
import { Button, Carousel, Tag } from '@ant-design/react-native'
import { StyleSheet, Text, View } from 'react-native'

import type { Card } from '../../entities/card/schema'
import { desfeedColor, desfeedFont } from '../../shared/theme'

type ScanResultProps = {
  cards: Card[]
  onStartFeed: () => void
  onScanAgain: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 12,
  },
  summary: {
    borderRadius: 18,
    padding: 14,
    gap: 8,
    backgroundColor: desfeedColor.surface,
  },
  summaryHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  summaryText: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 17,
    letterSpacing: -0.3,
    color: desfeedColor.text,
  },
  summaryBrief: {
    fontFamily: desfeedFont.medium,
    fontSize: 13,
    color: desfeedColor.textMuted,
  },
  carouselWrapper: {
    flex: 1,
    minHeight: 190,
  },
  carousel: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  slideCard: {
    borderRadius: 18,
    padding: 16,
    gap: 10,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
  slideMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  slideIndex: {
    fontFamily: desfeedFont.bold,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: desfeedColor.textMuted,
  },
  slideQuestion: {
    fontFamily: desfeedFont.bold,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: desfeedColor.text,
  },
  slideTerm: {
    fontFamily: desfeedFont.medium,
    fontSize: 13,
    color: desfeedColor.textMuted,
  },
  dot: {
    backgroundColor: desfeedColor.borderSoft,
  },
  dotActive: {
    backgroundColor: desfeedColor.primary,
  },
  actions: {
    gap: 10,
  },
  primaryAction: {
    height: 52,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  secondaryAction: {
    height: 48,
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
})

export const ScanResult = ({ cards, onStartFeed, onScanAgain }: ScanResultProps) => {
  const [first] = cards

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.summaryHead}>
          <View style={styles.summaryIcon}>
            <IconOutline name="check-circle" size={22} color={desfeedColor.primaryDeep} />
          </View>
          <View style={styles.summaryText}>
            <Text style={styles.summaryTitle}>{first?.subject ?? 'Página lida'}</Text>
            <Text style={styles.summaryBrief}>
              {`${cards.length} ${cards.length === 1 ? 'pergunta pronta' : 'perguntas prontas'} · ${first?.chapter ?? ''}`}
            </Text>
          </View>
          <Tag small selected>
            Pronto
          </Tag>
        </View>
        <Text style={styles.summaryBrief}>
          Confira se as perguntas batem com o que você estudou antes de começar.
        </Text>
      </View>

      <View style={styles.carouselWrapper}>
        <Carousel
          style={styles.carousel}
          infinite={false}
          dotStyle={styles.dot}
          dotActiveStyle={styles.dotActive}
        >
          {cards.map((card, index) => (
            <View key={card.id} style={styles.slide}>
              <View style={styles.slideCard}>
                <View style={styles.slideMeta}>
                  <Text style={styles.slideIndex}>{`Pergunta ${index + 1} de ${cards.length}`}</Text>
                  <Tag small>{card.chapter}</Tag>
                </View>
                <Text style={styles.slideQuestion}>{card.question}</Text>
                <Text style={styles.slideTerm}>{`Conceito: ${card.keyTerm}`}</Text>
              </View>
            </View>
          ))}
        </Carousel>
      </View>

      <View style={styles.actions}>
        <Button type="primary" style={styles.primaryAction} onPress={onStartFeed}>
          {`Começar pelo que acabei de escanear (${cards.length})`}
        </Button>
        <Button style={styles.secondaryAction} onPress={onScanAgain}>
          Escanear outra página
        </Button>
      </View>
    </View>
  )
}
