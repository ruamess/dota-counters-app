import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import fetchHeroesData from 'shared/api/fetchHeroesData';
import { SettingsStore } from 'shared/store/settings';
import { getVibrationData, getHeroesData } from 'shared/utils/asyncStorage';
import { router } from 'expo-router';
import { HomeStore } from 'shared/store/home';

const Splash = () => {
  useEffect(() => {
    const initialVibration = async () => {
      SettingsStore.setVibration(await getVibrationData());
    };
    const initialHeroes = async () => {
      const heroes = await getHeroesData();
      console.log(heroes);
      if (heroes == null) fetchHeroes();
      else {
        HomeStore.setHeroes(heroes);
        router.replace('/home');
      }
    };

    const fetchHeroes = async () => {
      await fetchHeroesData();
      router.replace('/home');
      console.log('не асинк');
    };

    initialVibration();
    initialHeroes();
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
