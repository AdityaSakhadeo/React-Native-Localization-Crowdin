import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './langSllice';

export const store = configureStore({
    reducer: {
      language: languageReducer,
    },
  });