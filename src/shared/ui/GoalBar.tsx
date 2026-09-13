import { Text, View } from 'react-native';

type GoalBarProps = {
  completed: number;
  goal: number;
  label: string;
};

export const GoalBar = ({ completed, goal, label }: GoalBarProps) => {
  const percent = goal > 0 ? Math.min(100, Math.round((completed / goal) * 100)) : 0;

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1.5">
          <View className="h-2 w-2 rounded-full bg-primary" />
          <Text className="text-[10px] font-jk-extrabold uppercase tracking-wider text-primary-deep">
            {label}
          </Text>
        </View>
        <Text className="text-xs font-jk-bold text-text-muted">
          {completed}/{goal} Concluídos
        </Text>
      </View>
      <View className="h-2 w-full overflow-hidden rounded-full bg-border-soft">
        <View style={{ width: `${percent}%` }} className="h-full rounded-full bg-primary" />
      </View>
    </View>
  );
};
