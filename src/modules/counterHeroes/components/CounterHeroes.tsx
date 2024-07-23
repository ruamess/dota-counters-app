import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { ICounterHeroes } from 'shared/utils/interfaces';
import { scrollVibration } from 'shared/utils/vibration';

import CounterHeroCard from './CounterHeroCard';

const CARD_HEIGHT = moderateScale(94);

const CounterHeroes: React.FC<ICounterHeroes> = observer(({ counterHeroes }) => {
  const sortedCounterHeroes = counterHeroes
    .slice()
    .sort((a, b) => b.overallWinrate - a.overallWinrate);
  const scrollOffsetY = useRef(0);
  const lastVibrationOffset = useRef(0);

  const scrollEvent = (event: any) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;

    scrollVibration(lastVibrationOffset, scrollOffsetY, currentOffsetY, CARD_HEIGHT);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter heroes</Text>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={scrollEvent}
        scrollEventThrottle={16}
      >
        {sortedCounterHeroes.map((el) => (
          <CounterHeroCard
            key={el.id}
            id={el.id}
            name={el.name}
            selected={el.selected}
            localized_name={el.localized_name}
            image={el.image}
            overallWinrate={el.overallWinrate}
            counterpicked={el.counterpicked}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(17),
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
    color: 'white',
  },
});

export default CounterHeroes;
