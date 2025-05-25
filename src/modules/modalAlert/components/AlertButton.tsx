import useThemeColors from 'hooks/useThemeColors';
import React, { FC, useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { IColors } from 'shared/interfaces';
import { useAlertStore } from 'shared/store/alert';

interface IAlertButton {
  text: string;
  onPress?: () => void;
}

const AlertButton: FC<IAlertButton> = ({ text, onPress }) => {
  const { hideAlert } = useAlertStore();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity
      onPress={() => {
        hideAlert();
        if (onPress) onPress();
      }}
      style={styles.button}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    button: {
      width: s(200),
      height: vs(40),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.elementBackground,
      borderRadius: ms(10),
      marginTop: vs(20),
    },
    text: {
      color: colors.text,
      fontSize: ms(16),
      fontWeight: '600',
    },
  });

export default AlertButton;
