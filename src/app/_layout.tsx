import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import useThemeColors from 'hooks/useThemeColors';
import BackArrow from 'components/BackArrow';
import { StatusBar } from 'expo-status-bar';
import { ModalAlert } from 'modules/modalAlert';
import 'i18n';

const RootLayout = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.appBackground }}>
      <ModalAlert />
      <StatusBar style={colors.appBackground === '#FFFFFF' ? 'dark' : 'light'} />
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            navigationBarColor: colors.appBackground,
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
              headerShown: true,
              headerStyle: {
                backgroundColor: colors.elementBackground,
              },
              headerLeft: () => <BackArrow />,
              contentStyle: {
                paddingTop: 0,
                paddingBottom: insets.bottom,
                backgroundColor: colors.appBackground,
              },
            }}
          />
          <Stack.Screen name="search" />
        </Stack>
      </SafeAreaProvider>
    </View>
  );
};

export default RootLayout;
