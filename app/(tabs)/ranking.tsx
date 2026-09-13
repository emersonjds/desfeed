import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RankingScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-surface px-6" edges={['top']}>
      <Text className="text-lg font-jk-bold text-text">Ranking em breve</Text>
      <Text className="mt-2 text-center text-sm text-text-muted font-jk">
        Ligas e ranking social ficam para a próxima fase do Desfeed.
      </Text>
    </SafeAreaView>
  );
}
