import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCH_API } from '../service/apis/SchService'
import { useDispatch, useSelector } from 'react-redux'
import { setSchList, setSchDone } from '../store/NewsSlice'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingComp from '../components/LoadingComp'

const SchlorshipScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const schList = useSelector((state) => state.NewsSlice.schlorship)
    const education = useSelector(state => state?.EducationSlice)

    const schDone = useSelector(state => state?.NewsSlice?.schFilterDone)
    const schObj = useSelector(state => state?.SchFilterListSlice?.schObj)
    const user = useSelector(state => state.userAuth.profile)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        if (!schDone) {
            navigation.navigate("SchFilter")
        }
    }, [])



    const schoolPayload = {
        "annualIncome": schObj?.annualIncome?.indexId,
        "educationType": user?.education?.college?.college_type?.indexId,
        "caste": schObj?.caste?.indexId,

        "fromWhere": education?.fromwhere?.indexId,
        "region": schObj?.region?.indexId,
        "gender": schObj?.gender?.indexId,

        "currClass": schObj?.currClass?.indexId,
        "lastClassExamPercent": schObj?.lastClassExamPercent ? schObj?.lastClassExamPercent[0] : null,
        "stream": schObj?.stream?.indexId


    }

    const collegePayload = {
        "annualIncome": schObj?.annualIncome?.indexId,
        "educationType": user?.education?.college?.college_type?.indexId,
        "caste": schObj?.caste?.indexId,

        "fromWhere": education?.fromwhere?.indexId,
        "region": schObj?.region?.indexId,
        "gender": schObj?.gender?.indexId,


        "xPercent": schObj?.xPercent ? schObj?.xPercent[0] : null,
        "xIIPercent": schObj?.xIIPercent ? schObj?.xIIPercent[0] : null,
        "degreeName": schObj?.degreeName?.indexId,

        "compExam": schObj?.compExam?.indexId,
        "compExamRank": parseInt(schObj?.compExamRank),
        "lastYearCollegePercent": schObj?.lastYearCollegePercent ? schObj?.lastYearCollegePercent[0] : null,
        "branch": schObj?.branch?.indexId

    }


    console.log(collegePayload)

    useEffect(() => {
        const fetchData = async () => {
            const p = education?.fromwhere?.value === "college" ? collegePayload : schoolPayload;
            await SCH_API.SchFetch(p).then((res) => {
                dispatch(setSchList(res?.data?.data))
                setloading(false)
            })
        }
        fetchData()
    }, [])


    const toogleModal = () => {
        dispatch(setSchDone(!schDone))
    }

    // if(loading){
    //     return(
    //         <LoadingComp />
    //     )
    // }

    if (schList?.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                        <Text style={{ fontSize: 22, fontFamily: "OpenSans-SemiBold", color: "#f5aa42", textTransform: "capitalize" }}>Schlorship</Text>

                    </View>
                    <MaterialCommunityIcons onPress={() => toogleModal()} name="book-edit-outline" color="#f5aa42" size={28} />

                </View>
                <Image style={{ flex: 1, height: "100%", width: "100%" }} source={require("../assets/sch.png")} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>

                    <Text style={{ fontSize: 22, fontFamily: "OpenSans-SemiBold", color: "#f5aa42", textTransform: "capitalize" }}>Schlorship</Text>

                </View>
                <MaterialCommunityIcons onPress={() => toogleModal()} name="book-edit-outline" color="#f5aa42" size={28} />

            </View>



            <View style={{ flex: 2 }}>
                <ScrollView>
                    {
                        schList?.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate("SchDetails", { id: item?._id })} key={index} style={{ margin: 10, backgroundColor: "#e8e8e8", borderRadius: 14 }}>
                                    <Image source={{ uri: 'https://i.ytimg.com/vi/cASlIybYBqU/maxresdefault.jpg' }} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%', height: 200 }} />
                                    <View style={{ padding: 14 }}>
                                        <Text style={{ fontFamily: "OpenSans-SemiBold", color: "#000" }}>{item?.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>


            </View>

        </View>
    )
}

export default SchlorshipScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        paddingLeft: 20
    },

});