import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { IColors } from 'shared/interfaces';
import { scrollVibration } from 'shared/utils/vibration';
import CounterHeroCard from './CounterHeroCard';
import useThemeColors from 'hooks/useThemeColors';
import { observer } from 'mobx-react-lite';
import { HomeStore } from 'shared/store/home';

const CARD_HEIGHT = ms(94);

const CounterHeroes = observer(() => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = createSryles(colors);
  const sortedCounterHeroes = HomeStore.filteredCounterHeroes
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
    <>
      {HomeStore.selectedHeroes.length > 0 && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('CounterHeroes')}</Text>
          </View>

          <FlashList
            showsVerticalScrollIndicator={false}
            onScroll={scrollEvent}
            data={sortedCounterHeroes}
            estimatedItemSize={CARD_HEIGHT}
            keyExtractor={(item) => item.id.toString()}
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
      )}
    </>
  );
});

const createSryles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: ms(17),
      fontWeight: 'bold',
      color: colors.text,
    },
    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: vs(5),
    },
  });

export default CounterHeroes;
