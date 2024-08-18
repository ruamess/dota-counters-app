export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  image: string;
  selected: boolean;
}

export interface IHeroImage {
  url: string;
  size: 'lg' | 'md' | 'sm';
}

export interface ICounterHero extends IHero {
  overallWinRate: number;
  counterpicked: ICounterpickedHero[];
}

// image, localized_name, overallWinRate;

export interface ICounterpickedHero extends IHero {
  winRate: number;
}

export interface IFilteredHeroes {
  filteredHeroes: IHero[];
}

export interface ISelectedHeroes {
  selectedHeroes: IHero[];
}

export interface ICounterHeroes {
  counterHeroes: ICounterHero[];
}

export interface ISearchHeroes {
  filteredHeroes: IHero[];
  selectedHeroes: IHero[];
}

// localized_name, image, overallWinRate, counterpicked

export interface ICounterHeroCard extends Omit<ICounterHero, 'id' | 'selected' | 'name'> {}

export interface ICounterHeroInfo
  extends Omit<ICounterHero, 'id' | 'selected' | 'counterpicked' | 'name'> {}

export interface IVSEnemyWinRates {
  counterpicked: ICounterpickedHero[];
}

export interface IVSEnemyWinRateCard {
  image: string;
  winRate: number;
}

export interface IAsyncStore {
  heroes: [];
  vibration: boolean;
}
