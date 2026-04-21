import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * AsyncStorage wrapper for secure local data storage
 */

const LANGUAGE_KEY = '@nikat_language';
const USER_KEY = '@nikat_user';
const AUTH_TOKEN_KEY = '@nikat_auth_token';

export const StorageManager = {
  async getLanguage() {
    try {
      const language = await AsyncStorage.getItem(LANGUAGE_KEY);
      return language || 'en';
    } catch (error) {
      console.error('Error reading language:', error);
      return 'en';
    }
  },

  async setLanguage(language) {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },

  async getUser() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading user:', error);
      return null;
    }
  },

  async setUser(user) {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  async clearUser() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error clearing user:', error);
    }
  },

  async getAuthToken() {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error reading auth token:', error);
      return null;
    }
  },

  async setAuthToken(token) {
    try {
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving auth token:', error);
    }
  },

  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
