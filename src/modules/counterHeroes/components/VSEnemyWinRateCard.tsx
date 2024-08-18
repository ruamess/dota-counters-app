import HeroImage from 'components/HeroImage';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from 'shared/colors';
import { IVSEnemyWinRateCard } from 'shared/utils/interfaces';

const VSEnemyWinRateCard: React.FC<IVSEnemyWinRateCard> = ({ image, winRate }) => {
  return (
    <View style={styles.container}>
      <HeroImage url={image} size="sm" />
      <Text style={styles.text}>: {Math.round(winRate)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  text: {
    color: colors.white,
  },
});

export default VSEnemyWinRateCard;
