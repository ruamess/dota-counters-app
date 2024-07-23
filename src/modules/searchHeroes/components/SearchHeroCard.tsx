import { observer } from 'mobx-react-lite';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import getHeroCounterpicks from 'shared/api/getHeroCounterpicks';
import { HomeStore } from 'shared/store/home';
import { IHero } from 'shared/utils/interfaces';
import { Vibrate } from 'shared/utils/vibration';

const SearchHeroCard: React.FC<IHero> = observer(
  ({ id, selected, name, localized_name, image }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePress = useCallback(async () => {
      Vibrate();

      setIsLoading(true);
      try {
        await getHeroCounterpicks({
          id,
          localized_name,
          name,
          image,
          selected,
        });
        await HomeStore.toggleHeroSelection({
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

        Vibrate();
      }
    }, [id, localized_name, name, image, selected]);

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: selected ? '#708C37' : '#28333D' }]}
        onPress={handlePress}
        disabled={isLoading}
      >
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{localized_name}</Text>
        </View>
        <ActivityIndicator
          style={{ width: scale(60), opacity: isLoading ? 1.0 : 0.0 }}
          size="small"
          color="#FFF"
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    minWidth: '100%',
    maxWidth: scale(400),
    height: verticalScale(45),
    borderRadius: moderateScale(10),
    paddingLeft: scale(15),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: scale(60),
    height: verticalScale(30),
    borderRadius: moderateScale(10),
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(40),
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(20),
    color: 'white',
  },
});

export default React.memo(SearchHeroCard);
