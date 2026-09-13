import { Text, View } from 'react-native';

export type BadgeState = 'idle' | 'selected' | 'correct' | 'wrong';

type BadgeProps = {
  letter: string;
  state?: BadgeState;
};

const classesByState: Record<BadgeState, { container: string; text: string }> = {
  idle: { container: 'bg-surface-soft', text: 'text-text-muted' },
  selected: { container: 'bg-accent', text: 'text-white' },
  correct: { container: 'bg-primary', text: 'text-white' },
  wrong: { container: 'bg-red-500', text: 'text-white' },
};

export const Badge = ({ letter, state = 'idle' }: BadgeProps) => {
  const classes = classesByState[state];
  return (
    <View className={`h-8 w-8 items-center justify-center rounded-xl ${classes.container}`}>
      <Text className={`text-base font-jk-bold ${classes.text}`}>{letter}</Text>
    </View>
  );
};
