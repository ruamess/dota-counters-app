import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, ms, verticalScale, vs } from 'react-native-size-matters';
import { ISelectedHeroes } from 'shared/utils/interfaces';

import EnemyHeroCard from './EnemyHeroCard';

const EnemyHeroes: React.FC<ISelectedHeroes> = ({ selectedHeroes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enemy heroes</Text>

      <View style={styles.enemyHeroesList}>
        {selectedHeroes.map((el) => (
          <EnemyHeroCard
            key={el.id}
            id={el.id}
            name={el.name}
            selected={el.selected}
            localized_name={el.localized_name}
            image={el.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: ms(10),
  },
  title: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    color: 'white',
  },
  enemyHeroesList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: ms(20),
    flexWrap: 'wrap',
    marginVertical: vs(20),
  },
});

export default EnemyHeroes;
