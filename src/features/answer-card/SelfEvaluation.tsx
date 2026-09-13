import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { CardFsrsData } from '../../entities/card/schema';
import { previewSelfEvalIntervals, type SelfEvalRating } from '../../entities/card/fsrs';
import { SolidShadow } from '../../shared/ui/SolidShadow';

type SelfEvaluationProps = {
  fsrsData: CardFsrsData;
  onRate: (rating: SelfEvalRating) => void;
  disabled?: boolean;
};

const ratingOrder: SelfEvalRating[] = ['again', 'hard', 'good', 'easy'];

const ratingLabel: Record<SelfEvalRating, string> = {
  again: 'Errei',
  hard: 'Difícil',
  good: 'Bom',
  easy: 'Fácil',
};

const ratingTextClass: Record<SelfEvalRating, string> = {
  again: 'text-red-600',
  hard: 'text-amber-600',
  good: 'text-blue-600',
  easy: 'text-white',
};

const RatingButton = ({
  rating,
  intervalLabel,
  disabled,
  onPress,
}: {
  rating: SelfEvalRating;
  intervalLabel: string;
  disabled?: boolean;
  onPress: () => void;
}) => {
  const [pressed, setPressed] = useState(false);
  const isPrimary = rating === 'easy';

  return (
    <Pressable
      className="flex-1"
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <SolidShadow
        height={64}
        shadowColor={isPrimary ? '#059669' : '#cbd5e1'}
        borderRadius={12}
        pressed={pressed}
      >
        <View
          className={`h-full w-full items-center justify-center rounded-xl ${
            isPrimary ? 'bg-primary' : 'bg-surface-soft'
          }`}
        >
          <Text className={`text-sm font-extrabold leading-none ${ratingTextClass[rating]}`}>
            {ratingLabel[rating]}
          </Text>
          <Text
            className={`mt-1 text-xs font-bold ${isPrimary ? 'text-white/90' : 'text-text-muted opacity-75'}`}
          >
            {intervalLabel}
          </Text>
        </View>
      </SolidShadow>
    </Pressable>
  );
};

export const SelfEvaluation = ({ fsrsData, onRate, disabled = false }: SelfEvaluationProps) => {
  const preview = useMemo(() => previewSelfEvalIntervals(fsrsData, new Date()), [fsrsData]);

  return (
    <View className="rounded-2xl bg-surface p-3.5 shadow-sm">
      <View className="mb-2.5 flex-row items-center justify-between">
        <Text className="text-xs font-extrabold uppercase tracking-wider text-text">
          Autoavaliação da lembrança
        </Text>
        <View className="rounded-full bg-primary/10 px-2 py-0.5">
          <Text className="text-xs font-extrabold text-primary-deep">+30 XP</Text>
        </View>
      </View>
      <View className="flex-row gap-1.5">
        {ratingOrder.map((rating) => (
          <RatingButton
            key={rating}
            rating={rating}
            intervalLabel={preview[rating].intervalLabel}
            disabled={disabled}
            onPress={() => onRate(rating)}
          />
        ))}
      </View>
    </View>
  );
};
