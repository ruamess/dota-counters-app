import { makeAutoObservable } from 'mobx';
import { IHero, ICounterHero, ICounterpickedHero } from 'shared/interfaces';

/**
 * Основное хранилище для героев и их контр-героев.
 */
class MainStore {
  heroes: Map<string, IHero> = new Map();
  counterHeroes: Map<string, ICounterHero> = new Map();
  searchQuery: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  // =================================================================
  // =======================  Методы поиска  ==========================
  // =================================================================

  setSearchQuery(newValue: string) {
    this.searchQuery = newValue;
  }

  // =================================================================
  // ==================  Методы работы с обычными героями  ===========
  // =================================================================

  setHeroes(heroes: IHero[]) {
    this.heroes.clear();
    heroes.forEach((hero) => {
      // Ключом используем localized_name
      this.heroes.set(hero.localized_name, hero);
    });
  }

  findHeroByLocalizedName(localized_name: string): IHero | undefined {
    return this.heroes.get(localized_name);
  }

  toggleHeroSelection(hero: IHero) {
    const existingHero = this.findHeroByLocalizedName(hero.localized_name);

    if (existingHero) {
      // Снимаем выбор или устанавливаем, но не даём выбрать больше 5
      existingHero.selected = !existingHero.selected && this.selectedHeroes.length < 5;
    } else if (this.selectedHeroes.length < 5) {
      hero.selected = true;
      this.heroes.set(hero.localized_name, hero);
    } else {
      console.warn('Maximum number of selected heroes reached!');
    }
  }

  clearSelectedHeroes() {
    // Удаляем контрпики у тех контр-героев, которые ссылаются на каждого из выбранных
    this.selectedHeroes.forEach((selectedHero) => {
      this.counterHeroes.forEach((counterHero) => {
        const pickedIndex = counterHero.counterpicked.findIndex(
          (picked) => picked.localized_name === selectedHero.localized_name,
        );
        if (pickedIndex !== -1) {
          this.removeCounterpickedHero(counterHero);
        }
      });
      // Снимаем флаг "selected"
      selectedHero.selected = false;
    });
  }

  // =================================================================
  // =============  Методы работы с контр-героями (ICounterHero)  ====
  // =================================================================

  pushHero(counterHero: ICounterHero) {
    this.counterHeroes.set(counterHero.localized_name, counterHero);
  }

  removeCounterpickedHero(counterHero: ICounterHero) {
    // Удаляем самого контр-героя из counterHeroes
    this.counterHeroes.delete(counterHero.localized_name);

    // Также удаляем все упоминания о нём из других контр-героев
    for (const otherHero of this.counterHeroes.values()) {
      const idx = otherHero.counterpicked.findIndex(
        (picked) => picked.localized_name === counterHero.localized_name,
      );
      if (idx !== -1) {
        otherHero.counterpicked.splice(idx, 1);
        this.updateCounterHeroWinrate(otherHero);
      }
    }
  }

  addCounterpickedHero(existingHero: ICounterHero, newCounterpicked: ICounterpickedHero) {
    existingHero.counterpicked.push(newCounterpicked);
    this.updateCounterHeroWinrate(existingHero);
  }

  updateCounterHeroWinrate(hero: ICounterHero) {
    hero.overallWinRate = this.calculateAverageWinrate(hero.counterpicked);
  }

  // =================================================================
  // ===============  Вспомогательные методы для винрейта  ===========
  // =================================================================

  calculateAverageWinrate(counterpicked: ICounterpickedHero[]): number {
    if (counterpicked.length === 0) return 0;
    const sum = counterpicked.reduce((acc, picked) => acc + picked.winRate, 0);
    return sum / counterpicked.length;
  }

  // =================================================================
  // =======================  Вычисляемые свойства  ===================
  // =================================================================

  /**
   * Возвращает всех героев, у которых selected = true.
   */
  get selectedHeroes(): IHero[] {
    return Array.from(this.heroes.values()).filter((hero) => hero.selected);
  }

  /**
   * Возвращает героев, которые НЕ выбраны, но подходят под поисковый запрос.
   */
  get searchFilteredHeroes(): IHero[] {
    const query = this.searchQuery.toLowerCase();
    return this.unselectedHeroes.filter((hero) =>
      hero.localized_name.toLowerCase().includes(query),
    );
  }

  /**
   * Возвращает героев, которые не выбраны (selected = false).
   */
  get unselectedHeroes(): IHero[] {
    return Array.from(this.heroes.values()).filter((hero) => !hero.selected);
  }

  /**
   * Возвращает контр-героев, чьё localized_name не совпадает с именами выбранных героев.
   */
  get filteredCounterHeroes(): ICounterHero[] {
    const selectedNames = new Set(this.selectedHeroes.map((h) => h.localized_name));
    return Array.from(this.counterHeroes.values()).filter(
      (cHero) => !selectedNames.has(cHero.localized_name),
    );
  }
}

// Экспортируем экземпляр нашего хранилища
export const HomeStore = new MainStore();
