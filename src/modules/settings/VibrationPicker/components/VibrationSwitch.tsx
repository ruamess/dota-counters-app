import React, { memo } from 'react';
import { Switch } from 'react-native';
import { vs } from 'react-native-size-matters';
import useThemeColors from 'hooks/useThemeColors';
import { useSettingsStore } from 'shared/store/settings';
import { Vibrate } from 'shared/utils/vibration';

const VibrationSwitch = () => {
  const colors = useThemeColors();
  const setVibration = useSettingsStore((state) => state.setVibration);
  const vibration = useSettingsStore((state) => state.vibration);
  // console.log('vibration svitch rendered');
  return (
    <Switch
      style={{
        height: vs(30),
        transform: [{ translateY: 5 }],
      }}
      trackColor={{ false: colors.elementBackground, true: colors.green }}
      thumbColor={colors.text}
      ios_backgroundColor="transparent"
      onValueChange={() => {
        setVibration(!vibration);
        Vibrate();
      }}
      value={vibration}
    />
  );
};

export default memo(VibrationSwitch);
