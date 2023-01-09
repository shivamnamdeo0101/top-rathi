import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  user: {},
  profile:{},
  isLoading: false,
  isSuccess: false,
  errMsg: '',
  isFirstTime:true,
  isProfileDone:false,
  address:{},
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

    setProfileDone: (state) => {
      state.isProfileDone = true;
    },


    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    setProfileDetaiils: (state, action) => {
      state.profile = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      state.isProfileDone = true;
    },
    

    registerAuthUser:(state,action)=>{
        state.isLoading = true;
    },

    setLoadingUser:(state,action)=>{
      state.isLoading = action.payload;
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
export const { setUserDetails,setAddress, setProfileDone,flushAuthData,getAuthFetch,setProfileDetaiils, setLoadingUser ,getAuthSuccess ,registerAuthUser,getAuthFailure,setFirstTime} = UserSlice.actions;

export default UserSlice.reducer;