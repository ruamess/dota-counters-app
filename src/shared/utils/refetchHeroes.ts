import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const refetchHeroes = async () => {
  try {
    await AsyncStorage.setItem('heroes', String(null));
  } catch (e) {
    console.log(e);
  } finally {
    router.replace('/');
  }
};

export default refetchHeroes;
