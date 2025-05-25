import React, { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';
import { useTranslation } from 'react-i18next';
import SettingWrapper from '../../components/SettingWrapper';
import VibrationSwitch from './VibrationSwitch';

const VibrationPicker = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SettingWrapper style={styles.container}>
      <Text style={styles.title}>{t('Vibration')}</Text>
      <VibrationSwitch />
    </SettingWrapper>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      borderTopLeftRadius: 0,
      borderTopEndRadius: 0,
      paddingTop: ms(30),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: colors.text,
      fontSize: ms(15),
      fontWeight: '600',
    },
  });

export default VibrationPicker;
