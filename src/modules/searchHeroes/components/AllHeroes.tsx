import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { IFilteredHeroes } from 'shared/utils/interfaces';

import NoHeroes from './NoHeroes';
import SearchHeroCard from './SearchHeroCard';

const AllHeroes: React.FC<IFilteredHeroes> = ({ filteredHeroes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All heroes</Text>

      {filteredHeroes.length > 0 ? (
        filteredHeroes.map((el) => (
          <MemoizedSearchHeroCard
            key={el.id}
            id={el.id}
            name={el.name}
            selected={el.selected}
            localized_name={el.localized_name}
            image={el.image}
          />
        ))
      ) : (
        <NoHeroes />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(10),
    minWidth: '100%',
  },
  title: {
    color: 'white',
  },
});

const MemoizedSearchHeroCard = memo(SearchHeroCard);

export default memo(AllHeroes);
