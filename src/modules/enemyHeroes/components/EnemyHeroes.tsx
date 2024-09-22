import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ms, vs } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';
import { IColors } from 'shared/interfaces';
import EnemyHeroCard from './EnemyHeroCard';
import useThemeColors from 'hooks/useThemeColors';
import { observer } from 'mobx-react-lite';
import { HomeStore } from 'shared/store/home';

const EnemyHeroes = observer(() => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <>
      {HomeStore.selectedHeroes.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>{t('EnemyHeroes')}</Text>

          <View style={styles.enemyHeroesList}>
            {HomeStore.selectedHeroes.map((el) => (
              <EnemyHeroCard
                key={el.id}
                id={el.id}
                name={el.name}
                selected={el.selected}
                localized_name={el.localized_name}
                image={el.image}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
});

const createStyles = (colors: IColors) =>
  StyleSheet.create({
    container: {
      paddingTop: ms(10),
    },
    title: {
      fontSize: ms(17),
      fontWeight: 'bold',
      color: colors.text,
    },
    enemyHeroesList: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: ms(20),
      flexWrap: 'wrap',
      marginVertical: vs(20),
    },
  });

export default EnemyHeroes;
