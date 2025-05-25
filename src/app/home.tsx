import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { router } from 'expo-router';
import SettingsButton from 'components/SettingsButton';
import SearchInput from 'components/SearchInput';
import { CounterHeroes } from 'modules/counterHeroes';
import EnemyHeroes from 'modules/enemyHeroes/components/EnemyHeroes';
import ConfettiCannon from 'react-native-confetti-cannon';

const Home = () => {
  const [tapCount, setTapCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleEasterEggPress = () => {
    setTapCount((prev) => prev + 1);
    if (tapCount + 1 === 10) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setTapCount(0);
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      {showConfetti && <ConfettiCannon count={200} origin={{ x: 200, y: -20 }} />}
      <View style={styles.header}>
        <SearchInput onPress={() => router.push('search')} />
        <SettingsButton onPress={() => router.push('settings')} />
      </View>
      <EnemyHeroes />
      <CounterHeroes />
      <View style={styles.easterContainer}>
        <TouchableOpacity
          onPress={handleEasterEggPress}
          style={styles.easterEgg}
          activeOpacity={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  easterContainer: {
    left: 0,
    right: 0,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: ms(30),
  },
  easterEgg: {
    width: vs(40),
    height: vs(40),
    zIndex: -1,
  },
  settingsButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: vs(10),
  },
  header: {
    paddingTop: vs(10),
    flexDirection: 'row',
    gap: 10,
    zIndex: -1,
    alignItems: 'center',
  },
});

export default Home;
