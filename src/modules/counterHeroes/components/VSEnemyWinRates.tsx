import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { IVSEnemyWinRates, ICounterpickedHero } from 'shared/interfaces';
import VSEnemyWinRateCard from './VSEnemyWinRateCard';

const VSEnemyWinRates: FC<IVSEnemyWinRates> = ({ counterpicked }) => {
  return (
    <View style={styles.container}>
      {counterpicked.map((el: ICounterpickedHero) => (
        <VSEnemyWinRateCard image={el.image} winRate={el.winRate} key={el.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: ms(8),
    flexWrap: 'wrap-reverse',
    justifyContent: 'center',
  },
});

export default VSEnemyWinRates;
