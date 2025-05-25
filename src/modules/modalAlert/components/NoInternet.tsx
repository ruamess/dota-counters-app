import useThemeColors from 'hooks/useThemeColors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors } from 'shared/interfaces';
import Icon from '@expo/vector-icons/MaterialIcons';
import AlertButton from './AlertButton';

const NoInternet = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <Icon
        name="signal-wifi-statusbar-connected-no-internet-4"
        size={ms(45)}
        color={colors.text}
      />

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
      fontSize: ms(17),
      fontWeight: '700',
      textAlign: 'center',
    },
    message: {
      color: colors.text,
      fontSize: ms(14),
      textAlign: 'center',
      marginTop: vs(10),
    },
  });

export default NoInternet;
