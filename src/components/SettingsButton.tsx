import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import colors from 'shared/colors';

const SettingsButton = ({ ...children }) => {
  console.log('settings button rendered');
  return (
    <TouchableOpacity style={styles.container} {...children}>
      <Ionicons name="settings" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark2,
    width: s(45),
    height: vs(35),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ms(5),
    borderRadius: ms(10),
  },
});

export default memo(SettingsButton);
