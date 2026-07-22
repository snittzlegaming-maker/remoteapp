import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { AppProvider } from './src/state/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <NavigationContainer
            theme={{
              dark: false,
              colors: {
                primary: colors.accent,
                background: colors.background,
                card: colors.surface,
                text: colors.textPrimary,
                border: colors.hairline,
                notification: colors.accent,
              },
              fonts: {
                regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' },
                medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' },
                bold: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
                heavy: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
              },
            }}
          >
            <RootNavigator />
          </NavigationContainer>
          <StatusBar style="dark" />
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
