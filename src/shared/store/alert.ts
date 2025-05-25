import { create } from 'zustand';

type AlertType = 'error' | 'noHero' | 'noInternet' | 'noResponse';

interface IAlertStore {
  alert: {
    isVisible: boolean;
    type?: AlertType;
  };
  showAlert: (type: AlertType) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<IAlertStore>((set) => ({
  alert: {
    isVisible: false,
    type: 'error',
  },

  showAlert: (type) => {
    set({ alert: { type, isVisible: true } });
  },

  hideAlert: () => {
    set({ alert: { isVisible: false } });
  },
}));
