import React, { useCallback, useMemo, memo, FC } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import useThemeColors from 'hooks/useThemeColors';
import { IColors } from 'shared/interfaces';
import { HomeStore } from 'shared/store/home';
import { observer } from 'mobx-react-lite';

const SearchInput: FC<TextInputProps> = observer(({ ...children }) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handleChangeText = useCallback((text: string) => {
    HomeStore.setSearchQuery(text);
  }, []);

  return (
    <View style={styles.search}>
      <View style={styles.icon}>
        <Ionicons name="search" size={vs(20)} color={colors.text} />
      </View>
      <TextInput
        style={styles.input}
        placeholder={`${t('Search')}...`}
        placeholderTextColor={colors.text}
        value={HomeStore.searchQuery}
        onChangeText={handleChangeText}
        {...children}
      />
    </View>
  );
});

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    search: {
      flex: 1,
      maxWidth: s(400),
      backgroundColor: colors.elementBackground,
      height: vs(40),
      borderRadius: ms(10),
      paddingHorizontal: ms(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      zIndex: 20,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      height: vs(40),
      fontSize: ms(16),
      color: colors.text,
    },
    icon: {
      width: vs(30),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default memo(SearchInput);
