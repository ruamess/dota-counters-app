import React, { FC, memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IColors, ISelectedHeroes } from 'shared/interfaces';
import ClearHeroes from './ClearHeroes';
import SearchHeroCard from './SearchHeroCard';
import useThemeColors from 'hooks/useThemeColors';

const SelectedHeroes: FC<ISelectedHeroes> = ({ selectedHeroes }) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('SelectedHeroes')}</Text>
        <ClearHeroes />
      </View>

      {selectedHeroes.map((el) => (
        <Animated.View key={el.id} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
          <SearchHeroCard
            id={el.id}
            selected={el.selected}
            name={el.name}
            localized_name={el.localized_name}
            image={el.image}
          />
        </Animated.View>
      ))}

      <Text style={styles.title}>{t('AllHeroes')}</Text>
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {},
    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    title: {
      color: colors.text,
    },
  });

export default memo(SelectedHeroes);
