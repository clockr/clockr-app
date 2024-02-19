import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authSlice';
import { appApi } from './apis';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { stopwatchReducer } from './slices/stopwatchSlice';

const persistConfig = {
  key: 'clockr',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedStopwatchReducer = persistReducer(
  persistConfig,
  stopwatchReducer,
);

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    auth: persistedAuthReducer,
    stopwatch: persistedStopwatchReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
