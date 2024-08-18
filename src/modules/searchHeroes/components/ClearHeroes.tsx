import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'shared/colors';
import { HomeStore } from 'shared/store/home';
import { Vibrate } from 'shared/utils/vibration';

const ClearHeroes = observer(() => {
  return (
    <TouchableOpacity
      onPress={() => {
        HomeStore.clearSelectedHeroes();
        Vibrate();
      }}
    >
      <Text style={styles.title}>Clear all</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  title: {
    color: colors.red,
  },
});

export default ClearHeroes;
