import type { Card } from '../../entities/card/schema';
import type { SelfEvalRating } from '../../entities/card/fsrs';

export type SessionProgress = {
  queue: Card[];
  currentIndex: number;
  completed: number;
  goal: number;
};

export type SessionAdvance = Pick<SessionProgress, 'queue' | 'currentIndex' | 'completed'> & {
  isFinished: boolean;
};

export const isSessionFinished = (progress: Pick<SessionProgress, 'completed' | 'goal'>): boolean =>
  progress.completed >= progress.goal;

export const currentCard = (progress: SessionProgress): Card | undefined =>
  progress.queue[progress.currentIndex];

export const advanceSession = (progress: SessionProgress, rating: SelfEvalRating): SessionAdvance => {
  const card = currentCard(progress);

  if (!card) {
    return {
      queue: progress.queue,
      currentIndex: progress.currentIndex,
      completed: progress.completed,
      isFinished: isSessionFinished(progress),
    };
  }

  const isAgain = rating === 'again';
  const nextQueue = isAgain ? [...progress.queue, card] : progress.queue;
  const nextCompleted = isAgain ? progress.completed : progress.completed + 1;

  return {
    queue: nextQueue,
    currentIndex: progress.currentIndex + 1,
    completed: nextCompleted,
    isFinished: isSessionFinished({ completed: nextCompleted, goal: progress.goal }),
  };
};
