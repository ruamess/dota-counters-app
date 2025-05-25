import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import LanguageItem from './LanguageItem';
import { useSettingsStore } from 'shared/store/settings';
import changeLanguage from '../utils/changeLanguage';
import useThemeColors from 'hooks/useThemeColors';
import { useTranslation } from 'react-i18next';
import { IColors } from 'shared/interfaces';
import SettingWrapper from 'modules/settings/components/SettingWrapper';

const LanguagePicker = () => {
  const languages = useSettingsStore((state) => state.languages);
  const colors = useThemeColors();
  const { t } = useTranslation();
  // console.log('refetch button rendered');
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <SettingWrapper style={styles.container}>
      <Text style={styles.title}>{t('Language')}</Text>
      <View style={styles.itemContainer}>
        {languages.map((el, i) => (
          <LanguageItem key={i} language={el} onPress={() => changeLanguage(el)} />
        ))}
      </View>
    </SettingWrapper>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: ms(5),
    },
    itemContainer: {
      flexDirection: 'row',
      gap: ms(5),
    },
    title: {
      color: colors.text,
      fontSize: ms(15),
      fontWeight: '600',
    },
  });

export default LanguagePicker;
