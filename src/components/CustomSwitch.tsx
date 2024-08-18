import React, { memo } from 'react';
import { Switch } from 'react-native';
import colors from 'shared/colors';

const CustomSwitch = ({ ...children }) => {
  return (
    <Switch
      trackColor={{ false: colors.dark2, true: colors.green }}
      thumbColor={colors.white}
      ios_backgroundColor="#3e3e3e"
      {...children}
    />
  );
};

export default memo(CustomSwitch);
