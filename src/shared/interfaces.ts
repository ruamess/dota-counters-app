import { ReactNode } from 'react';

export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  image: string;
  selected: boolean;
}

export interface ICounterHero extends IHero {
  overallWinRate: number;
  counterpicked: ICounterpickedHero[];
}

export interface ICounterpickedHero extends IHero {
  winRate: number;
}

export interface IHeroImage {
  url: string;
  size: 'lg' | 'md' | 'sm';
}

export interface ISelectedHeroes {
  selectedHeroes: IHero[];
}

export interface ISearchHeroes {
  filteredHeroes: IHero[];
  selectedHeroes: IHero[];
}

export type ICounterHeroCard = Omit<ICounterHero, 'id' | 'selected' | 'name'>;

export type ICounterHeroInfo = Omit<ICounterHero, 'id' | 'selected' | 'counterpicked' | 'name'>;

export interface IVSEnemyWinRates {
  counterpicked: ICounterpickedHero[];
}

export interface IVSEnemyWinRateCard {
  image: string;
  winRate: number;
}

export interface IAsyncStore {
  heroes: IHero[];
  vibration: boolean;
}

export interface IThemePickerItem {
  onPress: () => void;
  selected: boolean;
  children: ReactNode;
}

export interface IColors {
  text: string;
  appBackground: string;
  elementBackground: string;
  green: string;
  red: string;
  overlay: string;
}

export interface ILanguageItem {
  language: string;
  onPress: () => void;
}

export interface ISettingItem {
  title: string;
  component: ReactNode;
}

export interface ISettingWrapper {
  style?: ViewStyle;
  children: React.ReactNode;
}
