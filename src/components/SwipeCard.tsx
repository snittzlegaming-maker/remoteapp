import React, { forwardRef, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { JobListing } from '../types';
import { JobCard } from './JobCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const EXIT_DURATION = 250;

export type SwipeDirection = 'left' | 'right';

export interface SwipeCardHandle {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface SwipeCardProps {
  job: JobListing;
  onSwiped: (direction: SwipeDirection) => void;
  isTop: boolean;
}

export const SwipeCard = forwardRef<SwipeCardHandle, SwipeCardProps>(function SwipeCard(
  { job, onSwiped, isTop },
  ref
) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const finishSwipe = (direction: SwipeDirection) => {
    onSwiped(direction);
  };

  const animateOut = (direction: SwipeDirection) => {
    const targetX = direction === 'right' ? SCREEN_WIDTH * 1.3 : -SCREEN_WIDTH * 1.3;
    translateX.value = withTiming(
      targetX,
      { duration: EXIT_DURATION, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished) runOnJS(finishSwipe)(direction);
      }
    );
  };

  useImperativeHandle(ref, () => ({
    swipeLeft: () => animateOut('left'),
    swipeRight: () => animateOut('right'),
  }));

  const pan = Gesture.Pan()
    .enabled(isTop)
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldDismiss = Math.abs(e.translationX) > SWIPE_THRESHOLD || Math.abs(e.velocityX) > 800;
      if (shouldDismiss) {
        const direction: SwipeDirection = e.translationX > 0 ? 'right' : 'left';
        runOnJS(animateOut)(direction);
      } else {
        translateX.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-8, 0, 8]
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[StyleSheet.absoluteFill, cardStyle]}>
        <JobCard job={job} />
      </Animated.View>
    </GestureDetector>
  );
});
