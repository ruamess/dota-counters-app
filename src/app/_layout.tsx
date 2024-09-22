import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import useThemeColors from 'hooks/useThemeColors';
import BackArrow from 'components/BackArrow';
import CustomAlert from 'components/CustomAlert';
import 'i18n';

const RootLayout = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.appBackground);
    StatusBar.setBarStyle(colors.appBackground === '#FFFFFF' ? 'dark-content' : 'light-content');
  }, [colors]);

  return (
    <>
      <CustomAlert />
      <SafeAreaProvider style={{ backgroundColor: colors.appBackground }}>
        <Stack
          screenOptions={{
            animation: 'fade',
            headerShown: false,
            headerShadowVisible: false,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: colors.appBackground,
            },
            contentStyle: {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              backgroundColor: colors.appBackground,
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen
            name="settings"
            options={{
              title: t('Settings'),
              headerTintColor: colors.text,
              presentation: Platform.OS === 'ios' ? 'modal' : 'card',
              headerShown: true,
              headerBackTitleVisible: true,
              headerBackTitle: 'Back',
              headerLeft: () => <BackArrow />,
            }}
          />
          <Stack.Screen name="search" />
        </Stack>
      </SafeAreaProvider>
    </>
  );
};

export default RootLayout;
