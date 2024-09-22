import { create } from 'zustand';
import { setAsyncStorageItem } from 'shared/utils/asyncStorage';

interface SettingsState {
  vibration: boolean;
  theme: 'light' | 'dark' | 'black';
  languages: string[];
  setVibration: (value: boolean) => Promise<void>;
  setTheme: (theme: 'light' | 'dark' | 'black') => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  vibration: true,
  theme: 'dark',
  languages: ['ru-KZ', 'en-US', 'de-DE'],

  setVibration: async (value: boolean) => {
    set({ vibration: value });
    setAsyncStorageItem('vibration', String(value));
  },

  setTheme: async (theme: 'light' | 'dark' | 'black') => {
    set({ theme });
    setAsyncStorageItem('theme', theme);
  },
}));
