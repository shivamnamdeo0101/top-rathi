import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    news: [],
    slide: [],
    insight: []
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

        flushHomeData: (state) => {
            state.news = [];
            state.slide = [];
            state.insight = []
        }

    },
});
export const { addNews ,addInsight,addSlide,flushHomeData} = NewsSlice.actions;

export default NewsSlice.reducer;