import useThemeColors from 'hooks/useThemeColors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors } from 'shared/interfaces';
import AlertButton from './AlertButton';

const NoHero = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <Text style={styles.title}>{t('NoInternetConnection')}</Text>
      <Text style={styles.message}>{t('CheckYourConnection')}</Text>

      <AlertButton text="Ok" />
    </>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
      fontSize: ms(15),
      fontWeight: '700',
      textAlign: 'center',
    },
    message: {
      color: colors.text,
      fontSize: ms(13),
      textAlign: 'center',
      marginTop: vs(10),
    },
  });

export default NoHero;
