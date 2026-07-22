import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconHeartProps {
  width?: number;
  height?: number;
  color?: string;
}

export function IconHeart({ width = 20, height = 18, color = '#FFFFFF' }: IconHeartProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 20" fill="none">
      <Path
        d="M11 19.5C11 19.5 1 13 1 6.5C1 3 3.8 0.5 7 0.5C9 0.5 10.5 1.5 11 3C11.5 1.5 13 0.5 15 0.5C18.2 0.5 21 3 21 6.5C21 13 11 19.5 11 19.5Z"
        fill={color}
      />
    </Svg>
  );
}
