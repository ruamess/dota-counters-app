import { observer } from 'mobx-react-lite';
import React from 'react';
import { ms, vs } from 'react-native-size-matters';
import { View, StyleSheet } from 'react-native';
import colors from 'shared/colors';
import { ICounterHeroCard } from 'shared/utils/interfaces';
import CounterHeroInfo from './CounterHeroInfo';
import VSEnemyWinRates from './VSEnemyWinRates';

const CounterHeroCard: React.FC<ICounterHeroCard> = observer(
  ({ localized_name, image, overallWinRate, counterpicked }) => {
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
  },
);

const styles = StyleSheet.create({
  counterHeroCard: {
    backgroundColor: colors.dark2,
    width: '100%',
    height: vs(90),
    borderRadius: ms(10),
    padding: ms(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(4),
  },
  text: {
    color: colors.white,
  },
});

export default CounterHeroCard;
