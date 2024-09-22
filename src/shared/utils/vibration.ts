import * as Haptics from 'expo-haptics';
import { Platform, Vibration } from 'react-native';
import { useSettingsStore } from 'shared/store/settings';
import { MutableRefObject } from 'react';

export const scrollVibration = (
  lastVibrationOffset: MutableRefObject<number>,
  scrollOffsetY: MutableRefObject<number>,
  currentOffsetY: number,
  CARD_HEIGHT: number,
) => {
  const offsetDifference = Math.abs(currentOffsetY - lastVibrationOffset.current);

  if (offsetDifference >= CARD_HEIGHT) {
    if (useSettingsStore.getState().vibration === true) {
      Vibrate();
    }

    lastVibrationOffset.current = currentOffsetY;
  }

  scrollOffsetY.current = currentOffsetY;
};

export const Vibrate = async () => {
  if (useSettingsStore.getState().vibration === true) {
    if (Platform.OS === 'android') {
      Vibration.vibrate(1);
    } else {
      await Haptics.selectionAsync();
    }
  }
};
