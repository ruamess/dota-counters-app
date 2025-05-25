import axios from 'axios';
import { HomeStore } from 'shared/store/home';
import { setAsyncStorageItem } from 'shared/utils/asyncStorage';
import archiveHeroes from 'archiveHeroes.json';
import { useAlertStore } from 'shared/store/alert';

/**
 * Функция получает список героев с API или из локального архива (archiveHeroes)
 * в случае ошибок/таймаута, нормализует полученные данные
 * и сохраняет их в HomeStore и AsyncStorage.
 * @returns {Promise<boolean>} Возвращает `true` при успешном выполнении.
 */
export default async function normalizeHeroesData() {
  const heroes = await fetchHeroes(); // Массив героев (из API или из архива)

  // Словарь для переименования некоторых "проблемных" героев
  const heroNameFixMap: Record<string, string> = {
    abyssalunderlord: 'underlord',
    obsidian_destroyer: 'outworld_devourer',
  };

  const processedHeroes = heroes.map(
    (hero: { name: string; id: number; localized_name: string; image: string }) => {
      // Удаляем префикс "npc_dota_hero_" из имени
      const heroImageName = hero.name.replace('npc_dota_hero_', '');
      let heroName = heroImageName;

      // Переписываем некоторые герои через словарь
      if (heroNameFixMap[heroName]) {
        heroName = heroNameFixMap[heroName];
      }

      return {
        id: hero.id,
        name: heroName,
        localized_name: hero.localized_name,
        image: `https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroImageName}.png`,
        selected: false,
      };
    },
  );

  // Сохраняем в MobX-сторе
  HomeStore.setHeroes(processedHeroes);

  // Сохраняем в AsyncStorage (для offline-доступа и кеширования)
  setAsyncStorageItem('heroes', processedHeroes);

  return true;
}

async function fetchHeroes() {
  try {
    const response = await axios.get('https://api.opendota.com/api/heroes', {
      timeout: 5000,
      timeoutErrorMessage: 'timeout',
      responseType: 'json',
    });
    return response.data;
  } catch (error) {
    // Обработка различных ошибок
    if (error == 'AxiosError: timeout') {
      useAlertStore.getState().showAlert('noResponse');
    } else if (error == 'AxiosError: Network Error') {
      useAlertStore.getState().showAlert('noInternet');
    }

    console.error(error);
    // Если API недоступен или ошибка сети, берем архивный список
    return archiveHeroes;
  }
}
