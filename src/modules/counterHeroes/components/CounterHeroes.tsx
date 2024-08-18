import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { ICounterHeroes } from 'shared/utils/interfaces';
import { scrollVibration } from 'shared/utils/vibration';
import CounterHeroCard from './CounterHeroCard';
import colors from 'shared/colors';
import { FlashList } from '@shopify/flash-list';

const CARD_HEIGHT = ms(94);

const CounterHeroes: React.FC<ICounterHeroes> = observer(({ counterHeroes }) => {
  const sortedCounterHeroes = counterHeroes
    .slice()
    .sort((a, b) => b.overallWinRate - a.overallWinRate);
  const scrollOffsetY = useRef(0);
  const lastVibrationOffset = useRef(0);

  const scrollEvent = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffsetY = event.nativeEvent.contentOffset.y;

      scrollVibration(lastVibrationOffset, scrollOffsetY, currentOffsetY, CARD_HEIGHT);
    },
    [lastVibrationOffset, scrollOffsetY, CARD_HEIGHT],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Counter heroes</Text>
      </View>

      <FlashList
        showsVerticalScrollIndicator={false}
        onScroll={scrollEvent}
        data={sortedCounterHeroes}
        estimatedItemSize={vs(94)}
        renderItem={({ item }) => (
          <CounterHeroCard
            localized_name={item.localized_name}
            image={item.image}
            overallWinRate={item.overallWinRate}
            counterpicked={item.counterpicked}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: ms(17),
    fontWeight: 'bold',
    color: colors.white,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(5),
  },
});

export default CounterHeroes;
