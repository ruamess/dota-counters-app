import React, { FC } from 'react';
import HeroImage from 'components/HeroImage';
import { View, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import colors from 'shared/colors';
import { IHero } from 'shared/utils/interfaces';

const EnemyHeroCard: FC<IHero> = ({ image, localized_name }) => {
  return (
    <View style={styles.enemyHeroCard}>
      <HeroImage url={image} size="lg" />
      <Text style={styles.heroName}>{localized_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  enemyHeroCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroName: {
    fontSize: ms(15),
    color: colors.white,
    marginTop: vs(3),
  },
});

export default EnemyHeroCard;
