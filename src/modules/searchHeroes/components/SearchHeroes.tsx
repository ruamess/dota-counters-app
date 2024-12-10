import React, { useRef, useCallback, useMemo, memo } from 'react';
import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { IColors } from 'shared/interfaces';
import { scrollVibration } from 'shared/utils/vibration';
import SearchHeroCard from './SearchHeroCard';
import SelectedHeroes from './SelectedHeroes';
import NoHeroes from './NoHeroes';
import useThemeColors from 'hooks/useThemeColors';
import { HomeStore } from 'shared/store/home';
import { observer } from 'mobx-react-lite';

const CARD_HEIGHT = ms(60);

const SearchHeroes = observer(() => {
  // console.log(HomeStore.searchFilteredHeroes.length);
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const scrollOffsetY = useRef(0);
  const lastVibrationOffset = useRef(0);

  const scrollEvent = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    scrollVibration(lastVibrationOffset, scrollOffsetY, currentOffsetY, CARD_HEIGHT);
  }, []);

  // console.log('search heroes rendered');

  const renderListHeader = useMemo(
    () =>
      HomeStore.selectedHeroes.length > 0 && HomeStore.searchQuery.length === 0 ? (
        <SelectedHeroes selectedHeroes={HomeStore.selectedHeroes} />
      ) : (
        <Text style={styles.title}>{t('AllHeroes')}</Text>
      ),
    [HomeStore.selectedHeroes, HomeStore.searchQuery.length],
  );

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      {HomeStore.searchFilteredHeroes.length > 0 ? (
        <FlashList
          ListHeaderComponent={renderListHeader}
          keyboardShouldPersistTaps="handled"
          onScroll={scrollEvent}
          showsVerticalScrollIndicator={false}
          data={HomeStore.searchFilteredHeroes}
          estimatedItemSize={CARD_HEIGHT}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SearchHeroCard
              id={item.id}
              name={item.name}
              selected={item.selected}
              localized_name={item.localized_name}
              image={item.image}
            />
          )}
        />
      ) : (
        <NoHeroes />
      )}
    </Animated.View>
  );
});

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      color: colors.text,
    },
  });

export default memo(SearchHeroes);
