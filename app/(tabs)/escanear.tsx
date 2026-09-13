import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Button, Card, Result } from '@ant-design/react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useScanNotebook, type ScanStage } from '../../src/features/scan-notebook/useScanNotebook'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'

const DEMO_NOTEBOOK_ID = 'demo-notebook'

const stageMessage: Record<ScanStage, string | null> = {
  idle: null,
  uploading: 'Enviando foto…',
  reading: 'Lendo a página…',
  generating: 'Gerando perguntas…',
  done: null,
  error: null,
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: desfeedColor.surfaceSoft,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  brandName: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 19,
    letterSpacing: -0.4,
    color: desfeedColor.text,
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 12,
  },
  viewfinder: {
    flex: 1,
    minHeight: 220,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: desfeedColor.surfaceSoft,
  },
  camera: {
    flex: 1,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: desfeedColor.surface,
  },
  bannerText: {
    fontFamily: desfeedFont.semibold,
    fontSize: 14,
    color: desfeedColor.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 12,
  },
  actionGrow: {
    flex: 1,
    borderRadius: 14,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  actionNeutral: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 0,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  resultList: {
    gap: 10,
    paddingBottom: 16,
  },
  cardMeta: {
    fontFamily: desfeedFont.bold,
    fontSize: 11,
    letterSpacing: 0.5,
    color: desfeedColor.textMuted,
    textTransform: 'uppercase',
  },
  cardQuestion: {
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.text,
    marginTop: 4,
  },
})

const ProcessingBanner = ({ stage }: { stage: ScanStage }) => {
  const message = stageMessage[stage]
  if (!message) {
    return null
  }
  return (
    <View style={styles.banner}>
      <ActivityIndicator size="small" color={desfeedColor.primary} />
      <Text style={styles.bannerText}>{message}</Text>
    </View>
  )
}

const CaptureScreen = () => {
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView>(null)
  const { stage, result, errorMessage, scan, reset } = useScanNotebook()

  const handleCapture = async () => {
    const picture = await cameraRef.current?.takePictureAsync({ quality: 0.6 })
    if (picture?.uri) {
      await scan(DEMO_NOTEBOOK_ID, picture.uri)
    }
  }

  const handlePickFromGallery = async () => {
    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.6,
    })
    const uri = picked.assets?.[0]?.uri
    if (!picked.canceled && uri) {
      await scan(DEMO_NOTEBOOK_ID, uri)
    }
  }

  if (!permission) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={desfeedColor.primary} />
      </View>
    )
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Result
          img={<IconOutline name="camera" size={54} color={desfeedColor.primary} />}
          title="O Desfeed usa a câmera para fotografar seu caderno"
          message="A foto vira perguntas de revisão automaticamente. Sem a câmera, você ainda pode escolher uma foto já salva na galeria."
          buttonText="Permitir câmera"
          buttonType="primary"
          onButtonClick={requestPermission}
        />
        <View style={styles.actions}>
          <Button style={styles.actionNeutral} onPress={handlePickFromGallery}>
            Escolher da galeria
          </Button>
        </View>
      </View>
    )
  }

  if (stage === 'error') {
    return (
      <View style={styles.centered}>
        <Result
          img={<IconOutline name="exclamation-circle" size={54} color={desfeedColor.warning} />}
          title="Não deu para processar essa página"
          message={errorMessage ?? ''}
          buttonText="Tentar novamente"
          buttonType="primary"
          onButtonClick={reset}
        />
      </View>
    )
  }

  if (stage === 'done' && result) {
    if (result.confidence === 'baixa' || result.cards.length === 0) {
      return (
        <View style={styles.centered}>
          <Result
            img={<IconOutline name="question-circle" size={54} color={desfeedColor.textMuted} />}
            title="Não deu para ler essa página com confiança"
            message="Tire outra foto com mais luz e o texto mais legível — card ruim é pior que card nenhum."
            buttonText="Tirar nova foto"
            buttonType="primary"
            onButtonClick={reset}
          />
        </View>
      )
    }

    return (
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.resultList}>
          {result.cards.map((generated) => (
            <Card key={generated.id}>
              <Card.Body>
                <View style={styles.banner}>
                  <View>
                    <Text style={styles.cardMeta}>
                      {`${generated.subject} • ${generated.chapter}`}
                    </Text>
                    <Text style={styles.cardQuestion}>{generated.question}</Text>
                  </View>
                </View>
              </Card.Body>
            </Card>
          ))}
        </ScrollView>
        <View style={styles.actions}>
          <Button type="primary" style={styles.actionGrow} onPress={reset}>
            {`Iniciar feed deste caderno (${result.cards.length})`}
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <View style={styles.viewfinder}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
      </View>

      <ProcessingBanner stage={stage} />

      <View style={styles.actions}>
        <Button style={styles.actionNeutral} onPress={handlePickFromGallery}>
          Galeria
        </Button>
        <Button
          type="primary"
          style={styles.actionGrow}
          disabled={stage !== 'idle'}
          onPress={handleCapture}
        >
          Fotografar
        </Button>
      </View>
    </View>
  )
}

export default function EscanearScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <IconOutline name="scan" size={22} color={desfeedColor.primary} />
        <Text style={styles.brandName}>Escanear</Text>
      </View>
      <CaptureScreen />
    </SafeAreaView>
  )
}
