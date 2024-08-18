import SearchInput from 'components/SearchInput';
import SettingsButton from 'components/SettingsButton';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { CounterHeroes } from 'modules/counterHeroes';
import EnemyHeroes from 'modules/enemyHeroes/components/EnemyHeroes';
import { SearchHeroes } from 'modules/searchHeroes';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { vs } from 'react-native-size-matters';
import { HomeStore } from 'shared/store/home';
import { IHero } from 'shared/utils/interfaces';

const Home = observer(() => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [filteredHeroes, setFilteredHeroes] = useState<IHero[]>(HomeStore.unselectedHeroes);

  const handleFocus = useCallback(() => setKeyboardVisible(true), []);
  const handleBlur = useCallback(() => setKeyboardVisible(false), []);
  const handleChangeText = useCallback((text: string) => HomeStore.setSearchQuery(text), []);

  const handleSettingsPress = useCallback(() => {
    router.navigate('/settings');
  }, [router]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleFocus);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleBlur);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [handleFocus, handleBlur]);

  useEffect(() => {
    if (HomeStore.searchQuery === '') {
      setFilteredHeroes(HomeStore.unselectedHeroes);
    } else {
      const filtered = HomeStore.unselectedHeroes.filter((hero) =>
        hero.localized_name.toLowerCase().includes(HomeStore.searchQuery.toLowerCase()),
      );
      setFilteredHeroes(filtered);
    }
  }, [HomeStore.searchQuery, HomeStore.unselectedHeroes]);

  return (
    <View style={styles.container}>
      <SearchInput
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={HomeStore.searchQuery}
        onChangeText={handleChangeText}
      />

      {isKeyboardVisible && (
        <SearchHeroes filteredHeroes={filteredHeroes} selectedHeroes={HomeStore.selectedHeroes} />
      )}

      {HomeStore.selectedHeroes.length > 0 ? (
        <>
          <EnemyHeroes selectedHeroes={HomeStore.selectedHeroes} />
          <CounterHeroes counterHeroes={HomeStore.filteredCounterHeroes} />
        </>
      ) : (
        <View style={styles.settingsButtonContainer}>
          <SettingsButton onPress={handleSettingsPress} />
        </View>
      )}
    </View>
  );
});

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
});

export default Home;
