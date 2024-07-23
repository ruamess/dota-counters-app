import React from "react";
import { Image, StyleSheet } from "react-native";
import { ms, s, vs } from "react-native-size-matters";

const HeroImage = ({ ...children }) => {
  return <Image style={styles.image} {...children} />;
};

const styles = StyleSheet.create({
  image: {
    width: s(90),
    height: vs(50),
    borderRadius: ms(10),
  },
});

export default HeroImage;
