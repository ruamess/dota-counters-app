import HeroImage from 'components/HeroImage';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ICounterHero } from 'shared/utils/interfaces';

const CounterHeroCard: React.FC<ICounterHero> = observer(
  ({ id, name, localized_name, image, overallWinrate, counterpicked }) => {
    return (
      <View style={styles.counterHeroCard}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <HeroImage source={{ uri: image }} />

          <View>
            <Text style={{ color: 'white' }}>{localized_name}</Text>
            <Text style={{ color: 'white' }}>Overall: {Math.round(overallWinrate)} %</Text>
          </View>
        </View>

        <View style={styles.counterHeroWinRate}>
          {counterpicked.map((el) => (
            <View key={el.id} style={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <Image source={{ uri: el.image }} style={styles.image} />
              <Text style={{ color: 'white' }}>: {Math.round(el.winrate)} %</Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  image: {
    width: scale(30),
    height: verticalScale(18),
    borderRadius: moderateScale(5),
  },
  counterHeroCard: {
    backgroundColor: '#28333D',
    width: '100%',
    height: verticalScale(90),
    borderRadius: moderateScale(10),
    padding: moderateScale(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: moderateScale(4),
  },
  counterHeroWinRate: {
    display: 'flex',
    gap: moderateScale(8),
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CounterHeroCard;
