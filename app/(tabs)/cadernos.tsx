import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CadernosScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-surface px-6" edges={['top']}>
      <Text className="text-lg font-bold text-text">Cadernos em breve</Text>
      <Text className="mt-2 text-center text-sm text-text-muted">
        A lista de cadernos escaneados ganha tela própria depois da espinha da demo.
      </Text>
    </SafeAreaView>
  );
}
