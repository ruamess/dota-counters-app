import React, { useMemo, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ms, vs } from 'react-native-size-matters';
import { ThemePicker } from 'modules/themePicker';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';
import { LanguagePicker } from 'modules/languagePicker';
import RefetchButton from 'components/RefetchButton';
import SettingItem from 'components/SettingItem';
import VibrationSwitch from 'components/VibrationSwitch';

const Settings = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.settings}>
        <SettingItem title={t('Vibration')} component={<VibrationSwitch />} />
        <SettingItem title={t('Theme')} component={<ThemePicker />} />
        <SettingItem title={t('Language')} component={<LanguagePicker />} />
        <View style={styles.setting}>
          <Text style={styles.title}>{t('DidntFindAHero')}</Text>
          <RefetchButton />
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    setting: {
      flexDirection: 'column',
      gap: ms(20),
      marginTop: vs(15),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settings: {
      width: '80%',
      gap: ms(20),
    },
    title: {
      color: colors.text,
      fontSize: ms(17),
    },
  });

export default memo(Settings);
