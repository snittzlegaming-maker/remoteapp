import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, radius } from '../theme';

interface ChipProps {
  label: string;
  variant: 'filled' | 'outline';
  onPress?: () => void;
  style?: ViewStyle;
}

export function Chip({ label, variant, onPress, style }: ChipProps) {
  const isFilled = variant === 'filled';
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, isFilled ? styles.filled : styles.outline, style]}
    >
      <Text style={[styles.label, { color: isFilled ? colors.textStrong : colors.textTertiary }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.chip,
  },
  filled: {
    backgroundColor: colors.neutralFill,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.chipOutline,
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.body,
  },
});
