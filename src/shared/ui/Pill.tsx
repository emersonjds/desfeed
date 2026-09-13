import { Text, View } from 'react-native';

type PillTone = 'neutral' | 'primary' | 'accent';

type PillProps = {
  label: string;
  icon?: string;
  tone?: PillTone;
};

const toneClasses: Record<PillTone, { container: string; text: string }> = {
  neutral: { container: 'bg-surface-soft', text: 'text-text' },
  primary: { container: 'bg-primary/10', text: 'text-primary-deep' },
  accent: { container: 'bg-accent/10', text: 'text-accent' },
};

export const Pill = ({ label, icon, tone = 'neutral' }: PillProps) => {
  const classes = toneClasses[tone];
  return (
    <View className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${classes.container}`}>
      {icon ? <Text className="text-xs leading-none">{icon}</Text> : null}
      <Text className={`text-xs font-bold ${classes.text}`} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};
