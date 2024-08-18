import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ISelectedHeroes } from 'shared/utils/interfaces';
import ClearHeroes from './ClearHeroes';
import SearchHeroCard from './SearchHeroCard';
import colors from 'shared/colors';

const SelectedHeroes: FC<ISelectedHeroes> = ({ selectedHeroes }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Selected heroes</Text>
        <ClearHeroes />
      </View>

      {selectedHeroes.map((el) => (
        <Animated.View key={el.id} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <SearchHeroCard
            id={el.id}
            selected={el.selected}
            name={el.name}
            localized_name={el.localized_name}
            image={el.image}
          />
        </Animated.View>
      ))}

      <Text style={styles.title}>All heroes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    color: colors.white,
  },
});

export default SelectedHeroes;
