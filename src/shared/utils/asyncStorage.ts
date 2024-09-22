import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageItem = async (item: string) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value != null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const setAsyncStorageItem = async (item: string, value: string) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};
