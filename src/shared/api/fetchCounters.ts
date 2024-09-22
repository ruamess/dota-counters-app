import axios from 'axios';
import { parse } from 'node-html-parser';
import { HomeStore } from 'shared/store/home';
import { IHero, ICounterHero } from 'shared/interfaces';

function findCounterpickedHeroByLocalizedName(localized_name: string): ICounterHero | null {
  // Проходим по каждому контр персонажу
  for (const counterHero of HomeStore.counterHeroes.values()) {
    // Ищем в списке контрпикнутых персонажей у каждого контр персонажа
    const counterpickedHero = counterHero.counterpicked.find(
      (pickedHero) => pickedHero.localized_name === localized_name,
    );

    if (counterpickedHero) {
      return counterHero; // Возвращаем контр персонажа, у которого есть контрпикнутый герой
    }
  }

  // Если не найдено, возвращаем null
  return null;
}

// 1. Функция для получения данных с сайта
async function fetchHeroCountersData(heroLocalizedName: string): Promise<string> {
  try {
    const { data } = await axios.get(
      `https://www.dotabuff.com/heroes/${heroLocalizedName}/counters`,
    );
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${heroLocalizedName}:`, error);
    throw error;
  }
}

// 2. Функция для парсинга данных
function parseCounterHeroes(data: string): { localized_name: string; winRate: number }[] {
  const counterHeroes: { localized_name: string; winRate: number }[] = [];
  const root = parse(data);

  const rows = root.querySelectorAll('table.sortable tbody tr').slice(0, 5);

  rows.forEach((row) => {
    const counterHeroName = row.querySelector('td.cell-xlarge a')?.text.trim() || '';
    const counterHeroWinRate = parseFloat(
      row.querySelector('td:nth-child(4)')?.text.trim().replace('%', '') || '0',
    );

    counterHeroes.push({
      localized_name: counterHeroName,
      winRate: counterHeroWinRate,
    });
  });

  return counterHeroes;
}

// 3. Функция для нормализации имени
function normalizeLocalizedName(localized_name: string): string {
  return localized_name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
}

// 4. Функция для работы с данными в HomeStore
function updateHomeStoreWithCounters(
  hero: IHero,
  counterHeroes: { localized_name: string; winRate: number }[],
): void {
  counterHeroes.forEach(({ localized_name, winRate }) => {
    const counterHeroData = HomeStore.findHeroByLocalizedName(localized_name);

    // Это
    if (!counterHeroData) {
      console.log(`Unexpected hero with localized name: ${localized_name}`);
      return;
    }
    // Это
    const existingHero = HomeStore.counterHeroes.get(localized_name);
    // Это
    const counterpickedHeroData = {
      id: hero.id,
      name: hero.name,
      image: hero.image,
      localized_name: hero.localized_name,
      selected: hero.selected,
      winRate,
    };

    // Это
    if (existingHero) {
      const pickedIndex = existingHero.counterpicked.findIndex((picked) => picked.id === hero.id);
      if (pickedIndex !== -1) {
        HomeStore.removeCounterpickedHero(existingHero);
      } else {
        HomeStore.addCounterpickedHero(existingHero, counterpickedHeroData);
      }
    } else {
      const newCounterHero: ICounterHero = {
        id: counterHeroData.id,
        name: counterHeroData.name,
        image: counterHeroData.image,
        localized_name: localized_name,
        selected: counterHeroData.selected,
        overallWinRate: winRate,
        counterpicked: [counterpickedHeroData],
      };

      HomeStore.pushHero(newCounterHero);
    }
  });
}

// 5. Главная функция для получения контрпиков
export default async function fetchCounters(hero: IHero): Promise<void> {
  const existingHero = findCounterpickedHeroByLocalizedName(hero.localized_name);
  console.log(hero.localized_name);
  // Это
  if (existingHero) {
    const pickedIndex = existingHero.counterpicked.findIndex((picked) => picked.id === hero.id);
    console.log(pickedIndex);
    if (pickedIndex !== -1) {
      HomeStore.removeCounterpickedHero(existingHero);
    }
  } else if (HomeStore.selectedHeroes.length == 5) {
    console.log('Maximum number of selected heroes reached.');
    return;
  }

  const heroLocalizedName = normalizeLocalizedName(hero.localized_name);

  try {
    const data = await fetchHeroCountersData(heroLocalizedName);
    const counterHeroes = parseCounterHeroes(data);
    updateHomeStoreWithCounters(hero, counterHeroes);
    HomeStore.toggleHeroSelection(hero);
    console.log(HomeStore.counterHeroes);
  } catch (error) {
    console.error('Error fetching or updating counters:', error);
  }
}
