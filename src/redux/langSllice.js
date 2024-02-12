// languageSlice.js
import { createSlice } from '@reduxjs/toolkit';
 
const en =JSON.stringify(require('../../en.json'))
export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
    translatedText:en // Set the default language here
  },
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    settranslatedText:(state,action)=>{
      state.currentLanguage = action.payload;
    }
  },
});
 
export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state) => state.language.currentLanguage;
 
export default languageSlice.reducer;