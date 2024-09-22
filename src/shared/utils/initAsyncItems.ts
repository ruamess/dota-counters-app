import { router } from 'expo-router';
import fetchHeroesData from 'shared/api/fetchHeroesData';
import { HomeStore } from 'shared/store/home';
import { getAsyncStorageItem } from 'shared/utils/asyncStorage';
import { useSettingsStore } from 'shared/store/settings';

export const initTheme = async () => {
  const theme = await getAsyncStorageItem('theme');
  if (theme == null) {
    useSettingsStore.getState().setTheme('dark');
  } else {
    useSettingsStore.getState().setTheme(theme);
  }
};

export const initVibration = async () => {
  const vibration = await getAsyncStorageItem('vibration');
  if (vibration == null) {
    useSettingsStore.getState().setVibration(true);
  } else {
    useSettingsStore.getState().setVibration(JSON.parse(vibration));
  }
};

export const initHeroesData = async () => {
  const heroes = await getAsyncStorageItem('heroes');
  if (heroes == null) fetchHeroes();
  else {
    HomeStore.setHeroes(heroes);
    router.replace('/home');
  }
};

const fetchHeroes = async () => {
  await fetchHeroesData();
  router.replace('/home');
  console.log('не асинк');
};
