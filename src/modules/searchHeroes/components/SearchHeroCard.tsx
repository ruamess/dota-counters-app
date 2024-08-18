import HeroImage from 'components/HeroImage';
import { observer } from 'mobx-react-lite';
import React, { FC, useState, useCallback, useMemo, memo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ms, s, vs } from 'react-native-size-matters';
import fetchCounters from 'shared/api/fetchCounters';
import colors from 'shared/colors';
import { HomeStore } from 'shared/store/home';
import { IHero } from 'shared/utils/interfaces';
import { Vibrate } from 'shared/utils/vibration';

const SearchHeroCard: FC<IHero> = observer(({ id, selected, name, localized_name, image }) => {
  const [isLoading, setIsLoading] = useState(false);
  const styles = useMemo(() => createStyles(selected, isLoading), [selected, isLoading]);

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
      HomeStore.setSearchQuery('');

      Vibrate();
    }
  }, [id, localized_name, name, image, selected]);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} disabled={isLoading}>
      <HeroImage url={image} size="md" />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{localized_name}</Text>
      </View>
      <ActivityIndicator style={styles.activityIndicator} size="small" color="#FFF" />
    </TouchableOpacity>
  );
});

const createStyles = (selected: boolean, isLoading: boolean) =>
  StyleSheet.create({
    card: {
      minWidth: '100%',
      maxWidth: s(400),
      height: vs(45),
      borderRadius: ms(10),
      paddingLeft: s(15),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: selected ? colors.green : colors.dark2,
      marginVertical: ms(5),
    },
    textContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: vs(40),
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      fontSize: ms(20),
      color: colors.white,
    },
    activityIndicator: {
      width: s(60),
      opacity: isLoading ? 1.0 : 0.0,
    },
  });

export default memo(SearchHeroCard);
