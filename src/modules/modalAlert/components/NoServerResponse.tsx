import useThemeColors from 'hooks/useThemeColors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors } from 'shared/interfaces';
import AlertButton from './AlertButton';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const NoServerResponse = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <Icon name="server-off" size={ms(45)} color={colors.text} />

      <View>
        <Text style={styles.title}>{t('OpenDotaIsNotResponding')}</Text>
        <Text style={styles.message}>{t('SinceOpenDotaUnavaible')}</Text>
      </View>

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

export default NoServerResponse;
