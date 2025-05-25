import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackArrow from 'components/BackArrow';
import { SearchHeroes } from 'modules/searchHeroes';
import SearchInput from 'components/SearchInput';
import { ms } from 'react-native-size-matters';

const Search = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackArrow />
        <SearchInput autoFocus={true} />
      </View>

      <SearchHeroes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: ms(5),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Search;
