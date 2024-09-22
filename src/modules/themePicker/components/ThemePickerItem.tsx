import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { IColors, IThemePickerItem } from 'shared/interfaces';
import useThemeColors from 'hooks/useThemeColors';

const ThemePickerItem: FC<IThemePickerItem> = ({
  onPress,
  selected,
  backgroundColor,
  children,
}) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }, selected ? styles.selected : null]}
    >
      {children}
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      width: s(40),
      borderRadius: s(40),
      justifyContent: 'center',
      alignItems: 'center',
      height: vs(25),
    },
    selected: {
      borderWidth: 1,
      borderColor: colors.text,
    },
  });

export default ThemePickerItem;
