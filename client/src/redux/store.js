import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage by default
import userSlice from './userSlice';

// Configure persistence settings
const persistConfig = {
  key: 'userinfo', // Key for local storage
  storage,         // Storage type
};

// Apply the persist reducer to your user slice
const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    userinfo: persistedReducer, // Use persisted reducer for userinfo
  },
});

// Create the persistor object
export const persistor = persistStore(store);

export default store;
