import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import { SCH_API } from '../service/apis/SchService'
import { setAnnualIncomeList, setAuthority, setBranchList, setCaste, setDegreeNameList, setEducationType, setExamList, setFromWhere, setInterestList, setRegion, setStreamList } from '../store/SchFilterSlice'
import { setStream } from '../store/EducationSlice'
import { useDispatch } from 'react-redux'

const ReduxSetup = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchData = async () => {

            await SCH_API.getSchFilter("fromwhere").then((res) => {
                dispatch(setFromWhere(res?.data?.data))
            })
            await SCH_API.getSchFilter("educationtype").then((res) => {
                dispatch(setEducationType(res?.data?.data))
            })
            await SCH_API.getSchFilter("authority").then((res) => {
                dispatch(setAuthority(res?.data?.data))
            })
            await SCH_API.getSchFilter("caste").then((res) => {
                dispatch(setCaste(res?.data?.data))
            })
            await SCH_API.getSchFilter("region").then((res) => {
                dispatch(setRegion(res?.data?.data))
            })
            await SCH_API.getSchFilter("examlist").then((res) => {
                dispatch(setExamList(res?.data?.data))
            })
            await SCH_API.getSchFilter("stream").then((res) => {
                dispatch(setStreamList(res?.data?.data))
            })
            await SCH_API.getSchFilter("branch").then((res) => {
                dispatch(setBranchList(res?.data?.data))
            })
            await SCH_API.getSchFilter("interest").then((res) => {
                dispatch(setInterestList(res?.data?.data))
            })
            await SCH_API.getSchFilter("annualincome").then((res) => {
                dispatch(setAnnualIncomeList(res?.data?.data))
            })
            await SCH_API.getSchFilter("degreename").then((res) => {
                dispatch(setDegreeNameList(res?.data?.data))
            })

            
        }

        fetchData()
    }, [])

    return (
        <View>
        </View>
    )
}

export default ReduxSetup