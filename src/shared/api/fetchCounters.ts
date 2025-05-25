import axios from 'axios';
import { parse } from 'node-html-parser';
import { HomeStore } from 'shared/store/home';
import { IHero, ICounterHero } from 'shared/interfaces';

/**
 * Ищет в HomeStore.counterHeroes того контр-героя, в списке которого (counterpicked)
 * уже есть герой с указанным localized_name.
 *
 * @param localized_name - локализованное имя героя (например, "Axe", "Invoker").
 * @returns Возвращает ICounterHero (контр-героя) или null, если не найден.
 */
function findCounterpickedHeroByLocalizedName(localized_name: string): ICounterHero | null {
  for (const counterHero of HomeStore.counterHeroes.values()) {
    // Проверяем, есть ли среди counterpicked искомый localized_name
    const counterpickedHero = counterHero.counterpicked.find(
      (pickedHero) => pickedHero.localized_name === localized_name,
    );
    if (counterpickedHero) {
      return counterHero;
    }
  }
  return null;
}

/**
 * Запрашивает HTML-страницу с Dotabuff по адресу:
 *   https://www.dotabuff.com/heroes/${heroLocalizedName}/counters
 *
 * @param heroLocalizedName - имя героя, преобразованное для URL (например, "phantom-lancer").
 * @returns {Promise<string>} HTML-страница в виде строки.
 */
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

/**
 * Парсит HTML-страницу и извлекает из неё список из 5 контр-героев с их винрейтом.
 *
 * @param data - строка HTML-страницы.
 * @returns Массив объектов { localized_name: string; winRate: number }
 */
function parseCounterHeroes(data: string): { localized_name: string; winRate: number }[] {
  const counterHeroes: { localized_name: string; winRate: number }[] = [];
  const root = parse(data);

  // Извлекаем только первые 5 строк
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

/**
 * Приводит локализованное имя к формату, который используется на Dotabuff.
 * Например:
 *   "Nature's Prophet" -> "natures-prophet"
 *   "Queen of Pain" -> "queen-of-pain"
 *
 * @param localized_name - оригинальное локализованное имя героя.
 * @returns Строка в нижнем регистре, без апострофов, пробелы заменены на дефисы.
 */
function normalizeLocalizedName(localized_name: string): string {
  return localized_name.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
}

/**
 * Обновляет HomeStore (MobX) новыми данными по контрпикам.
 * - Для каждого контр-героя из массива проверяет, есть ли он уже в HomeStore.counterHeroes.
 * - Если контр-герой в HomeStore отсутствует, добавляет его.
 * - Если присутствует, проверяет, есть ли там уже контрпик на текущего героя;
 *   если есть — удаляет, иначе добавляет.
 *
 * @param hero - герой, для которого ищем контрпиков.
 * @param counterHeroes - массив контр-героев (localized_name, winRate).
 */
function updateHomeStoreWithCounters(
  hero: IHero,
  counterHeroes: { localized_name: string; winRate: number }[],
): void {
  counterHeroes.forEach(({ localized_name, winRate }) => {
    // Ищем героя в основном списке (heroes) по локализованному имени
    const counterHeroData = HomeStore.findHeroByLocalizedName(localized_name);

    if (!counterHeroData) {
      // Если в HomeStore нет такого героя, логируем предупреждение и пропускаем
      console.log(`Unexpected hero with localized name: ${localized_name}`);
      return;
    }

    // Проверяем, есть ли уже контр-герой в counterHeroes
    const existingCounterHero = HomeStore.counterHeroes.get(localized_name);

    // Формируем объект контрпикнутого героя
    const counterpickedHeroData = {
      id: hero.id,
      name: hero.name,
      image: hero.image,
      localized_name: hero.localized_name,
      selected: hero.selected,
      winRate,
    };

    if (existingCounterHero) {
      // Если контр-герой уже существует, проверим, нет ли там нашего героя
      const pickedIndex = existingCounterHero.counterpicked.findIndex(
        (picked) => picked.id === hero.id,
      );
      if (pickedIndex !== -1) {
        // Если контрпик уже был, удаляем этого контр-героя целиком
        HomeStore.removeCounterpickedHero(existingCounterHero);
      } else {
        // Иначе просто добавляем новый контрпик в его список
        HomeStore.addCounterpickedHero(existingCounterHero, counterpickedHeroData);
      }
    } else {
      // Если контр-героя нет, создаём новый
      const newCounterHero: ICounterHero = {
        id: counterHeroData.id,
        name: counterHeroData.name,
        image: counterHeroData.image,
        localized_name,
        selected: counterHeroData.selected,
        overallWinRate: winRate,
        counterpicked: [counterpickedHeroData],
      };

      HomeStore.pushHero(newCounterHero);
    }
  });
}

/**
 * Главная функция, которая:
 * 1. Проверяет, есть ли в HomeStore.counterHeroes уже контр-герой,
 *    который хранит в своем списке (counterpicked) текущего героя (hero).
 * 2. Если нашёлся такой контр-герой — удаляем его (чтобы не дублировать).
 * 3. Если в HomeStore уже выбрано 5 героев, прерываем дальнейшую логику.
 * 4. Если всё ок, то:
 *    - нормализуем локализованное имя,
 *    - запрашиваем HTML-страницу, парсим контр-героев,
 *    - добавляем данные в HomeStore и
 *    - вызываем toggleHeroSelection (выбираем текущего героя).
 *
 * @param hero - тот герой, для которого мы хотим получить контрпики.
 */
export default async function fetchCounters(hero: IHero): Promise<void> {
  // Проверяем, нет ли уже в store контр-героя, чьим контрпиком является этот hero
  const existingHero = findCounterpickedHeroByLocalizedName(hero.localized_name);
  console.log(`Fetching counters for: ${hero.localized_name}`);

  if (existingHero) {
    const pickedIndex = existingHero.counterpicked.findIndex((picked) => picked.id === hero.id);
    console.log('Picked index in existingHero:', pickedIndex);
    if (pickedIndex !== -1) {
      HomeStore.removeCounterpickedHero(existingHero);
    }
  } else if (HomeStore.selectedHeroes.length === 5) {
    console.log('Maximum number of selected heroes reached.');
    return;
  }

  // Преобразуем локализованное имя к формату, который используется на сайте Dotabuff
  const heroLocalizedName = normalizeLocalizedName(hero.localized_name);

  try {
    // Получаем и парсим контр-героев
    const data = await fetchHeroCountersData(heroLocalizedName);
    const counterHeroes = parseCounterHeroes(data);

    // Обновляем данные в HomeStore
    updateHomeStoreWithCounters(hero, counterHeroes);
    // Выбираем (или снимаем выбор) для текущего героя
    HomeStore.toggleHeroSelection(hero);

    console.log(HomeStore.counterHeroes);
  } catch (error) {
    console.error('Error fetching or updating counters:', error);
  }
}
