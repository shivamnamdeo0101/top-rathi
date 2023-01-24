import { View, Text, StyleSheet, ScrollView ,Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SCH_API } from '../service/apis/SchService'
import { useDispatch, useSelector } from 'react-redux'
import { setSchList , setSchDone} from '../store/NewsSlice'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SchlorshipScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const schList = useSelector((state)=>state.NewsSlice.schlorship)
    const education = useSelector(state => state?.EducationSlice)

    const schDone = useSelector(state=>state?.NewsSlice?.schFilterDone)
    const schObj = useSelector(state => state?.SchFilterListSlice?.schObj)
    const user = useSelector(state => state.userAuth.profile)


    useEffect(() => {
        if(!schDone){
            navigation.navigate("SchFilter")
        }
    }, [])
    


    const payload = {
        "annualIncome":schObj?.annualIncome && schObj?.annualIncome[0],
        "authority": schObj?.authority?.indexId,
        "educationType": user?.education?.college?.college_type?.indexId,
        "caste": schObj?.caste?.indexId,
        "fromWhere": education?.fromwhere?.indexId,
        "domicileState": schObj?.domicileState?.indexId,
        "lastExam": schObj?.lastExam?.indexId,
        "lastExmPercentage": schObj?.lastExmPercentage && schObj?.lastExmPercentage[0],
        "age": schObj?.age && schObj?.age[0]
    }


    console.log("Post Payload",payload)
    useEffect(() => {
        const fetchData = async () => {
            await SCH_API.SchFetch(payload).then((res) => {
                dispatch(setSchList(res?.data?.data))
            })
        }
        fetchData()
    }, [])

    
    const toogleModal = ()=>{
        dispatch(setSchDone(!schDone))
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                   
                    <Text style={{ fontSize: 22, fontFamily: "OpenSans-SemiBold", color: "#f5aa42", textTransform: "capitalize" }}>Schlorship</Text>

                </View>
                <MaterialCommunityIcons onPress={()=>toogleModal()} name="book-edit-outline" color="#f5aa42" size={28}  />

            </View>

            

            <View style={{flex:2}}>
                <ScrollView>
                    {
                        schList?.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={()=>navigation.navigate("SchDetails",{id:item?._id})} key={index} style={{margin:10,backgroundColor:"#e8e8e8",borderRadius:14}}>
                                    <Image source={{ uri: 'https://i.ytimg.com/vi/cASlIybYBqU/maxresdefault.jpg' }} style={{borderTopLeftRadius:10,borderTopRightRadius:10, width:'100%', height: 200 }} />
                                    <View style={{padding:14}}>
                                        <Text style={{fontFamily:"OpenSans-SemiBold",color:"#000"}}>{item?.name}</Text>
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