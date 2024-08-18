import { atom } from 'jotai';
import { IAsyncStore } from 'shared/utils/interfaces';

export const asyncStore = atom<IAsyncStore>({
  heroes: [],
  vibration: true,
});
