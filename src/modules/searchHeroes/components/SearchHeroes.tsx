import { observer } from 'mobx-react-lite';
import React, { useRef, memo, useCallback } from 'react';
import { StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ms, vs } from 'react-native-size-matters';
import { ISearchHeroes } from 'shared/utils/interfaces';
import { scrollVibration } from 'shared/utils/vibration';
import colors from 'shared/colors';
import SearchHeroCard from './SearchHeroCard';
import SelectedHeroes from './SelectedHeroes';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { HomeStore } from 'shared/store/home';
import NoHeroes from './NoHeroes';

const CARD_HEIGHT = ms(60);

const SearchHeroes: React.FC<ISearchHeroes> = observer(({ filteredHeroes, selectedHeroes }) => {
  const scrollOffsetY = useRef(0);
  const lastVibrationOffset = useRef(0);
  const scrollEvent = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffsetY = event.nativeEvent.contentOffset.y;

      scrollVibration(lastVibrationOffset, scrollOffsetY, currentOffsetY, CARD_HEIGHT);
    },
    [lastVibrationOffset, scrollOffsetY],
  );

  console.log('search heroes rendered');

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      {filteredHeroes.length > 0 ? (
        <FlashList
          ListHeaderComponent={
            selectedHeroes.length > 0 && HomeStore.searchQuery.length == 0 ? (
              <SelectedHeroes selectedHeroes={selectedHeroes} />
            ) : (
              <Text style={styles.title}>All heroes</Text>
            )
          }
          keyboardShouldPersistTaps="handled"
          onScroll={scrollEvent}
          showsVerticalScrollIndicator={false}
          data={filteredHeroes}
          estimatedItemSize={ms(60)}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: vs(50),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: colors.dark1,
  },
  title: {
    color: colors.white,
  },
});

export default memo(SearchHeroes);
