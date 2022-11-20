import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React ,{useState,useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthData, setProfileDetaiils } from '../store/UserSlice';
import { API } from '../service/apis/UserService';


export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user.user)
  const [profile, setprofile] = useState(user)
  const education = useSelector(state => state.EducationSlice)
  useEffect(() => {
     API.userFetch({userId:user._id})
    .then(res=>{
        setprofile(res.data.data)
        dispatch(setProfileDetaiils(res.data.data))
    })
  }, [profile])
    

  const logout = () => {
    
    Alert.alert(
      "Are you sure to logout..?",
      "Press ok to logout",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  dispatch(flushAuthData()) }
      ]
    );
   
  }
  
  return (

    
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.header}>
            <Ionicons name="arrow-back" color="#000" size={25} onPress={() => navigation.navigate("News")} />
            <MaterialIcons name="logout" color="#f03" size={25} onPress={() => logout()} />
          </View>
          

          <ScrollView>
          <View style={{margin:8}}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://d.newsweek.com/en/full/1962972/spacex-owner-tesla-ceo-elon-musk.jpg',
            }} />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Update Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={styles.text}>Update Profile</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.bottom_view}>
          <Text style={styles.main_heading}>Personal Details</Text>
          <View style={styles.bottom_view_comp}>
            <View>
              <Text style={styles.heading}>Full Name</Text>
              <Text style={styles.text}>{profile?.username}</Text>
            </View>
          </View>

          <View style={styles.bottom_view_comp}>
            <View>
              <Text style={styles.heading}>Email</Text>
              <Text style={styles.text}>{profile?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom_view}>
          <Text style={styles.main_heading}>Education Details</Text>
          <View style={styles.bottom_view_comp}>

            <View>
              <Text style={styles.heading}>Class</Text>
              <Text style={styles.text}>{profile?.education?.school?.class_}</Text>
            </View>
          </View>
          <View style={styles.bottom_view_comp}>

            <View>
              <Text style={styles.heading}>Stream</Text>
              <Text style={styles.text}>{profile?.education?.school?.stream}</Text>
            </View>
          </View>


          <View style={styles.bottom_view_comp}>

            <View>
              <Text style={styles.heading}>College Type</Text>
              <Text style={styles.text}>{profile?.education?.college?.college_type}</Text>
            </View>
          </View>


          <View style={styles.bottom_view_comp}>
            <View>
              <Text style={styles.heading}>Branch</Text>
              <Text style={styles.text}>{profile?.education?.college?.branch}</Text>
            </View>
          </View>
        </View>
          
        </ScrollView>
        </View>

      </View>
   
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",

  },
  top: {
    backgroundColor: "#f2c305",
    flex: 2,
    

  },

  button: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#f0d99c",
    borderRadius: 4,
    padding:8,
    marginBottom:8
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor:"#fff",
    marginBottom:8,
    padding:16
  },
  tinyLogo: {
    marginBottom: 10,
    padding: 14,
    width: 250,
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  bottom_view: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor:"#fff",
    margin: 8
  },
  main_heading: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20
  },
  heading: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20
  },
  text: {
    color: "#666",
    fontWeight: "bold"
  },
  bottom_view_comp: {

    padding: 10,
    paddingLeft: 0,
  }
});