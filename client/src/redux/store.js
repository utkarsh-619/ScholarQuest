import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import userSlice from './userSlice';
import teacherSlice from './teacherSlice'

const userPersistConfig = {
  key: 'userinfo', 
  storage,         
};
const teacherPersistConfig = {
  key: 'teacherinfo',
  storage,
}

const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedTeacherReducer = persistReducer(teacherPersistConfig, teacherSlice);

const store = configureStore({
  reducer: {
    userinfo: persistedUserReducer,
    teacherinfo: persistedTeacherReducer
  },
});

export const persistor = persistStore(store);

export default store;
