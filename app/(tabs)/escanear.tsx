import { IconOutline } from '@ant-design/icons-react-native'
import { ActivityIndicator, Button, Progress, Result } from '@ant-design/react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useScanNotebook, type ScanStage } from '../../src/features/scan-notebook/useScanNotebook'
import { desfeedColor, desfeedFont } from '../../src/shared/theme'
import { CameraPermissionPrimer } from '../../src/widgets/scanner/CameraPermissionPrimer'
import { ScanResult } from '../../src/widgets/scanner/ScanResult'

const DEMO_NOTEBOOK_ID = 'demo-notebook'

const stageProgress: Record<ScanStage, { percent: number; label: string } | null> = {
  idle: null,
  uploading: { percent: 25, label: 'Guardando a foto…' },
  reading: { percent: 62, label: 'Lendo o que está escrito…' },
  generating: { percent: 88, label: 'Montando as perguntas…' },
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
  headerTitle: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 19,
    letterSpacing: -0.4,
    color: desfeedColor.text,
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  viewfinder: {
    flex: 1,
    minHeight: 220,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: desfeedColor.text,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // A moldura para acima da faixa de dica: canto sobreposto por texto deixa de ser guia.
  frame: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    bottom: 58,
  },
  corner: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderColor: desfeedColor.surface,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 14,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 14,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 14,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 14,
  },
  hint: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: 'rgba(15, 19, 29, 0.72)',
  },
  hintText: {
    flex: 1,
    fontFamily: desfeedFont.semibold,
    fontSize: 13,
    color: desfeedColor.surface,
  },
  progressOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(15, 19, 29, 0.66)',
  },
  progressCard: {
    alignSelf: 'stretch',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    backgroundColor: desfeedColor.surface,
  },
  progressHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressLabel: {
    flex: 1,
    fontFamily: desfeedFont.bold,
    fontSize: 15,
    color: desfeedColor.text,
  },
  progressOuter: {
    height: 9,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: desfeedColor.borderSoft,
  },
  progressBar: {
    borderBottomWidth: 9,
    borderRadius: 999,
    borderColor: desfeedColor.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shutter: {
    flex: 2,
    height: 52,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  galleryAction: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
})

const ViewfinderFrame = () => (
  <View style={styles.frame} pointerEvents="none">
    <View style={[styles.corner, styles.cornerTopLeft]} />
    <View style={[styles.corner, styles.cornerTopRight]} />
    <View style={[styles.corner, styles.cornerBottomLeft]} />
    <View style={[styles.corner, styles.cornerBottomRight]} />
  </View>
)

const ScanProgress = ({ stage }: { stage: ScanStage }) => {
  const progress = stageProgress[stage]
  if (!progress) {
    return null
  }

  return (
    <View style={styles.progressOverlay}>
      <View style={styles.progressCard}>
        <View style={styles.progressHead}>
          <ActivityIndicator size="small" color={desfeedColor.primary} />
          <Text style={styles.progressLabel}>{progress.label}</Text>
        </View>
        <Progress
          percent={progress.percent}
          styles={{ progressOuter: styles.progressOuter, progressBar: styles.progressBar }}
        />
      </View>
    </View>
  )
}

const CaptureScreen = () => {
  const router = useRouter()
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
      <CameraPermissionPrimer
        canAskAgain={permission.canAskAgain}
        onAllow={requestPermission}
        onPickFromGallery={handlePickFromGallery}
      />
    )
  }

  if (stage === 'error') {
    return (
      <View style={styles.centered}>
        <Result
          img={<IconOutline name="exclamation-circle" size={54} color={desfeedColor.warning} />}
          title="Não deu para processar essa página"
          message={errorMessage ?? ''}
          buttonText="Tentar de novo"
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
            title="Essa página saiu difícil de ler"
            message="Tente de novo com mais luz e a página bem aberta — pergunta errada atrapalha mais do que ajuda."
            buttonText="Tirar outra foto"
            buttonType="primary"
            onButtonClick={reset}
          />
        </View>
      )
    }

    return (
      <ScanResult
        cards={result.cards}
        onStartFeed={() => {
          reset()
          router.push('/feed')
        }}
        onScanAgain={reset}
      />
    )
  }

  return (
    <View style={styles.body}>
      <View style={styles.viewfinder}>
        <CameraView ref={cameraRef} style={styles.camera} facing="back" />
        <ViewfinderFrame />
        <View style={styles.hint}>
          <IconOutline name="bulb" size={16} color={desfeedColor.surface} />
          <Text style={styles.hintText}>
            Página inteira na moldura, bem iluminada.
          </Text>
        </View>
        <ScanProgress stage={stage} />
      </View>

      <View style={styles.actions}>
        <Button style={styles.galleryAction} onPress={handlePickFromGallery}>
          Galeria
        </Button>
        <Button
          type="primary"
          style={styles.shutter}
          disabled={stage !== 'idle'}
          onPress={handleCapture}
        >
          Fotografar página
        </Button>
      </View>
    </View>
  )
}

export default function EscanearScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconOutline name="scan" size={22} color={desfeedColor.primary} />
        <Text style={styles.headerTitle}>Escanear</Text>
      </View>
      <CaptureScreen />
    </SafeAreaView>
  )
}
