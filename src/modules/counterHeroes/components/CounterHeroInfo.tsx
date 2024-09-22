import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import HeroImage from 'components/HeroImage';
import { IColors, ICounterHeroInfo } from 'shared/interfaces';
import useThemeColors from 'hooks/useThemeColors';

const CounterHeroInfo: FC<ICounterHeroInfo> = ({ image, localized_name, overallWinRate }) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <HeroImage url={image} size="lg" />

      <View>
        <Text style={styles.text}>{localized_name}</Text>
        <Text style={styles.text}>
          {t('Overall')}: {Math.round(overallWinRate)}%
        </Text>
      </View>
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: ms(10),
    },
    text: {
      color: colors.text,
    },
  });

export default CounterHeroInfo;
