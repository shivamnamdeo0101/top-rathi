import { View, Text,TouchableOpacity, Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import { NEWS_API } from '../service/apis/NewsService'

export default function PollComp({ navigation, user, post }) {

    const [userResponse, setuserResponse] = useState({});
    const [responses, setresponses] = useState([]);

    useEffect(() => {
        try {
           const fetchData = async()=>{
            const res = await NEWS_API.GetPoll(post._id)
            let temp = {};
            if(res.data.success){
                setresponses(res?.data?.data)
                res?.data?.data.forEach((e)=>{
                    if(e.userId.includes(user._id)){
                        temp = e;
                    }
                })
                if(temp){
                    setuserResponse(temp)
                }
            }
           }

           fetchData();
        } catch (error) {
            console.log(error)
        }
    }, [userResponse])
    

    const addPoll = async (msg)=>{
        const payload = {
            "userId": user._id,
            "postId":post._id,
            "msg": msg
        }
        try {
            await NEWS_API.AddPoll(payload)
            .then((res)=>{
                let temp = {};
                if(res.data.success){
                    res?.data?.data.forEach((e)=>{
                        if(e.userId.includes(user._id)){
                            temp = e;
                        }
                    })
                    if(temp){
                        setuserResponse(temp)
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }    
    const remPoll = async ()=>{
        const payload = {
            "userId": user._id,
            "postId":post._id,
        }
        try {
            await NEWS_API.RemPoll(payload)
            .then((res)=>{
                let temp = {};
                if(res.data.success){
                    setuserResponse({})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }    


    const getPercentage =  ()=>{

        if(responses.length <= 0){
            return {
                "yes":0,
                "no":0
            }
        }

        const yes = countArr("Yes");
        const no = countArr("No");

        const per = parseInt(Math.ceil((yes / responses.length) * 100));

        return {
            "yes":per,
            "no":100 -per
        }


    }

    const countArr = (msg) => {
        if(responses.length > 0){
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
            { text: "OK", onPress: () =>  remPoll() }
          ]
        );
       
      }

    return (
        <View style={{ alignItems: "center" ,backgroundColor:"#f0f3f5",padding:2}}>
                

            <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "200", color: "#f03",fontSize:20 }}>POLL</Text>

            <View style={{ display: "flex", flexDirection: "row", marginBottom: 20 }}>
                <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "100",fontSize:16,color:"#000"  }}>
                    {post.poll_title}</Text>
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

                <TouchableOpacity onPress={()=> userResponse?.msg ? Undo() : addPoll("Yes") }style={{backgroundColor:userResponse.msg =="Yes" ? "green" : "#ccc",paddingLeft:16,paddingRight:16, padding:8}}>
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "200",fontSize:20,color:"#fff" }}>Yes {getPercentage()["yes"]} %</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> userResponse?.msg ? Undo() : addPoll("No") } style={{backgroundColor:userResponse.msg =="No" ? "green" : "#ccc",paddingLeft:16,paddingRight:16, padding:8}}>
                    <Text style={{ fontFamily: "Poppins-Regular", fontWeight: "200" ,fontSize:20,color:"#fff" }}>No {getPercentage()["no"]} %</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}