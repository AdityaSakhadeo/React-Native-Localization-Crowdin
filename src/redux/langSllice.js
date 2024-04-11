import { createSlice } from '@reduxjs/toolkit';
 
const en = require('../../en.json');
export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
    translateText: en // Set the default language here
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    setTranslateText: (state, action) => {
      state.translateText = action.payload; // Update translateText property
    }
  },
});
 
export const { setLanguage, setTranslateText } = languageSlice.actions; 
export const selectLanguage = (state) => state.language.currentLanguage;
export const selectTranslateText = (state) => state.language.translateText;
 
export default languageSlice.reducer;

