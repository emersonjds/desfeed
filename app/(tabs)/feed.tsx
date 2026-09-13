import { useRouter } from 'expo-router';
import { Icon } from '../../src/shared/ui/Icon';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTodayQueueQuery } from '../../src/entities/card/queries';
import type { SelfEvalRating } from '../../src/entities/card/fsrs';
import type { Card } from '../../src/entities/card/schema';
import { useSubmitReviewMutation } from '../../src/entities/review/mutations';
import { useSessionTodayQuery } from '../../src/entities/session/queries';
import { useDailySessionStore } from '../../src/features/daily-session/store';
import { Button } from '../../src/shared/ui/Button';
import { GoalBar } from '../../src/shared/ui/GoalBar';
import { Pill } from '../../src/shared/ui/Pill';
import { FeedList } from '../../src/widgets/feed-list/FeedList';

const FeedHeader = ({ streak, xp }: { streak: number; xp: number }) => (
  <View className="flex-row items-center justify-between px-4 pb-2">
    <View className="flex-row items-center gap-1.5">
      <Icon name="infinito" size={24} color="#10b981" />
      <Text className="text-lg font-jk-extrabold tracking-tight text-text">Desfeed</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <Pill icon="streak" label={`${streak}d`} tone="neutral" />
      <Pill icon="xp" label={`${xp}`} tone="neutral" />
      <View className="h-8 w-8 items-center justify-center rounded-full bg-primary/15">
        <Icon name="perfil" size={18} color="#059669" />
      </View>
    </View>
  </View>
);

export default function FeedScreen() {
  const router = useRouter();
  const queueQuery = useTodayQueueQuery();
  const sessionQuery = useSessionTodayQuery();
  const submitReview = useSubmitReviewMutation();
  const store = useDailySessionStore();
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (queueQuery.data && !store.isStarted) {
      store.start(queueQuery.data.cards, queueQuery.data.cards.length);
    }
  }, [queueQuery.data, store.isStarted, store.start]);

  useEffect(() => {
    if (store.isFinished) {
      router.replace('/sessao-concluida');
    }
  }, [store.isFinished, router]);

  const handleRate = (card: Card, rating: SelfEvalRating) => {
    store.answer(rating);
    submitReview.mutate(
      { cardId: card.id, rating, reviewedAt: new Date().toISOString() },
      { onSuccess: (response) => store.addXp(response.xpGained) },
    );
  };

  const streak = sessionQuery.data?.streak ?? 0;
  const xp = sessionQuery.data?.xp ?? 0;
  const goal = sessionQuery.data?.goal ?? store.goal;
  const completedToday = (sessionQuery.data?.completed ?? 0) + store.completed;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <FeedHeader streak={streak} xp={xp} />
      <View className="px-4 pb-3">
        <GoalBar completed={completedToday} goal={goal} label="Meta diária • sprint ativo" />
      </View>

      <View className="flex-1" onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}>
        {queueQuery.isLoading ? (
          <View className="flex-1 items-center justify-center gap-3">
            <ActivityIndicator color="#10b981" />
            <Text className="text-sm text-text-muted font-jk">Carregando a fila de hoje…</Text>
          </View>
        ) : null}

        {queueQuery.isError ? (
          <View className="flex-1 items-center justify-center gap-4 px-8">
            <Text className="text-center text-sm text-text-muted font-jk">
              Não deu para buscar a fila de hoje. Confira sua conexão e tente de novo.
            </Text>
            <Button label="Tentar novamente" variant="neutral" onPress={() => queueQuery.refetch()} />
          </View>
        ) : null}

        {queueQuery.data && queueQuery.data.cards.length === 0 ? (
          <View className="flex-1 items-center justify-center gap-2 px-8">
            <Icon name="broto" size={32} color="#10b981" />
            <Text className="text-center text-base font-jk-bold text-text">Nada para revisar agora</Text>
            <Text className="text-center text-sm text-text-muted font-jk">
              Escaneie um caderno para gerar novos cards de recuperação ativa.
            </Text>
          </View>
        ) : null}

        {queueQuery.data && queueQuery.data.cards.length > 0 && contentHeight > 0 && !store.isFinished ? (
          <FeedList
            data={store.queue}
            activeIndex={store.currentIndex}
            contentHeight={contentHeight}
            onRate={handleRate}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}
