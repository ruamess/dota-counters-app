import React, { FC, memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import { IColors, ISettingItem } from 'shared/interfaces';
import useThemeColors from 'hooks/useThemeColors';

const SettingItem: FC<ISettingItem> = ({ title, component }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.setting}>
      <Text style={styles.title}>{title}</Text>
      {component}
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    setting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: colors.text,
      fontSize: ms(17),
    },
  });

export default memo(SettingItem);
