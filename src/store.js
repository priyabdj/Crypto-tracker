import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './slices/cryptoSlice';

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});