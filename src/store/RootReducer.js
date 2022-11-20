import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import UserSlice from "./UserSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EducationSlice from "./EducationSlice";

const rootReducer = combineReducers({
  userAuth: UserSlice,
  EducationSlice:EducationSlice
});

const persistConfig = {
  key: "root",
  storage:AsyncStorage,
  whitelist: ["userAuth","EducationSlice"],
  timeout: null
  
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
