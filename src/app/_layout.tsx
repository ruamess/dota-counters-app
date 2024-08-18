import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

if (Platform.OS === 'android') NavigationBar.setBackgroundColorAsync('#ffffff00');

const RootLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          animation: 'fade',
          headerShown: false,
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#1C242D',
          },
          contentStyle: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,

            backgroundColor: '#1C242D',
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            presentation: Platform.OS === 'ios' ? 'modal' : 'card', // Добавлено условие для iOS
            headerShown: true,
            headerBackTitleVisible: true, // Показываем кнопку назад
            headerBackTitle: 'Back', // Текст кнопки назад (можно изменить при необходимости)
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
