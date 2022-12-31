import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
  profile:{},
  isLoading: false,
  isSuccess: false,
  errMsg: '',
  isFirstTime:true,
  address:{}

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
    setProfileDetaiils: (state, action) => {
      state.profile = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
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
    setFirstTime:(state)=>{
      state.isFirstTime = false;
    } ,
    flushAuthData: (state) => {
     
      state.user= {};
      state.isLoading =  false;
      state.isSuccess = false;
      state.errMsg ='';
      AsyncStorage.clear();
       
    }
    
  },
});
export const { setUserDetails,setAddress, flushAuthData,getAuthFetch,setProfileDetaiils, setLoadingUser ,getAuthSuccess ,registerAuthUser,getAuthFailure,setFirstTime} = UserSlice.actions;

export default UserSlice.reducer;