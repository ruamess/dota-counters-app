import useThemeColors from 'hooks/useThemeColors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors } from 'shared/interfaces';

const ErrorAlert = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <Text style={styles.title}>{t('NoInternetConnection')}</Text>
      <Text style={styles.message}>{t('CheckYourConnection')}</Text>
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

export default ErrorAlert;
