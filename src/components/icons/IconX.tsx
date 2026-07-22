import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconXProps {
  size?: number;
  color: string;
}

export function IconX({ size = 18, color }: IconXProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path d="M2 2L20 20M20 2L2 20" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
