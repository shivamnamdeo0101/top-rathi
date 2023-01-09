import { View, Text, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NEWS_API } from '../service/apis/NewsService'
import * as Progress from 'react-native-progress';


export default function PollComp({ navigation, user, post }) {

    const [userResponse, setuserResponse] = useState({});
    const [responses, setresponses] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await NEWS_API.GetPoll(post._id)
                let temp = {};
                if (res.data.success) {
                    setresponses(res?.data?.data)
                    res?.data?.data.forEach((e) => {
                        if (e.userId.includes(user._id)) {
                            temp = e;
                        }
                    })
                    if (temp) {
                        setuserResponse(temp)
                    }
                }
            }

            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [userResponse])


    const addPoll = async (msg) => {
        const payload = {
            "userId": user._id,
            "postId": post._id,
            "msg": msg
        }
        try {
            await NEWS_API.AddPoll(payload)
                .then((res) => {
                    let temp = {};
                    if (res.data.success) {
                        res?.data?.data.forEach((e) => {
                            if (e.userId.includes(user._id)) {
                                temp = e;
                            }
                        })
                        if (temp) {
                            setuserResponse(temp)
                        }
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    const remPoll = async () => {
        const payload = {
            "userId": user._id,
            "postId": post._id,
        }
        try {
            await NEWS_API.RemPoll(payload)
                .then((res) => {
                    let temp = {};
                    if (res.data.success) {
                        setuserResponse({})
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }


    const getPercentage = () => {

        if (responses.length <= 0) {
            return {
                "yes": 0,
                "no": 0
            }
        }

        const yes = countArr("Yes");
        const no = countArr("No");

        const per = parseInt(Math.ceil((yes / responses.length) * 100));

        return {
            "yes": per,
            "no": 100 - per
        }


    }

    const countArr = (msg) => {
        if (responses.length > 0) {
            return responses.filter((currentItem) => currentItem.msg == msg).length;
        }
    };


    const Undo = () => {

        Alert.alert(
            "Are you sure to undo this poll..?",
            "Press ok to undo",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => remPoll() }
            ]
        );

    }

    return (
        <View style={{marginBottom:10}}>
            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "bold", color: "#fff", fontSize: 12, textAlign: "center" ,backgroundColor:"#000",width:100,borderTopLeftRadius:10,borderTopRightRadius:10,padding:4}}>POLL</Text>
            <ImageBackground
                source={{ uri: post.image }}
                borderBottomLeftRadius={10}
                borderBottomRightRadius={10}
                borderTopRightRadius={10}
                blurRadius={90} style={{ alignItems: "center", backgroundColor: "#f0f3f5", padding: 0, }}>




                <View style={{ display: "flex", flexDirection: "row",  marginBottom: 10,marginTop:10 }}>
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "bold", fontSize: 12, color: "#f0f3f5" }}>
                        {post.poll_title}</Text>
                </View>
                
                <Progress.Bar  strokeCap="square"progress={(getPercentage()["yes"]/100)} width={200} height={10} color={"#2e81f5"} />

                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" ,marginTop:10,marginBottom:10}}>

                    <TouchableOpacity onPress={() => userResponse?.msg ? Undo() : addPoll("Yes")} style={{  paddingLeft: 16, paddingRight: 16, padding: 5 }}>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "200", fontSize: 14, color: userResponse.msg == "Yes" ? "#2e81f5" : "#ccc",}}>Yes {getPercentage()["yes"]} %</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => userResponse?.msg ? Undo() : addPoll("No")} style={{  paddingLeft: 16, paddingRight: 16, padding: 5 }}>
                        <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "200", fontSize: 14, color: userResponse.msg == "No" ? "#2e81f5" : "#ccc",}}>No {getPercentage()["no"]} %</Text>
                    </TouchableOpacity>

                </View>

            </ImageBackground>

            
        </View>
    )
}