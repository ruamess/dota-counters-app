export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  image: string;
  selected: boolean;
}

export interface ICounterHero extends IHero {
  overallWinrate: number;
  counterpicked: ICounterpickedHero[];
}

export interface ICounterpickedHero extends IHero {
  winrate: number;
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
