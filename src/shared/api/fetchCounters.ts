import axios from 'axios';
import { load } from 'cheerio';
import { HomeStore } from 'shared/store/home';
import { IHero, ICounterHero } from 'shared/utils/interfaces';

// 1. Функция для получения данных с сайта
async function fetchHeroCountersData(heroLocalizedName: string): Promise<string> {
  const { data } = await axios.get(`https://www.dotabuff.com/heroes/${heroLocalizedName}/counters`);
  return data;
}

// 2. Функция для парсинга данных
function parseCounterHeroes(data: string): { name: string; winRate: number }[] {
  const counterHeroesData: { name: string; winRate: number }[] = [];
  const $ = load(data);

  $('table.sortable tbody tr')
    .slice(0, 5)
    .each((index, element) => {
      const counterHeroName = $(element).find('td.cell-xlarge a').text().trim();
      const counterHeroWinRate = parseFloat(
        $(element).find('td:nth-child(4)').text().trim().replace('%', ''),
      );
      counterHeroesData.push({
        name: counterHeroName,
        winRate: counterHeroWinRate,
      });
    });

  return counterHeroesData;
}

// 3. Функция для нормализации имени
function normalizeLocalizedName(localized_name: string): string {
  return localized_name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
}

// 4. Функция для работы с данными в HomeStore
function updateHomeStoreWithCounters(
  hero: IHero,
  counterHeroes: { name: string; winRate: number }[],
): void {
  counterHeroes.forEach(({ name, winRate }) => {
    const counterHeroData = HomeStore.findHeroByLocalizedName(name);

    if (!counterHeroData) {
      console.log('Unexpected hero');
      return;
    }

    const existingHero = HomeStore.counterHeroes.get(name);

    const counterpickedHeroData = {
      id: hero.id,
      name: hero.name,
      image: hero.image,
      localized_name: hero.localized_name,
      selected: hero.selected,
      winRate,
    };

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
        localized_name: name,
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
  if (HomeStore.selectedHeroes.length > 5) {
    return;
  }
  const heroLocalizedName = normalizeLocalizedName(hero.localized_name);
  const data = await fetchHeroCountersData(heroLocalizedName);
  const counterHeroes = parseCounterHeroes(data);
  updateHomeStoreWithCounters(hero, counterHeroes);
  HomeStore.toggleHeroSelection(hero);
}
