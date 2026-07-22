import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '../theme';

const KNOB_SIZE = 14;

interface SalarySliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (next: number) => void;
}

export function SalarySlider({ min, max, step, value, onValueChange }: SalarySliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const startFraction = useSharedValue(0);
  const dragFraction = useSharedValue(clampFraction(value, min, max));

  const commit = (fraction: number) => {
    const raw = min + fraction * (max - min);
    const stepped = Math.round(raw / step) * step;
    onValueChange(Math.min(max, Math.max(min, stepped)));
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      startFraction.value = dragFraction.value;
    })
    .onUpdate((e) => {
      if (trackWidth <= 0) return;
      const delta = e.translationX / trackWidth;
      const next = Math.min(1, Math.max(0, startFraction.value + delta));
      dragFraction.value = next;
      runOnJS(commit)(next);
    });

  const onLayout = (e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${dragFraction.value * 100}%`,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    left: `${dragFraction.value * 100}%`,
  }));

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.track} onLayout={onLayout}>
        <View style={styles.baseTrack} />
        <Animated.View style={[styles.fill, fillStyle]} />
        <Animated.View style={[styles.knob, knobStyle]} />
      </View>
    </GestureDetector>
  );
}

function clampFraction(value: number, min: number, max: number) {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

const styles = StyleSheet.create({
  track: {
    height: 20,
    justifyContent: 'center',
  },
  baseTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 8,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.sliderTrack,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 8,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.accent,
  },
  knob: {
    position: 'absolute',
    top: '50%',
    marginLeft: -KNOB_SIZE / 2,
    marginTop: -KNOB_SIZE / 2,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: colors.accent,
  },
});
