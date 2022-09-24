import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
  isLoading: false,
  isSuccess: false,
  errMsg: '',
  isFirstTime:true,
};
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getAuthFetch:(state,action)=>{
      state.isLoading = true;
      state.user = action.payload;
    },
    getAuthSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errMsg = '';
    },
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    registerAuthUser:(state,action)=>{
        state.isLoading = true;
    },
    setLoadingUser:(state)=>{
      state.isLoading = true;
    },
    getAuthFailure: (state, action) => {
      state.isLoading = false;
      state.errMsg = action?.payload;
    },
    flushAuthData: (state) => {
     
      state.user= {};
      state.isLoading =  false;
      state.isSuccess = false;
      state.errMsg ='';
      AsyncStorage.clear();
       
    },
    setFirstTime:(state)=>{
      state.isFirstTime = false;
    } 
  },
});
export const { setUserDetails, flushAuthData,getAuthFetch, setLoadingUser ,getAuthSuccess ,registerAuthUser,getAuthFailure} = UserSlice.actions;

export default UserSlice.reducer;