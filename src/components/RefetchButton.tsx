import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import refetchHeroes from 'shared/utils/refetchHeroes';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';

const RefreshHeroesButton = () => {
  const colors = useThemeColors();
  // console.log('refetch button rendered');
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => refetchHeroes()}>
      <MaterialIcons name="refresh" size={ms(18)} color={colors.text} />
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      padding: ms(5),
      minWidth: ms(70),
      borderRadius: ms(40),
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: ms(35),
      borderWidth: 1,
      borderColor: colors.text,
    },
  });

export default RefreshHeroesButton;
