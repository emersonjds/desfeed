import { IconOutline } from '@ant-design/icons-react-native'
import { Button } from '@ant-design/react-native'
import { Linking, StyleSheet, Text, View } from 'react-native'

import { desfeedColor, desfeedFont } from '../../shared/theme'

type CameraPermissionPrimerProps = {
  canAskAgain: boolean
  onAllow: () => void
  onPickFromGallery: () => void
}

const reassurances = [
  'A câmera só liga nesta tela',
  'A foto vira pergunta, nada é publicado',
  'Você pode tirar a permissão depois',
] as const

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 14,
  },
  stage: {
    flex: 1,
    minHeight: 150,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: desfeedColor.primarySoft,
  },
  frame: {
    width: 148,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: desfeedColor.primary,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  copy: {
    gap: 6,
  },
  title: {
    fontFamily: desfeedFont.extrabold,
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: -0.7,
    color: desfeedColor.text,
  },
  body: {
    fontFamily: desfeedFont.medium,
    fontSize: 14,
    lineHeight: 20,
    color: desfeedColor.textMuted,
  },
  reassuranceList: {
    gap: 8,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: desfeedColor.surface,
  },
  reassuranceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reassuranceText: {
    flex: 1,
    fontFamily: desfeedFont.semibold,
    fontSize: 13,
    lineHeight: 18,
    color: desfeedColor.text,
  },
  actions: {
    gap: 8,
  },
  primaryAction: {
    height: 52,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: desfeedColor.primaryDeep,
  },
  secondaryAction: {
    height: 48,
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: desfeedColor.surface,
    borderBottomWidth: 3,
    borderBottomColor: desfeedColor.borderSoft,
  },
  blockedNote: {
    fontFamily: desfeedFont.medium,
    fontSize: 13,
    lineHeight: 19,
    color: desfeedColor.warning,
  },
})

export const CameraPermissionPrimer = ({
  canAskAgain,
  onAllow,
  onPickFromGallery,
}: CameraPermissionPrimerProps) => (
  <View style={styles.container}>
    <View style={styles.stage}>
      <View style={styles.frame}>
        <View style={[styles.corner, styles.cornerTopLeft]} />
        <View style={[styles.corner, styles.cornerTopRight]} />
        <View style={[styles.corner, styles.cornerBottomLeft]} />
        <View style={[styles.corner, styles.cornerBottomRight]} />
        <IconOutline name="camera" size={44} color={desfeedColor.primaryDeep} />
      </View>
    </View>

    <View style={styles.copy}>
      <Text style={styles.title}>Aponte para o caderno. O resto é com a gente.</Text>
      <Text style={styles.body}>
        Você fotografa a página que estudou e o Desfeed devolve perguntas curtas sobre ela, para
        a matéria não escorrer até a prova.
      </Text>
    </View>

    <View style={styles.reassuranceList}>
      {reassurances.map((item) => (
        <View key={item} style={styles.reassuranceRow}>
          <IconOutline name="check-circle" size={17} color={desfeedColor.primary} />
          <Text style={styles.reassuranceText}>{item}</Text>
        </View>
      ))}
    </View>

    <View style={styles.actions}>
      {canAskAgain ? null : (
        <Text style={styles.blockedNote}>
          A câmera está bloqueada nos ajustes do celular. Libere por lá e volte — ou siga com
          uma foto da galeria.
        </Text>
      )}
      <Button
        type="primary"
        style={styles.primaryAction}
        onPress={canAskAgain ? onAllow : () => Linking.openSettings()}
      >
        {canAskAgain ? 'Liberar a câmera' : 'Abrir os ajustes'}
      </Button>
      <Button style={styles.secondaryAction} onPress={onPickFromGallery}>
        Usar uma foto da galeria
      </Button>
    </View>
  </View>
)
