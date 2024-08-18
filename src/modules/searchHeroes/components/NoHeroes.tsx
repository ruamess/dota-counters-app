import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ms, vs } from 'react-native-size-matters';
import colors from 'shared/colors';

const NoHeroes = () => {
  return (
    <Animated.View style={styles.container} entering={FadeIn.duration(100)}>
      <Text style={styles.title}>No heroes</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: vs(100),
  },
  title: {
    color: colors.white,
    fontSize: ms(14),
  },
});

export default NoHeroes;
