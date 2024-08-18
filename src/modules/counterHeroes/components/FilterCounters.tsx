import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FilterCounters = () => {
  return (
    <View style={styles.container}>
      <Text>filter by</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterCounters;
