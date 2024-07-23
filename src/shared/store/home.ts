import { makeAutoObservable, action } from 'mobx';
import { IHero, ICounterHero, ICounterpickedHero } from 'shared/utils/interfaces';

class MainStore {
  heroes: Map<string, IHero> = new Map();
  counterHeroes: Map<string, ICounterHero> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  pushHero = action((hero: ICounterHero) => {
    this.counterHeroes.set(hero.localized_name, hero);
  });

  calculateAverageWinrate(counterpicked: ICounterpickedHero[]): number {
    return counterpicked.reduce((sum, picked) => sum + picked.winrate, 0) / counterpicked.length;
  }

  updateCounterHeroWinrate(hero: ICounterHero) {
    hero.overallWinrate = this.calculateAverageWinrate(hero.counterpicked);
  }

  removeCounterpickedHero = action((existingHero: ICounterHero, pickedIndex: number) => {
    existingHero.counterpicked.splice(pickedIndex, 1);
    if (existingHero.counterpicked.length === 0) {
      this.counterHeroes.delete(existingHero.localized_name);
    } else {
      this.updateCounterHeroWinrate(existingHero);
    }
  });

  addCounterpickedHero = action(
    (existingHero: ICounterHero, counterpickedHero: ICounterpickedHero) => {
      existingHero.counterpicked.push(counterpickedHero);
      this.updateCounterHeroWinrate(existingHero);
    },
  );

  setHeroes = action((heroes: IHero[]) => {
    this.heroes.clear();
    heroes.forEach((hero) => this.heroes.set(hero.localized_name, hero));
  });

  findHeroByLocalizedName(localized_name: string): IHero | undefined {
    return this.heroes.get(localized_name);
  }

  toggleHeroSelection = action((hero: IHero) => {
    const existingHero = this.findHeroByLocalizedName(hero.localized_name);
    if (existingHero) {
      if (existingHero.selected) {
        existingHero.selected = false;
      } else if (this.selectedHeroes.length < 5) {
        existingHero.selected = true;
      } else {
        console.log('Maximum number of selected heroes reached!');
      }
    } else if (this.selectedHeroes.length < 5) {
      hero.selected = true;
      this.heroes.set(hero.localized_name, hero);
    } else if (this.selectedHeroes.length === 5) {
      console.log('Maximum number of selected heroes reached!');
    } else {
      console.log('Maximum number of selected heroes reached!');
    }
  });

  clearSelectedHeroes = action(() => {
    this.selectedHeroes.forEach((hero) => {
      this.counterHeroes.forEach((counterHero, key) => {
        const pickedIndex = counterHero.counterpicked.findIndex(
          (picked) => picked.localized_name === hero.localized_name,
        );
        if (pickedIndex !== -1) {
          this.removeCounterpickedHero(counterHero, pickedIndex);
        }
      });
      hero.selected = false;
    });
  });

  get selectedHeroes(): IHero[] {
    return Array.from(this.heroes.values()).filter((hero) => hero.selected);
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
}

export const HomeStore = new MainStore();
