import HeroImage from 'components/HeroImage';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from 'shared/colors';
import { ICounterHeroInfo } from 'shared/utils/interfaces';

const CounterHeroInfo: React.FC<ICounterHeroInfo> = ({ image, localized_name, overallWinRate }) => {
  return (
    <View style={styles.container}>
      <HeroImage url={image} size="lg" />

      <View>
        <Text style={styles.text}>{localized_name}</Text>
        <Text style={styles.text}>Overall: {Math.round(overallWinRate)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: colors.white,
  },
});

export default CounterHeroInfo;
