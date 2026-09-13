import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';

type SolidShadowProps = {
  height: number;
  shadowColor: string;
  shadowHeight?: number;
  borderRadius?: number;
  pressed?: boolean;
  style?: ViewStyle;
  children: ReactNode;
};

export const SolidShadow = ({
  height,
  shadowColor,
  shadowHeight = 4,
  borderRadius = 16,
  pressed = false,
  style,
  children,
}: SolidShadowProps) => (
  <View style={{ height: height + shadowHeight, width: '100%' }}>
    <View
      style={{
        position: 'absolute',
        top: shadowHeight,
        left: 0,
        right: 0,
        height,
        borderRadius,
        backgroundColor: shadowColor,
      }}
    />
    <View
      style={[
        {
          position: 'absolute',
          top: pressed ? shadowHeight - 2 : 0,
          left: 0,
          right: 0,
          height,
          borderRadius,
        },
        style,
      ]}
    >
      {children}
    </View>
  </View>
);
