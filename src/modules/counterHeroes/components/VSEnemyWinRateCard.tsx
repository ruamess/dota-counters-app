import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { IColors, IVSEnemyWinRateCard } from 'shared/interfaces';
import useThemeColors from 'hooks/useThemeColors';
import HeroImage from 'components/HeroImage';

const VSEnemyWinRateCard: FC<IVSEnemyWinRateCard> = ({ image, winRate }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.container}>
      <HeroImage url={image} size="sm" />
      <Text style={styles.text}>: {Math.round(winRate)}%</Text>
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: ms(2),
    },
    text: {
      color: colors.text,
    },
  });

export default VSEnemyWinRateCard;
