import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import AntDesign from '@expo/vector-icons/AntDesign';
import refetchHeroes from 'shared/utils/refetchHeroes';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';
import { useTranslation } from 'react-i18next';
import SettingWrapper from './SettingWrapper';

const RefetchHeroes = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity onPress={() => refetchHeroes()}>
      <SettingWrapper style={styles.container}>
        <Text style={styles.title}>{t('DidntFindAHero')}</Text>
        <AntDesign name="right" size={ms(20)} color={colors.text} />
      </SettingWrapper>
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
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

export default RefetchHeroes;
