import { fsrs, Rating, type Card as FsrsCard, type CardInput, type Grade } from 'ts-fsrs';

import type { CardFsrsData } from './schema';

const scheduler = fsrs();

export const toFsrsCardInput = (data: CardFsrsData): CardInput => ({
  due: new Date(data.due),
  stability: data.stability,
  difficulty: data.difficulty,
  elapsed_days: data.elapsed_days,
  scheduled_days: data.scheduled_days,
  learning_steps: data.learning_steps,
  reps: data.reps,
  lapses: data.lapses,
  state: data.state,
  last_review: data.last_review ? new Date(data.last_review) : null,
});

export type SelfEvalRating = 'again' | 'hard' | 'good' | 'easy';

export const selfEvalRatingToFsrsRating: Record<SelfEvalRating, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

const formatIntervalDays = (scheduledDays: number): string => {
  if (scheduledDays < 1) {
    const minutes = Math.max(1, Math.round(scheduledDays * 24 * 60));
    return `+${minutes}m`;
  }
  return `+${Math.round(scheduledDays)}d`;
};

export type SelfEvalPreview = Record<SelfEvalRating, { intervalLabel: string; nextDue: Date }>;

export const previewSelfEvalIntervals = (fsrsData: CardFsrsData, now: Date): SelfEvalPreview => {
  const cardInput = toFsrsCardInput(fsrsData);
  const recordLog = scheduler.repeat(cardInput, now);

  return (Object.keys(selfEvalRatingToFsrsRating) as SelfEvalRating[]).reduce(
    (preview, rating) => {
      const item = recordLog[selfEvalRatingToFsrsRating[rating]];
      preview[rating] = {
        intervalLabel: formatIntervalDays(item.card.scheduled_days),
        nextDue: item.card.due,
      };
      return preview;
    },
    {} as SelfEvalPreview,
  );
};

export const nextFsrsCard = (
  fsrsData: CardFsrsData,
  rating: SelfEvalRating,
  now: Date,
): FsrsCard => {
  const cardInput = toFsrsCardInput(fsrsData);
  const recordLog = scheduler.repeat(cardInput, now);
  return recordLog[selfEvalRatingToFsrsRating[rating]].card;
};

export const formatReviewLabel = (reviewNumber: number, scheduledDays: number): string =>
  `Rev. #${reviewNumber} • ${formatIntervalDays(scheduledDays)} (FSRS)`;
