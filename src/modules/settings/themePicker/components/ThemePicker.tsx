import React, { memo, useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import ThemePickerItem from './ThemePickerItem';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSettingsStore } from 'shared/store/settings';
import { useTranslation } from 'react-i18next';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';
import SettingWrapper from 'modules/settings/components/SettingWrapper';

const ThemePicker = () => {
  const { t } = useTranslation();
  const setTheme = useSettingsStore((state) => state.setTheme);
  const theme = useSettingsStore((state) => state.theme);
  const colors = useThemeColors();
  // console.log('refetch button rendered');
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SettingWrapper style={styles.container}>
      <Text style={styles.title}>{t('Theme')}</Text>

      <View style={styles.itemContainer}>
        <ThemePickerItem onPress={() => setTheme('light')} selected={theme == 'light'}>
          <MaterialIcons name="light-mode" size={ms(20)} color={colors.text} />
        </ThemePickerItem>

        <ThemePickerItem onPress={() => setTheme('dark')} selected={theme == 'dark'}>
          <MaterialIcons name="dark-mode" size={ms(20)} color={colors.text} />
        </ThemePickerItem>

        <ThemePickerItem onPress={() => setTheme('black')} selected={theme == 'black'}>
          <MaterialIcons name="king-bed" size={ms(20)} color={colors.text} />
        </ThemePickerItem>
      </View>
    </SettingWrapper>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      gap: ms(15),
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.appBackground,
      borderRadius: ms(25),
      height: vs(38),
      paddingHorizontal: ms(5),
      paddingVertical: ms(5),
    },
    title: {
      color: colors.text,
      fontSize: ms(15),
      fontWeight: '600',
    },
  });

export default memo(ThemePicker);
