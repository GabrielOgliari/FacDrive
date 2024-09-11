import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  static async set(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log(`Valor para a chave "${key}" armazenado com sucesso.`);
    } catch (error) {
      console.error(`Erro ao armazenar valor para a chave "${key}":`, error);
    }
  }

  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(`Valor para a chave "${key}" recuperado:`, value);
        return value;
      } else {
        console.log(`Nenhum valor encontrado para a chave "${key}".`);
        return null;
      }
    } catch (error) {
      console.error(`Erro ao recuperar valor para a chave "${key}":`, error);
      return null;
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Valor para a chave "${key}" removido com sucesso.`);
    } catch (error) {
      console.error(`Erro ao remover valor para a chave "${key}":`, error);
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
      console.log('Todos os valores foram removidos com sucesso.');
    } catch (error) {
      console.error('Erro ao limpar o armazenamento:', error);
    }
  }
}

export default StorageService;
