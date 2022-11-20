import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  class_:"",
  stream:"",
  branch:"",
  college_type:"",
  formWhere:"",
  isLoading: false,
  isSuccess: false,
  errMsg: '',
  isFirstTime:true,
};
export const EducationSlice = createSlice({
  name: 'education',
  initialState: initialState,
  reducers: {
    
    setFromWhere:(state,action)=>{
        state.formWhere = action.payload
    },
    setClass:(state,action)=>{
        state.class_ = action.payload
    },
    setStream:(state,action)=>{
        state.stream = action.payload
    },
    setBranch:(state,action)=>{
      state.branch = action.payload
    },
    setCollegeType:(state,action)=>{
      state.college_type = action.payload
    },


    setEducationSuccess: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.errMsg = '';
    },
    setEducationDetails: (state, action) => {
        state.isLoading = true;
        state.user = action.payload;
    },
    flushEduData: (state) => {
     state = initialState;
      AsyncStorage.clear();
    },
   
  },
});
export const { setEducationDetails,setCollegeType,setBranch, flushEduData,setEducationSuccess,setFromWhere,setClass,setStream} = EducationSlice.actions;

export default EducationSlice.reducer;