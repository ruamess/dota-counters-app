import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import ThemePickerItem from './ThemePickerItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingsStore } from 'shared/store/settings';

const ThemePicker = () => {
  const setTheme = useSettingsStore((state) => state.setTheme);
  const theme = useSettingsStore((state) => state.theme);

  return (
    <View style={styles.container}>
      <ThemePickerItem
        onPress={() => setTheme('light')}
        backgroundColor="white"
        selected={theme == 'light'}
      >
        <MaterialIcons name="light-mode" size={15} color="black" />
      </ThemePickerItem>

      <ThemePickerItem
        onPress={() => setTheme('dark')}
        backgroundColor="#1C242D"
        selected={theme == 'dark'}
      >
        <MaterialIcons name="dark-mode" size={15} color="white" />
      </ThemePickerItem>

      <ThemePickerItem
        onPress={() => setTheme('black')}
        backgroundColor="black"
        selected={theme == 'black'}
      >
        <MaterialIcons name="king-bed" size={15} color="white" />
      </ThemePickerItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: ms(7),
    alignItems: 'center',
  },
});

export default memo(ThemePicker);
