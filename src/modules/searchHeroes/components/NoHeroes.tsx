import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn } from 'react-native-reanimated';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';

const NoHeroes = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(100)}>
      <Text style={styles.title}>{t('NoHeroes')}</Text>
    </Animated.View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: vs(100),
    },
    title: {
      color: colors.text,
      fontSize: ms(15),
    },
  });

export default NoHeroes;
