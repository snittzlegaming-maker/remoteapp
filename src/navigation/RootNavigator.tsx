import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { MainTabs } from './MainTabs';
import { ApplicationReviewScreen } from '../screens/ApplicationReviewScreen';
import { colors, fontFamily } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="ApplicationReview"
        component={ApplicationReviewScreen}
        options={{
          title: 'Review & apply',
          headerTintColor: colors.accent,
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { fontFamily: fontFamily.semibold, color: colors.textPrimary },
        }}
      />
    </Stack.Navigator>
  );
}
