import React, { FC, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { IColors, ICounterHeroCard } from 'shared/interfaces';
import CounterHeroInfo from './CounterHeroInfo';
import VSEnemyWinRates from './VSEnemyWinRates';
import useThemeColors from 'hooks/useThemeColors';

const CounterHeroCard: FC<ICounterHeroCard> = ({
  localized_name,
  image,
  overallWinRate,
  counterpicked,
}) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.counterHeroCard}>
      <CounterHeroInfo
        localized_name={localized_name}
        overallWinRate={overallWinRate}
        image={image}
      />
      <VSEnemyWinRates counterpicked={counterpicked} />
    </View>
  );
};

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    counterHeroCard: {
      backgroundColor: colors.elementBackground,
      width: '100%',
      height: vs(90),
      borderRadius: ms(10),
      padding: ms(15),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: ms(4),
    },
    text: {
      color: colors.text,
    },
  });

export default CounterHeroCard;
