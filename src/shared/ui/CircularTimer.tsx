import { Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type CircularTimerProps = {
  secondsLeft: number;
  totalSeconds: number;
};

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const formatSeconds = (seconds: number): string => {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60);
  const remainder = Math.floor(clamped % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
};

export const CircularTimer = ({ secondsLeft, totalSeconds }: CircularTimerProps) => {
  const progress = totalSeconds > 0 ? Math.max(0, secondsLeft / totalSeconds) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View className="h-11 w-11 items-center justify-center rounded-full bg-surface shadow-sm">
      <Svg width={40} height={40} viewBox="0 0 36 36" style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={18} cy={18} r={RADIUS} stroke="#dfe2f1" strokeWidth={3} fill="none" />
        <Circle
          cx={18}
          cy={18}
          r={RADIUS}
          stroke="#10b981"
          strokeWidth={3.2}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-[10px] font-jk-extrabold tracking-tighter text-text">
          {formatSeconds(secondsLeft)}
        </Text>
      </View>
    </View>
  );
};
