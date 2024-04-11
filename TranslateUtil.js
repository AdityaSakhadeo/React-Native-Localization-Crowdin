import AsyncStorage from '@react-native-async-storage/async-storage';
 
const TRANSLATION_KEY = 'app_translations';
 
export const getTranslations = async () => {
  try {
    const translations = await AsyncStorage.getItem(TRANSLATION_KEY);
    console.log(">>>>>>>>>>>>Translations>>>>>>>>>>>",translations)
    return translations ? JSON.parse(translations) : {};
  } catch (error) {
    console.error('Error getting translations from AsyncStorage:', error);
    return {};
  }
};
 
export const setTranslations = async (translations) => {
  try {
    await AsyncStorage.setItem(TRANSLATION_KEY, JSON.stringify(translations));
  } catch (error) {
    console.error('Error setting translations in AsyncStorage:', error);
  }
};
 
export const clearTranslations = async () => {
  try {
    await AsyncStorage.removeItem(TRANSLATION_KEY);
  } catch (error) {
    console.error('Error clearing translations from AsyncStorage:', error);
  }
};
 