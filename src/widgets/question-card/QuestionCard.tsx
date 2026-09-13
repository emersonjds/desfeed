import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import type { Card, OptionId } from '../../entities/card/schema';
import { formatReviewLabel, type SelfEvalRating } from '../../entities/card/fsrs';
import { SelfEvaluation } from '../../features/answer-card/SelfEvaluation';
import { Badge, type BadgeState } from '../../shared/ui/Badge';
import { CircularTimer } from '../../shared/ui/CircularTimer';
import { Pill } from '../../shared/ui/Pill';
import { SolidShadow } from '../../shared/ui/SolidShadow';

type QuestionCardProps = {
  card: Card;
  height: number;
  onRate: (rating: SelfEvalRating) => void;
};

const CARD_TIMER_SECONDS = 15;

const compactCount = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const splitOnHighlight = (question: string, highlightTerm: string) => {
  const index = question.toLowerCase().indexOf(highlightTerm.toLowerCase());
  if (index === -1) {
    return { before: question, match: '', after: '' };
  }
  return {
    before: question.slice(0, index),
    match: question.slice(index, index + highlightTerm.length),
    after: question.slice(index + highlightTerm.length),
  };
};

const OptionRow = ({
  label,
  letter,
  badgeState,
  disabled,
  onPress,
}: {
  label: string;
  letter: OptionId;
  badgeState: BadgeState;
  disabled: boolean;
  onPress: () => void;
}) => {
  const [pressed, setPressed] = useState(false);
  const shadowColor =
    badgeState === 'correct' ? '#059669' : badgeState === 'wrong' ? '#b91c1c' : '#cbd5e1';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <SolidShadow height={48} shadowColor={shadowColor} borderRadius={16} pressed={pressed}>
        <View className="h-full w-full flex-row items-center justify-between rounded-2xl bg-surface px-3">
          <View className="min-w-0 flex-1 flex-row items-center gap-3">
            <Badge letter={letter} state={badgeState} />
            <Text className="flex-1 text-sm font-semibold text-text" numberOfLines={1}>
              {label}
            </Text>
          </View>
          {badgeState === 'correct' ? <Text className="text-lg text-primary">✓</Text> : null}
          {badgeState === 'wrong' ? <Text className="text-lg text-red-600">✕</Text> : null}
        </View>
      </SolidShadow>
    </Pressable>
  );
};

export const QuestionCard = ({ card, height, onRate }: QuestionCardProps) => {
  const [selectedOptionId, setSelectedOptionId] = useState<OptionId | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(CARD_TIMER_SECONDS);
  const question = useMemo(() => splitOnHighlight(card.question, card.highlightTerm), [card]);

  useEffect(() => {
    setSelectedOptionId(null);
    setSecondsLeft(CARD_TIMER_SECONDS);
  }, [card.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [card.id]);

  const badgeStateFor = (optionId: OptionId): BadgeState => {
    if (!selectedOptionId) {
      return 'idle';
    }
    if (optionId === card.correctOptionId) {
      return 'correct';
    }
    if (optionId === selectedOptionId) {
      return 'wrong';
    }
    return 'idle';
  };

  return (
    <View style={{ height }} className="gap-3 px-4 pt-2">
      <View className="flex-row items-center justify-between gap-2">
        <View className="min-w-0 flex-1 flex-row flex-wrap items-center gap-1.5">
          <Pill icon="📖" label={`${card.subject} • ${card.chapter}`} tone="neutral" />
          <Pill
            icon="🧠"
            label={formatReviewLabel(card.reviewNumber, card.fsrs.scheduled_days)}
            tone="accent"
          />
        </View>
        <CircularTimer secondsLeft={secondsLeft} totalSeconds={CARD_TIMER_SECONDS} />
      </View>

      <View className="h-36 w-full overflow-hidden rounded-2xl bg-surface-soft">
        <Image source={{ uri: card.imageUrl }} className="h-full w-full" resizeMode="cover" />
        <View className="absolute inset-x-2.5 bottom-2.5 flex-row items-center justify-between">
          <Pill icon="✨" label="Recall Flashcard Hook" tone="neutral" />
          <Pill label={card.keyTerm} tone="primary" />
        </View>
      </View>

      <Text className="text-lg font-bold leading-snug text-text">
        {question.before}
        {question.match ? (
          <Text className="text-primary-deep underline">{question.match}</Text>
        ) : null}
        {question.after}
      </Text>

      <View className="flex-row gap-3">
        <View className="flex-1 gap-2.5">
          {card.options.map((option) => (
            <OptionRow
              key={option.id}
              letter={option.id}
              label={option.label}
              badgeState={badgeStateFor(option.id)}
              disabled={selectedOptionId !== null}
              onPress={() => setSelectedOptionId(option.id)}
            />
          ))}
        </View>
        <View className="w-11 items-center justify-end gap-3.5 pb-1">
          <View className="items-center gap-0.5">
            <Text className="text-lg">🧠</Text>
            <Text className="text-xs font-bold text-text-muted">{card.masteryPercent}%</Text>
          </View>
          <View className="items-center gap-0.5">
            <Text className="text-lg">🔖</Text>
            <Text className="text-xs font-bold text-text-muted">
              {compactCount(card.bookmarkCount)}
            </Text>
          </View>
          <View className="items-center gap-0.5">
            <Text className="text-lg">↪️</Text>
            <Text className="text-xs font-bold text-text-muted">
              {compactCount(card.shareCount)}
            </Text>
          </View>
        </View>
      </View>

      <SelfEvaluation fsrsData={card.fsrs} onRate={onRate} disabled={selectedOptionId === null} />

      <Text className="text-center text-xs text-text-muted opacity-60">
        Avalie sua lembrança para avançar automaticamente
      </Text>
    </View>
  );
};
