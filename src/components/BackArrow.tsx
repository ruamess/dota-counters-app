import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import useThemeColors from 'hooks/useThemeColors';

const BackArrow = () => {
  const colors = useThemeColors();

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <MaterialIcons name="arrow-back-ios" size={ms(20)} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vs(40),
    width: s(40),
  },
});

export default memo(BackArrow);
