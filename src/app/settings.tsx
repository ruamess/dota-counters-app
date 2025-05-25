import React, { useMemo, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { ThemePicker } from 'modules/settings';
import { LanguagePicker } from 'modules/settings';
import { RefetchHeroes } from 'modules/settings';
import { VibrationPicker } from 'modules/settings/VibrationPicker';

const Settings = () => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.container}>
      <VibrationPicker />
      <LanguagePicker />
      <ThemePicker />
      <RefetchHeroes />
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      margin: 0,
      padding: 0,
      gap: ms(10),
    },
  });

export default memo(Settings);
