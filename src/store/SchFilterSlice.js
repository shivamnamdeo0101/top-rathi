import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    fromWhere: [],
    educationType: [],
    caste: [],
    authority: [],
    region: [],
    interest: [],
    branch: [],
    stream: [],
    examlist: [],
    annualIncomeList: [],
    degreeNameList: [],
    lastExam: {},
    schObj:{}



};
export const SchFilterSlice = createSlice({
    name: 'sch',
    initialState: initialState,
    reducers: {

        setFromWhere: (state, action) => {
            state.fromWhere = action.payload;
        },
        setEducationType: (state, action) => {
            state.educationType = action.payload;
        },
        setCaste: (state, action) => {
            state.caste = action.payload;
        },
        setAuthority: (state, action) => {
            state.authority = action.payload;
        },
        setRegion: (state, action) => {
            state.region = action.payload;
        },
        setExamList: (state, action) => {
            state.examlist = action.payload;
        },
        setInterestList: (state, action) => {
            state.interest = action.payload;
        },
        setBranchList: (state, action) => {
            state.branch = action.payload;
        },
        setStreamList: (state, action) => {
            state.stream = action.payload;
        },
        setAnnualIncomeList: (state, action) => {
            state.annualIncomeList = action.payload;
        },
        setDegreeNameList: (state, action) => {
            state.degreeNameList = action.payload;
        },
        setSchObj: (state, action) => {
            state.schObj = action.payload;
        },

        flushAuthData: (state) => {
            localStorage.clear();
            return initialState;
        },
    },
});
export const { setFromWhere, setEducationType,setDegreeNameList, setAnnualIncomeList,setCaste, setAuthority, setRegion, setExamList, setInterestList,setSchObj, setBranchList, setStreamList } = SchFilterSlice.actions;

export default SchFilterSlice.reducer;