import { View, Text, StyleSheet, Image,ImageBackground, TouchableOpacity, Alert, TouchableHighlight } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { flushAuthData, setProfileDetaiils } from '../store/UserSlice';
import { API } from '../service/apis/UserService';
import CollectionComp from '../components/CollectionComp';

import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import ProfileTabView from '../components/ProfileTabView';


export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user.user)

  const token = useSelector(state=>state.userAuth.user.token)

  const [profile, setprofile] = useState(user)
  const education = useSelector(state => state.EducationSlice)

  const address = useSelector(state => state.userAuth.address)




  const [image, setimage] = useState("");

  const payload = { userId: user._id,token:token }
  useEffect(() => {

    const fetchData = async () => {
      const res = await API.userFetch(payload)
      if (res.data.success) {
        setprofile(res.data.data)
        dispatch(setProfileDetaiils(res.data.data))
      }
    }


    fetchData()

  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.userGetProfileImg(payload)
      if (res.data.success) {
        setimage(res.data.data)
      }
    }

    fetchData()

  }, [image])





  const SelectImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(img => {
      ImgToBase64.getBase64String(img.path)
        .then(base64String => UpdateToServer("data:image/png;base64," + base64String))
        .catch(err => console.log(err));
    })
  }

  const UpdateToServer = async (img) => {
    const payload = {
      "userId": user._id,
      "profile_img": img
    }
    const res = await API.userUpdateProfileImg(payload)
    if (res.data.success) {
      setimage(res.data.data.profile_img)
    }



  }




  return (

    <ImageBackground blurRadius={30} source={{uri:image ? image : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}} style={{ flex:1,height:"100%",width:"100%"}}>
      <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={{ padding: 3, backgroundColor: "#fff", borderRadius: 99, marginRight: 10 }}>
              <Ionicons name="arrow-back" color="#000" size={23} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: "Poppins-Bold", color: "#000" }}>PROFILE</Text>
          </View>
          
      </View>

      <View style={{ flexDirection: "column", justifyContent: "center", padding: 10, alignItems: "center", }}>

        <TouchableOpacity onPress={() => SelectImage()}>
          <View style={{ flexDirection: "column", justifyContent: "center", padding: 10, alignItems: "center", }}>
            <Image

              style={{ height: 130, width: 130, borderRadius: 99 }}
              source={{
                uri: image ? image : "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg",
              }} />
            <Text style={{ fontSize: 10, fontFamily: "Poppins-Regular", color: "#eb9d0c" }}>Change Photo</Text>
          </View>

        </TouchableOpacity>

        {/* <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
          <Text style={{ fontSize: 20, fontFamily: "Poppins-Regular", color: "#000" }}>{profile?.username}</Text>
          <Text style={{ fontSize: 12, fontFamily: "Poppins-Regular", color: "#8888", textAlign: "center" }}>{profile?.email}</Text>
        </View> */}
      </View>
      <ProfileTabView navigation={navigation} user={user} />
    </ImageBackground>



  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",

  },
  top: {
    backgroundColor: "#eb9d0c",
    flex: 2,


  },

  button: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#f0d99c",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 8,
    padding: 12,
    elevation: 4
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
    backgroundColor: "#fff",
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