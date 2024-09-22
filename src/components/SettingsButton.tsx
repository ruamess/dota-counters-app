import React, { memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';

const SettingsButton = ({ ...children }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  // console.log('settings button rendered');

  return (
    <TouchableOpacity style={styles.container} {...children}>
      <Ionicons name="settings" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.elementBackground,
      width: s(45),
      height: vs(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: ms(5),
      borderRadius: ms(10),
    },
  });

export default memo(SettingsButton);
