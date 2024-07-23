import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import getHeroesData from 'shared/api/getHeroesData';
import { SettingsStore } from 'shared/store/settings';
import { getVibrationData } from 'shared/utils/asyncStorage';
import { router } from 'expo-router';

const Splash = () => {
  useEffect(() => {
    const loadInitialState = async () => {
      SettingsStore.setVibration(await getVibrationData());
    };

    const fetchHeroes = async () => {
      await getHeroesData();
      router.replace('/home');
    };

    loadInitialState();
    fetchHeroes();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
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
