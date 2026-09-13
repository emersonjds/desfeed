import { useEffect, useRef } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';

import type { Card } from '../../entities/card/schema';
import type { SelfEvalRating } from '../../entities/card/fsrs';
import { QuestionCard } from '../question-card/QuestionCard';

type FeedListProps = {
  data: Card[];
  activeIndex: number;
  contentHeight: number;
  onRate: (card: Card, rating: SelfEvalRating) => void;
};

export const FeedList = ({ data, activeIndex, contentHeight, onRate }: FeedListProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const listRef = useRef<FlatList<Card>>(null);
  const itemHeight = contentHeight || screenHeight;

  useEffect(() => {
    if (activeIndex < data.length) {
      listRef.current?.scrollToOffset({ offset: activeIndex * itemHeight, animated: true });
    }
  }, [activeIndex, data.length, itemHeight]);

  return (
    <FlatList
      ref={listRef}
      data={data}
      keyExtractor={(card, index) => `${card.id}-${index}`}
      pagingEnabled
      snapToInterval={itemHeight}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
      renderItem={({ item }) => (
        <QuestionCard card={item} height={itemHeight} onRate={(rating) => onRate(item, rating)} />
      )}
    />
  );
};
