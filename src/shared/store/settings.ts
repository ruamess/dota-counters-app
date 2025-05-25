import { create } from 'zustand';
import { setAsyncStorageItem } from 'shared/utils/asyncStorage';

type ThemeType = 'light' | 'dark' | 'black';

interface SettingsState {
  vibration: boolean;
  theme: ThemeType;
  languages: string[];
  setVibration: (value: boolean) => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  vibration: true,
  theme: 'dark',
  languages: ['ru-KZ', 'en-US', 'de-DE'],

  setVibration: async (value: boolean) => {
    set({ vibration: value });
    setAsyncStorageItem('vibration', String(value));
  },

  setTheme: async (theme) => {
    set({ theme });
    setAsyncStorageItem('theme', theme);
  },
}));
