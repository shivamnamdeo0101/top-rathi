import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image, Alert, ActivityIndicator } from 'react-native'
import React ,{useState,useEffect}from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment'
import { API } from '../service/apis/UserService';
import { useSelector } from 'react-redux';
import LoadingComp from '../components/LoadingComp';

const NotificationScreen = ({ navigation }) => {
    const text = "As you can see from the examples above, it might be a good idea to create a proper random function to use for all random integer purposes.";
    const user = useSelector(state=>state?.userAuth?.user)
    
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(true)

    const payload = {
        "userId":user?.user?._id,
        "token":user?.token
    }

    useEffect(() => {
      const fetchData = async()=>{
        const res = await API.userNotifications(payload)
        if(res?.data?.success === true){
            setlist(res?.data?.data)
            setloading(false)
        }
      }

      fetchData()
      
    
    }, [loading,list])

    if(loading){
        return(
            <LoadingComp />
        )
    }
    
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const incrList= ()=>{
      
    }
   
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Notifications</Text> */}
            {/* <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={{ padding: 3, backgroundColor: "#fff", borderRadius: 99, marginRight: 10 }}>
                        <Ionicons name="arrow-back" color="#000" size={23} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: "OpenSans-Bold", color: "#000" }}>NOTIFICATIONS</Text>
                </View>
            </View> */}

            <View style={{flex:1, margin:10,backgroundColor:"#fff"}}>
                <ScrollView 
                     onScroll={({nativeEvent}) => {
                        if (isCloseToBottom(nativeEvent)) {
                           // incrList()
                        }
                        
                      }}
                    
                showsVerticalScrollIndicator={false}>
                    {
                        list?.map((item, index) => {
                            return (
                                <TouchableOpacity style={{width:"100%", flexDirection:"row", backgroundColor:item?.readStatus? "#f0f3f5" :"#fff", alignItems:"flex-start",padding:6,borderRadius:10, justifyContent:"space-between", borderBottomColor:"#f8f8f8",borderBottomWidth:1}} key={index}>
                                   <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <View style={{width:7,height:7,backgroundColor:item?.readStatus ? "#f5aa42" :"#fff",marginRight:5,borderRadius:33}}>
                                        </View>
                                        <Image source={{uri:item?.image}} style={{width:50,height:50,marginRight:8,borderRadius:3,backgroundColor:"#eee"}}/>

                                   </View>
                                    <Text style={{width:"60%", fontSize: 12, color: "#000", fontFamily: "OpenSans-SemiBold" }}>{item?.text?.length>100? item?.text?.substring(0,100)+"...":item?.text}</Text>
                                    <Text style={{ fontSize: 10,textAlign:"right", color: "#15295c", fontFamily: "OpenSans-SemiBold" }}>{moment(item?.timestamp).fromNow()}</Text>

                                </TouchableOpacity>
                            )
                        })
                    }
                    {list?.length > 8 && <ActivityIndicator size={"small"}/>}
                </ScrollView>
            </View>


        </View>
    )
}

export default NotificationScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff"
    },
    title: {
        fontSize: 18,
        textTransform: "uppercase",
        borderLeftColor: "#f5aa42",
        borderLeftWidth: 2, paddingLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: "OpenSans-SemiBold",
        color: '#15295c',

    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        elevation: 4
    },

});
