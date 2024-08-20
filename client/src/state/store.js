import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice';

const store = configureStore({
  reducer: {
    netflix: appReducer
  }
});

export default store;
