import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    news: [],
    slide: [],
    insight: [],
    collection:[],
    schlorship:[],
    schFilter:{},
    schFilterDone:false
    
};
export const NewsSlice = createSlice({
    name: 'news',
    initialState: initialState,
    reducers: {
        addNews: (state, action) => {
            state.news = action.payload;
        },
        addSlide: (state, action) => {
            state.slide = action.payload;
        },
        addInsight:(state,action)=>{
            state.insight = action.payload;
        },
        setCollection:(state,action)=>{
            state.collection = action.payload;
        },
        setSchList:(state,action)=>{
            state.schlorship = action.payload;
        },
        setSchFilter:(state,action)=>{
            state.schFilter = action.payload;
        },
        setSchDone:(state,action)=>{
            state.schFilterDone  = action.payload;
        },
        flushHomeData: (state) => {
            state.news = [];
            state.slide = [];
            state.insight = [];
            state.collection = [];
            state.schFilter = {};
            state.schlorship = [];
            state.schFilterDone = false
        }

    },
});
export const { addNews ,addInsight,addSlide,setSchFilter,setSchList, setSchDone,flushHomeData,setCollection} = NewsSlice.actions;

export default NewsSlice.reducer;