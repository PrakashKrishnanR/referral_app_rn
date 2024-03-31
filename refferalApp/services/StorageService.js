import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {

    async storeValue(key, value) {
        try {
          
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          console.log("Error storing the data", e);
        }
      },

  async storeData(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (e) {
      console.log("Error storing the data", e);
    }
  },

  async getData(key) {
    try {
      const stringValue = await AsyncStorage.getItem(key);
      return stringValue != null ? JSON.parse(stringValue) : null;
    } catch (e) {
      console.log("Error reading the data", e);
    }
  },

  async getValue(key) {
    try {
      const stringValue = await AsyncStorage.getItem(key);
      console.log(stringValue);
      return stringValue;
    } catch (e) {
      console.log("Error reading the data", e);
    }
  },

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log("Error removing the data", e);
    }
  },

  async clearAllData() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log("Error clearing the storage", e);
    }
  },
};