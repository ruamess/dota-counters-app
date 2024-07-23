import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import getHeroesData from 'shared/api/getHeroesData';
import { SettingsStore } from 'shared/store/settings';
import { getVibrationData } from 'shared/utils/asyncStorage';
import * as NavigationBar from 'expo-navigation-bar';

NavigationBar.setBackgroundColorAsync('#ffffff00');
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const initialVibration = async () => {
      SettingsStore.setVibration(await getVibrationData());
    };

    const fetchHeroes = async () => {
      await getHeroesData();
      SplashScreen.hideAsync();
    };

    initialVibration();
    fetchHeroes();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="red" />
      <Stack
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1C242D',
          },
          contentStyle: {
            // paddingTop: ms(60),
            paddingTop: insets.top,
            backgroundColor: '#1C242D',
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name="splash" />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
