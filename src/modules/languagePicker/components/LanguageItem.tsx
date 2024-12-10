import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ms, s } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IColors, ILanguageItem } from 'shared/interfaces';
import formatLanguage from '../utils/formatLanguage';
import useThemeColors from 'hooks/useThemeColors';

const LanguageItem: FC<ILanguageItem> = ({ language, onPress }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const getActiveLanguage = async () => {
      const activeLanguage = await AsyncStorage.getItem('language');
      setActive(activeLanguage == language);
    };

    getActiveLanguage();
  });

  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors, active), [colors, active]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{formatLanguage(language)}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (colors: IColors, active: boolean) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.text,
      backgroundColor: active ? colors.text : colors.appBackground,
      width: s(30),
      height: s(30),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: ms(5),
    },
    text: {
      color: active ? colors.appBackground : colors.text,
    },
  });

export default LanguageItem;
