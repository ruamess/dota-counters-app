import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vs } from 'react-native-size-matters';
import { router } from 'expo-router';
import SettingsButton from 'components/SettingsButton';
import SearchInput from 'components/SearchInput';
import { CounterHeroes } from 'modules/counterHeroes';
import EnemyHeroes from 'modules/enemyHeroes/components/EnemyHeroes';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchInput onPress={() => router.push('search')} />
        <SettingsButton onPress={() => router.push('settings')} />
      </View>

      <EnemyHeroes />
      <CounterHeroes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  settingsButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: vs(10),
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default Home;
