import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { s } from 'react-native-size-matters';
import { IColors, IThemePickerItem } from 'shared/interfaces';
import useThemeColors from 'hooks/useThemeColors';

const ThemePickerItem: FC<IThemePickerItem> = ({ onPress, selected, children }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, selected ? styles.selected : null]}
    >
      {children}
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      width: s(100),
      borderRadius: s(50),
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    selected: {
      backgroundColor: colors.elementBackground,
    },
  });

export default ThemePickerItem;
