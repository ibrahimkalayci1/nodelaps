import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import financialReducer from './slices/financialSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    financial: financialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
