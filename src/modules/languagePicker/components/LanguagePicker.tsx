import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import LanguageItem from './LanguageItem';
import { useSettingsStore } from 'shared/store/settings';
import changeLanguage from '../utils/changeLanguage';

const LanguagePicker = () => {
  const languages = useSettingsStore((state) => state.languages);

  return (
    <View style={styles.container}>
      {languages.map((el, i) => (
        <LanguageItem key={i} language={el} onPress={() => changeLanguage(el)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: ms(5),
  },
});

export default LanguagePicker;
