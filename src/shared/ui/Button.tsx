import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { SolidShadow } from './SolidShadow';

type ButtonVariant = 'primary' | 'neutral' | 'ghost';
type ButtonSize = 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: string;
};

const heightBySize: Record<ButtonSize, number> = { md: 48, lg: 56 };

const styleByVariant: Record<ButtonVariant, { background: string; text: string; shadow: string }> = {
  primary: { background: '#10b981', text: '#ffffff', shadow: '#059669' },
  neutral: { background: '#ffffff', text: '#0f131d', shadow: '#cbd5e1' },
  ghost: { background: 'transparent', text: '#131b2e', shadow: 'transparent' },
};

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
}: ButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const height = heightBySize[size];
  const colors = styleByVariant[variant];

  if (variant === 'ghost') {
    return (
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={{ height, minHeight: 44 }}
        className="flex-row items-center justify-center gap-2"
      >
        {icon ? <Text className="text-base font-jk">{icon}</Text> : null}
        <Text className="font-jk-semibold text-text-muted">{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <SolidShadow height={height} shadowColor={colors.shadow} borderRadius={16} pressed={pressed}>
        <View
          style={{ backgroundColor: colors.background, height }}
          className="w-full flex-row items-center justify-center gap-2 rounded-2xl"
        >
          {icon ? <Text className="text-lg font-jk">{icon}</Text> : null}
          <Text style={{ color: colors.text }} className="text-base font-jk-bold">
            {label}
          </Text>
        </View>
      </SolidShadow>
    </Pressable>
  );
};
