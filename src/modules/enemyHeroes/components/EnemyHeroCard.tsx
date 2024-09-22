import React, { FC, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors, IHero } from 'shared/interfaces';
import HeroImage from 'components/HeroImage';
import useThemeColors from 'hooks/useThemeColors';

const EnemyHeroCard: FC<IHero> = ({ image, localized_name }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.enemyHeroCard}>
      <HeroImage url={image} size="lg" />
      <Text style={styles.heroName}>{localized_name}</Text>
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    enemyHeroCard: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroName: {
      fontSize: ms(15),
      color: colors.text,
      marginTop: vs(3),
    },
  });

export default EnemyHeroCard;
