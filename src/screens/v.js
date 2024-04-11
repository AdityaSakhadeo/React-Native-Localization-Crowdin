import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import * as RNLocalize from 'react-native-localize';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, selectTranslateText, setLanguage, setTranslateText } from './LanguageSlice';
import { getTranslations,setTranslations } from './common/TranslationUtil';
 
 
const FirstPage = () => {
  const dispatch = useDispatch();
  const lang = useSelector(selectLanguage);
  const oriText = useSelector(selectTranslateText);
 
  useEffect(() => {
    const fetchTranslations = async () => {
      const cachedTranslations = await getTranslations();
 
      if (cachedTranslations[lang]) {
        // Use cached translations
        dispatch(setTranslateText(cachedTranslations[lang]));
      } else {
        // Fetch translations from API
        const translations = await translateText();
        // Update cache with new translations
        cachedTranslations[lang] = translations;
        await setTranslations(cachedTranslations);
      }
    };
 
 
 
    const clearCacheAndFetchTranslations = async () => {
      // Get the current translations from the cache
      const cachedTranslations = await getTranslations();
   
      // Check if there is a translation available for the new language
      if (cachedTranslations[lang]) {
        // Use the existing translation
        dispatch(setTranslateText(cachedTranslations[lang]));
      } else {
        // If there is no existing translation, fetch translations for the new language
        const translations = await translateText();
        // Update cache with new translations
        cachedTranslations[lang] = translations;
        await setTranslations(cachedTranslations);
   
        // Update the state with the new translations
        dispatch(setTranslateText(translations));
      }
    };
 
    const locales = RNLocalize.getLocales();
    const preferredLanguage = locales[0].languageCode || 'en';
    console.log('Before Language Set:', lang);
    dispatch(setLanguage(preferredLanguage));
    console.log('after Language set:', preferredLanguage);
    fetchTranslations();
    clearCacheAndFetchTranslations();
 
  }, [dispatch, lang]);
 
  const translateText = async () => {
    const options = {
      method: 'POST',
      url: 'https://google-translation-unlimited.p.rapidapi.com/translate_json',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4ec4bde91cmsh4ff8996210f10bdp131da0jsnbd6f9792eae1',
        'X-RapidAPI-Host': 'google-translation-unlimited.p.rapidapi.com'
      },
      data: {
        json_code: JSON.stringify(oriText),
        to_lang: lang
      }
    };
 
    try {
      const response = await axios.request(options);
      console.log(response.data);
      dispatch(setTranslateText(response.data.json_traduit));
      return response.data.json_traduit;
    } catch (error) {
      console.error(error);
      return '';
    }
  };
 
  return (
    <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('./assets/pune.jpg')} style={styles.img} />
        <Text style={{ width: 300, marginTop: 100, fontSize: 24, color: 'black', fontWeight: 'bold' }}>{oriText.citydescription}</Text>
      </View>
    </ScrollView>
  );
};
 
export default FirstPage;
 
const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 400,
  }
});


import { createSlice } from '@reduxjs/toolkit';

const en = require('./en.json');
export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
    translateText:en // Set the default language here
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setTranslateText: (state, action) => {
      state.translateText = action.payload;
    },
  },
});

export const { setLanguage,setTranslateText } = languageSlice.actions;
export const selectLanguage = (state) => state.language.currentLanguage;
export const selectTranslateText = (state) => state.language.translateText;

export default languageSlice.reducer;