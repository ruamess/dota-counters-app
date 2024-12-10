import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import useThemeColors from 'hooks/useThemeColors';
import { initHeroesData, initTheme, initVibration } from 'shared/utils/initAsyncItems';

const Splash = () => {
  const colors = useThemeColors();

  useEffect(() => {
    initTheme();
    initVibration();
    initHeroesData();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
