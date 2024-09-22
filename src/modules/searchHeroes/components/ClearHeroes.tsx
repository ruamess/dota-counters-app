import React, { useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HomeStore } from 'shared/store/home';
import { Vibrate } from 'shared/utils/vibration';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';

const ClearHeroes = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={() => {
        HomeStore.clearSelectedHeroes();
        Vibrate();
      }}
    >
      <Text style={styles.title}>{t('ClearAll')}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    title: {
      color: colors.red,
    },
  });

export default ClearHeroes;
