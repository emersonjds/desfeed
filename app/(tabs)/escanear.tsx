import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useScanNotebook, type ScanStage } from '../../src/features/scan-notebook/useScanNotebook';
import { Button } from '../../src/shared/ui/Button';
import { Pill } from '../../src/shared/ui/Pill';
import { SolidShadow } from '../../src/shared/ui/SolidShadow';

const DEMO_NOTEBOOK_ID = 'demo-notebook';

const stageMessage: Record<ScanStage, string | null> = {
  idle: null,
  uploading: 'Enviando foto…',
  reading: 'Lendo a página…',
  generating: 'Gerando perguntas…',
  done: null,
  error: null,
};

const ProcessingBanner = ({ stage }: { stage: ScanStage }) => {
  const message = stageMessage[stage];
  if (!message) {
    return null;
  }
  return (
    <View className="flex-row items-center gap-2 rounded-2xl bg-surface-soft px-4 py-3">
      <ActivityIndicator color="#10b981" size="small" />
      <Text className="text-sm font-semibold text-text">{message}</Text>
    </View>
  );
};

const CaptureScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { stage, result, errorMessage, scan, reset } = useScanNotebook();
  const [pressed, setPressed] = useState(false);

  const handleCapture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({ quality: 0.6 });
    if (picture?.uri) {
      await scan(DEMO_NOTEBOOK_ID, picture.uri);
    }
  };

  const handlePickFromGallery = async () => {
    const picked = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.6 });
    const uri = picked.assets?.[0]?.uri;
    if (!picked.canceled && uri) {
      await scan(DEMO_NOTEBOOK_ID, uri);
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color="#10b981" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-8">
        <Text className="text-4xl">📷</Text>
        <Text className="text-center text-base font-bold text-text">
          O Desfeed usa a câmera para fotografar seu caderno
        </Text>
        <Text className="text-center text-sm text-text-muted">
          A foto vira perguntas de revisão automaticamente. Sem a câmera, você ainda pode escolher
          uma foto já salva na galeria.
        </Text>
        <Button label="Permitir câmera" onPress={requestPermission} />
        <Button label="Escolher da galeria" variant="neutral" onPress={handlePickFromGallery} />
      </View>
    );
  }

  if (stage === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-4 px-8">
        <Text className="text-4xl">⚠️</Text>
        <Text className="text-center text-sm text-text-muted">{errorMessage}</Text>
        <Button label="Tentar novamente" onPress={reset} />
      </View>
    );
  }

  if (stage === 'done' && result) {
    if (result.confidence === 'baixa' || result.cards.length === 0) {
      return (
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <Text className="text-4xl">🤔</Text>
          <Text className="text-center text-base font-bold text-text">
            Não deu para ler essa página com confiança
          </Text>
          <Text className="text-center text-sm text-text-muted">
            Prefira gerar cards ruins? Não. Tire outra foto com mais luz e o texto mais legível.
          </Text>
          <Button label="Tirar nova foto" onPress={reset} />
        </View>
      );
    }

    return (
      <View className="flex-1 gap-4 px-4 pt-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-extrabold text-text">Cards gerados</Text>
          <Pill label={`Confiança ${result.confidence}`} tone="primary" />
        </View>
        {result.cards.map((card) => (
          <View key={card.id} className="gap-1.5 rounded-2xl bg-surface p-4 shadow-sm">
            <Text className="text-xs font-bold uppercase tracking-wide text-text-muted">
              {card.subject} • {card.chapter}
            </Text>
            <Text className="text-base font-bold text-text">{card.question}</Text>
          </View>
        ))}
        <Button
          label={`Iniciar feed deste caderno (${result.cards.length} cards prontos)`}
          onPress={reset}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 gap-4 px-4 pt-4">
      <View className="w-full overflow-hidden rounded-2xl bg-surface-soft" style={{ height: 320 }}>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
      </View>

      <ProcessingBanner stage={stage} />

      <View className="mt-auto flex-row items-center justify-center gap-6 pb-4">
        <Button label="Galeria" variant="neutral" onPress={handlePickFromGallery} />
        <Pressable style={{ opacity: stage !== 'idle' ? 0.5 : 1 }} onPress={handleCapture} disabled={stage !== 'idle'} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)}>
          <SolidShadow height={64} shadowColor="#059669" borderRadius={32} pressed={pressed}>
            <View className="h-full w-full items-center justify-center rounded-full bg-primary">
              <Text className="text-2xl">📸</Text>
            </View>
          </SolidShadow>
        </Pressable>
      </View>
    </View>
  );
};

export default function EscanearScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <View className="flex-row items-center gap-2 px-4 pb-2">
        <Text className="text-xl">🧠</Text>
        <Text className="text-lg font-extrabold tracking-tight text-text">Desfeed</Text>
      </View>
      <CaptureScreen />
    </SafeAreaView>
  );
}
