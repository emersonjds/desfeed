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

export default function RankingScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <Result
        img={<IconOutline name="trophy" size={54} color={desfeedColor.primary} />}
        title="Ranking em breve"
        message="Ligas e ranking social ficam para a próxima fase do Desfeed."
      />
    </SafeAreaView>
  )
}
