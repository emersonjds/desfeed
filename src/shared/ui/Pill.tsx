import { Text, View } from 'react-native'

import { Icon, type IconName } from './Icon'

type PillTone = 'neutral' | 'primary' | 'accent'

type PillProps = {
  label: string
  icon?: IconName
  tone?: PillTone
}

const toneStyles: Record<PillTone, { container: string; text: string; icon: string }> = {
  neutral: { container: 'bg-surface-soft', text: 'text-text', icon: '#131b2e' },
  primary: { container: 'bg-primary/10', text: 'text-primary-deep', icon: '#059669' },
  accent: { container: 'bg-accent/10', text: 'text-accent', icon: '#4f46e5' },
}

export const Pill = ({ label, icon, tone = 'neutral' }: PillProps) => {
  const styles = toneStyles[tone]

  return (
    <View className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${styles.container}`}>
      {icon ? <Icon name={icon} size={13} color={styles.icon} /> : null}
      <Text className={`text-xs font-jk-bold ${styles.text}`} numberOfLines={1}>
        {label}
      </Text>
    </View>
  )
}
