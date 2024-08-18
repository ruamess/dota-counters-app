import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import colors from 'shared/colors';

const SearchInput = ({ ...children }) => {
  console.log('search rendered');
  return (
    <View style={styles.inputContainer}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={colors.white}
          {...children}
        />
        <View style={styles.icon}>
          <Ionicons name="search" size={vs(20)} color={colors.white} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: vs(50),
    zIndex: 3,
  },
  input: {
    height: vs(40),
    fontSize: ms(16),
    flex: 1,
    color: colors.white,
  },
  search: {
    width: '100%',
    maxWidth: s(400),
    backgroundColor: colors.dark2,
    height: vs(40),
    borderRadius: ms(10),
    paddingHorizontal: ms(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  icon: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SearchInput);
