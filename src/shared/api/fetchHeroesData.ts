import axios from 'axios';
import { HomeStore } from 'shared/store/home';
import { setAsyncStorageItem } from 'shared/utils/asyncStorage';
import archiveHeroes from 'archiveHeroes.json';

async function fetchHeroes() {
  try {
    const response = await axios.get('https://api.opendota.com/api/heroes', {
      timeout: 5000, // 5 seconds timeout
    });
    return response.data;
  } catch (error) {
    console.log(error);
    HomeStore.showAlert('OpenDotaIsNotResponding', 'SinceOpenDotaUnavaible');
    return archiveHeroes;
  }
}

export default async function normalizeHeroesData() {
  const heroes = await fetchHeroes();

  const processedHeroes = heroes.map(
    (hero: { name: string; id: number; localized_name: string; image: string }) => {
      const heroImageName = hero.name.replace('npc_dota_hero_', '');
      let heroName = hero.name.replace('npc_dota_hero_', '');

      // OD and Underlord check
      if (heroName === 'abyssalunderlord') {
        heroName = 'underlord';
      } else if (heroName === 'obsidian_destroyer') {
        heroName = 'outworld_devourer';
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

  HomeStore.setHeroes(processedHeroes);
  setAsyncStorageItem('heroes', processedHeroes);

  return true;
}
