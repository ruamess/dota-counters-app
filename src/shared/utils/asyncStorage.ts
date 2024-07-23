import AsyncStorage from '@react-native-async-storage/async-storage';

export const getVibrationData = async () => {
  try {
    const value = await AsyncStorage.getItem('Vibration');
    if (value !== null) {
      return JSON.parse(value);
    } else {
      await AsyncStorage.setItem('Vibration', JSON.stringify(true));
      return true;
    }
  } catch (e) {
    console.log(e);
    return true;
  }
};

export const setVibrationData = async (newValue: boolean) => {
  try {
    // console.log(newValue);
    await AsyncStorage.setItem('Vibration', JSON.stringify(newValue));
  } catch (e) {
    console.log(e);
  }
};
