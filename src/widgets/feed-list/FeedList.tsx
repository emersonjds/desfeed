import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, type NativeScrollEvent, type NativeSyntheticEvent, View } from 'react-native'

import type { SelfEvalRating } from '../../entities/card/fsrs'
import type { Card } from '../../entities/card/schema'
import { QuestionCard } from '../question-card/QuestionCard'

type FeedListProps = {
  cards: Card[]
  activeIndex: number
  xpReward: number
  onIndexChange: (index: number) => void
  onRate: (card: Card, rating: SelfEvalRating) => void
}

export const FeedList = ({
  cards,
  activeIndex,
  xpReward,
  onIndexChange,
  onRate,
}: FeedListProps) => {
  const listRef = useRef<FlatList<Card>>(null)
  const [pageHeight, setPageHeight] = useState(0)

  // Medir o container aqui é o uso correto: a paginação precisa saber a altura da janela
  // para encaixar um card por tela. O que não se faz é usar pixel medido para dimensionar
  // o conteúdo interno do card — isso é trabalho do flex.
  const handleLayout = useCallback((height: number) => {
    setPageHeight((current) => (current === height ? current : height))
  }, [])

  // Avaliar um card avança o índice na store; o scroll segue. Deslizar faz o caminho
  // inverso. Os dois sentidos ficam sincronizados, então a nota nunca vai para o card errado.
  useEffect(() => {
    if (pageHeight === 0 || activeIndex >= cards.length) return
    listRef.current?.scrollToOffset({ offset: activeIndex * pageHeight, animated: true })
  }, [activeIndex, cards.length, pageHeight])

  const handleMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (pageHeight === 0) return
    const index = Math.round(event.nativeEvent.contentOffset.y / pageHeight)
    onIndexChange(index)
  }

  return (
    <View style={{ flex: 1 }} onLayout={(event) => handleLayout(event.nativeEvent.layout.height)}>
      {pageHeight > 0 ? (
        <FlatList
          ref={listRef}
          data={cards}
          keyExtractor={(card, index) => `${card.id}-${index}`}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          snapToInterval={pageHeight}
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumEnd}
          getItemLayout={(_, index) => ({
            length: pageHeight,
            offset: pageHeight * index,
            index,
          })}
          renderItem={({ item, index }) => (
            <View style={{ height: pageHeight }}>
              <QuestionCard
                card={item}
                xpReward={xpReward}
                isActive={index === activeIndex}
                onRate={(rating) => onRate(item, rating)}
              />
            </View>
          )}
        />
      ) : null}
    </View>
  )
}
