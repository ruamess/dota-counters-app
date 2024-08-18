import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { IHeroImage } from 'shared/utils/interfaces';

const HeroImage: React.FC<IHeroImage> = ({ size, url }) => {
  return (
    <Image
      style={[size === 'lg' && styles.lg, size === 'md' && styles.md, size === 'sm' && styles.sm]}
      source={{ uri: url }}
    />
  );
};

const styles = StyleSheet.create({
  lg: {
    width: s(90),
    height: vs(50),
    borderRadius: ms(10),
  },
  md: {
    width: s(60),
    height: vs(30),
    borderRadius: ms(10),
  },
  sm: {
    width: s(25),
    height: vs(16),
    borderRadius: ms(5),
  },
});

export default memo(HeroImage);
