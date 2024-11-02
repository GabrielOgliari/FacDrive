import AsyncStorage from '@react-native-async-storage/async-storage';
class StorageService {
  static set(key: string, value: {}) {
    try {
      const jsonValue = JSON.stringify(value);
      AsyncStorage.setItem(key, jsonValue).then();
    } catch (e) {
      console.log(e)
    }
  }

  static async get(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log(error)
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear()
    } catch (error) {
      console.log(error)
    }
  }
}

export default StorageService;
