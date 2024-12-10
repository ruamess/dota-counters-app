import { makeAutoObservable } from 'mobx';
import { IHero, ICounterHero, ICounterpickedHero } from 'shared/interfaces';

class MainStore {
  heroes: Map<string, IHero> = new Map();
  counterHeroes: Map<string, ICounterHero> = new Map();
  searchQuery: string = '';
  alert = {
    isVisible: false,
    title: '',
    message: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  // --- Методы для управления Alert ---
  showAlert(title: string, message: string) {
    this.alert = { isVisible: true, title, message };
  }

  hideAlert() {
    this.alert = { isVisible: false, title: '', message: '' };
  }

  // --- Методы для поиска и фильтрации ---
  setSearchQuery(newValue: string) {
    this.searchQuery = newValue;
  }

  // --- Методы для работы с героями ---
  setHeroes(heroes: IHero[]) {
    this.heroes.clear();
    heroes.forEach((hero) => this.heroes.set(hero.localized_name, hero));
  }

  findHeroByLocalizedName(localized_name: string): IHero | undefined {
    return this.heroes.get(localized_name);
  }

  toggleHeroSelection(hero: IHero) {
    const existingHero = this.findHeroByLocalizedName(hero.localized_name);

    if (existingHero) {
      existingHero.selected = !existingHero.selected && this.selectedHeroes.length < 5;
    } else if (this.selectedHeroes.length < 5) {
      hero.selected = true;
      this.heroes.set(hero.localized_name, hero);
    } else {
      console.log('Maximum number of selected heroes reached!');
    }
  }

  clearSelectedHeroes() {
    this.selectedHeroes.forEach((hero) => {
      this.counterHeroes.forEach((counterHero) => {
        const pickedIndex = counterHero.counterpicked.findIndex(
          (picked) => picked.localized_name === hero.localized_name,
        );
        if (pickedIndex !== -1) {
          this.removeCounterpickedHero(counterHero);
        }
      });
      hero.selected = false;
    });
  }

  pushHero(hero: ICounterHero) {
    this.counterHeroes.set(hero.localized_name, hero);
  }

  removeCounterpickedHero(existingHero: ICounterHero) {
    this.counterHeroes.delete(existingHero.localized_name);

    // Удаляем контрпики героя из других героев
    this.counterHeroes.forEach((counterHero) => {
      const index = counterHero.counterpicked.findIndex(
        (picked) => picked.localized_name === existingHero.localized_name,
      );
      if (index !== -1) {
        counterHero.counterpicked.splice(index, 1);
        this.updateCounterHeroWinrate(counterHero);
      }
    });
  }

  calculateAverageWinrate(counterpicked: ICounterpickedHero[]): number {
    return (
      counterpicked.reduce((sum, picked) => sum + picked.winRate, 0) / (counterpicked.length || 1)
    );
  }

  updateCounterHeroWinrate(hero: ICounterHero) {
    hero.overallWinRate = this.calculateAverageWinrate(hero.counterpicked);
  }

  addCounterpickedHero(existingHero: ICounterHero, counterpickedHero: ICounterpickedHero) {
    existingHero.counterpicked.push(counterpickedHero);
    this.updateCounterHeroWinrate(existingHero);
  }

  // --- Вычисляемые свойства ---
  get selectedHeroes(): IHero[] {
    return Array.from(this.heroes.values()).filter((hero) => hero.selected);
  }

  get searchFilteredHeroes(): IHero[] {
    const query = this.searchQuery.toLowerCase();
    return this.unselectedHeroes.filter((hero) =>
      hero.localized_name.toLowerCase().includes(query),
    );
  }

  get unselectedHeroes(): IHero[] {
    return Array.from(this.heroes.values()).filter((hero) => !hero.selected);
  }

  get filteredCounterHeroes(): ICounterHero[] {
    const selectedHeroNames = new Set(this.selectedHeroes.map((hero) => hero.localized_name));
    return Array.from(this.counterHeroes.values()).filter(
      (counterHero) => !selectedHeroNames.has(counterHero.localized_name),
    );
  }

  // --- Вспомогательная функция для поиска контрпиков ---
  findCounterpickedHeroByLocalizedName(localized_name: string): ICounterHero | null {
    for (const counterHero of this.counterHeroes.values()) {
      if (
        counterHero.counterpicked.some((pickedHero) => pickedHero.localized_name === localized_name)
      ) {
        return counterHero;
      }
    }
    return null;
  }
}

// Экземпляр MainStore
export const HomeStore = new MainStore();
