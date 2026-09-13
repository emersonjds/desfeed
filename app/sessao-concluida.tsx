import { useRouter } from 'expo-router';
import { Icon } from '../src/shared/ui/Icon';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSessionTodayQuery } from '../src/entities/session/queries';
import { useDailySessionStore } from '../src/features/daily-session/store';
import { Button } from '../src/shared/ui/Button';

const formatFocusTime = (startedAt: Date | null): string => {
  if (!startedAt) {
    return '0m';
  }
  const elapsedMinutes = Math.max(1, Math.round((Date.now() - startedAt.getTime()) / 60_000));
  return `${elapsedMinutes}m`;
};

const formatNextReview = (nextDue: Date | null): string => {
  if (!nextDue) {
    return 'Assim que houver novos cards';
  }
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(nextDue);
};

const StatCard = ({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: string;
}) => (
  <View className="flex-1 gap-2 rounded-2xl bg-surface p-4 shadow-sm">
    <View className="flex-row items-center justify-between">
      <Text className="text-[10px] font-jk-bold uppercase tracking-wider text-text-muted">{label}</Text>
      <Text className="text-base font-jk">{icon}</Text>
    </View>
    <View>
      <Text className="text-xl font-jk-extrabold text-text">{value}</Text>
      <Text className="mt-0.5 text-xs text-text-muted font-jk">{helper}</Text>
    </View>
  </View>
);

export default function SessaoConcluidaScreen() {
  const router = useRouter();
  const sessionQuery = useSessionTodayQuery();
  const completed = useDailySessionStore((state) => state.completed);
  const startedAt = useDailySessionStore((state) => state.startedAt);
  const xpEarned = useDailySessionStore((state) => state.xpEarned);
  const lastIntervalLabel = useDailySessionStore((state) => state.lastIntervalLabel);
  const lastNextDue = useDailySessionStore((state) => state.lastNextDue);
  const [closed, setClosed] = useState(false);

  const streak = sessionQuery.data?.streak ?? 0;

  return (
    <SafeAreaView className="flex-1 bg-surface-soft" edges={['top', 'bottom']}>
      <View className="flex-1 gap-4 px-4 pt-6">
        <View className="items-center gap-2">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-surface shadow-sm">
            <Icon name="cerebro" size={44} color="#10b981" />
          </View>
          <View className="rounded-full bg-primary/10 px-3 py-1">
            <Text className="text-[11px] font-jk-extrabold uppercase tracking-wider text-primary-deep">
              Modo repouso consciente
            </Text>
          </View>
          <Text className="mt-2 text-center text-2xl font-jk-extrabold tracking-tight text-text">
            Acabou por hoje
          </Text>
          <Text className="text-center text-sm text-text-muted font-jk">
            Seu cérebro concluiu a cota de hoje. O algoritmo pausou seu feed de propósito para evitar
            fadiga neural e fixar a memória de longo prazo.
          </Text>
        </View>

        <View className="flex-row gap-3 rounded-2xl bg-surface p-4 shadow-sm">
          <View className="w-1.5 rounded-full bg-primary" />
          <Text className="flex-1 text-sm italic leading-relaxed text-text font-jk">
            "Seu cérebro precisa esquecer um pouco para lembrar melhor. A neurociência agradece a
            pausa."
          </Text>
        </View>

        <View className="flex-row gap-3">
          <StatCard
            label="Cards revisados"
            value={`${completed} cards`}
            helper={`${formatFocusTime(startedAt)} de foco`}
            icon="pasta"
          />
          <StatCard label="Sequência" value={`${streak} dias`} helper="Streak protegido" icon="streak" />
        </View>
        <View className="flex-row gap-3">
          <StatCard label="XP ganho" value={`+${xpEarned} XP`} helper="Nesta sessão" icon="xp" />
          <StatCard
            label="Próxima revisão"
            value={lastIntervalLabel ?? '—'}
            helper={formatNextReview(lastNextDue)}
            icon="⏰"
          />
        </View>

        <View className="mt-auto gap-3 pb-2">
          {closed ? (
            <View className="h-14 items-center justify-center rounded-2xl bg-primary/10">
              <Text className="text-base font-jk-bold text-primary-deep">
                Sessão salva. Até amanhã
              </Text>
            </View>
          ) : (
            <Button label="Fechar app e descansar" onPress={() => setClosed(true)} />
          )}
          <Button
            label="Ver meus cadernos e estatísticas"
            variant="neutral"
            onPress={() => router.push('/cadernos')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
