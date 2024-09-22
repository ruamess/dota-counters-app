import React, { FC, useState, useCallback, useMemo, memo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import fetchCounters from 'shared/api/fetchCounters';
import { HomeStore } from 'shared/store/home';
import { IColors, IHero } from 'shared/interfaces';
import { Vibrate } from 'shared/utils/vibration';
import useThemeColors from 'hooks/useThemeColors';
import HeroImage from 'components/HeroImage';

const SearchHeroCard: FC<IHero> = ({ id, selected, name, localized_name, image }) => {
  const colors = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  const styles = useMemo(
    () => createStyles(selected, isLoading, colors),
    [selected, isLoading, colors],
  );

  // console.log(name);

  const handlePress = useCallback(async () => {
    Vibrate();

    setIsLoading(true);
    try {
      await fetchCounters({
        id,
        localized_name,
        name,
        image,
        selected,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      if (HomeStore.searchQuery != '') HomeStore.setSearchQuery('');

      Vibrate();
    }
  }, [id, localized_name, name, image, selected]);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} disabled={isLoading}>
      <HeroImage url={image} size="md" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{localized_name}</Text>
      </View>
      <ActivityIndicator style={styles.activityIndicator} size="small" color={colors.text} />
    </TouchableOpacity>
  );
};

const createStyles = (selected: boolean, isLoading: boolean, colors: IColors) =>
  StyleSheet.create({
    card: {
      minWidth: '100%',
      maxWidth: s(400),
      height: vs(45),
      borderRadius: ms(10),
      paddingLeft: s(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: selected ? colors.green : colors.elementBackground,
      marginVertical: ms(5),
    },
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: vs(40),
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      fontSize: ms(20),
      color: colors.text,
    },
    activityIndicator: {
      width: s(60),
      opacity: isLoading ? 1.0 : 0.0,
    },
  });

export default memo(SearchHeroCard);
