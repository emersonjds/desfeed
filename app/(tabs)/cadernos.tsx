import { IconOutline } from '@ant-design/icons-react-native'
import { Result } from '@ant-design/react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { desfeedColor } from '../../src/shared/theme'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: desfeedColor.surfaceSoft,
  },
})

export default function CadernosScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Result
        img={<IconOutline name="book" size={54} color={desfeedColor.primary} />}
        title="Cadernos em breve"
        message="A lista de cadernos escaneados ganha tela própria depois da espinha da demo."
      />
    </SafeAreaView>
  )
}
