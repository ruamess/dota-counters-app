import { useSettingsStore } from 'shared/store/settings';

const themes = {
  light: {
    text: '#333333',
    appBackground: '#FFFFFF',
    elementBackground: '#F3F3F3',
    green: '#B5FE83',
    red: '#F44336',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  dark: {
    text: '#FFFFFF',
    appBackground: '#1C242D',
    elementBackground: '#28333D',
    green: '#7CB342',
    red: '#AF3737',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  black: {
    text: '#E0E0E0',
    appBackground: '#000000',
    elementBackground: '#1C1C1C',
    green: 'rgba(0,180,0, 0.7)',
    red: '#AF3737',
    overlay: 'rgba(255, 255, 255, 0.4)',
  },
};

type ThemeType = keyof typeof themes;

const useThemeColors = () => {
  const theme = useSettingsStore((state) => state.theme) as ThemeType;
  return themes[theme] || themes.light;
};

export default useThemeColors;
