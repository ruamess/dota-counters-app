import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';
import useThemeColors from 'hooks/useThemeColors';
import { IColors, ISettingWrapper } from 'shared/interfaces';

const SettingWrapper: React.FC<ISettingWrapper> = ({ style, children }) => {
  const colors = useThemeColors();
  const defaultStyles = useMemo(() => createStyles(colors), [colors]);

  return <View style={[defaultStyles.container, style]}>{children}</View>;
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: ms(15),
      paddingVertical: ms(18),
      borderRadius: ms(25),
      backgroundColor: colors.elementBackground,
    },
  });

export default memo(SettingWrapper);
