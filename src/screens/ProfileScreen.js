import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
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


export default function ProfileScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user.user)
  const [profile, setprofile] = useState(user)
  const education = useSelector(state => state.EducationSlice)

  const [image, setimage] = useState("https://i.imgur.com/UPrs1EWl.jp");

  useEffect(() => {

    API.userFetch({ userId: user._id })
      .then(res => {
        setprofile(res.data.data)
        dispatch(setProfileDetaiils(res.data.data))

      })
  }, [profile])

  useEffect(() => {
      API.userGetProfileImg(user._id).then((res)=>{
        setimage(res.data.data)
      })
  }, [image])
  


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
        { text: "OK", onPress: () => dispatch(flushAuthData()) }
      ]
    );

  }

  const SelectImage = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(img => {
       ImgToBase64.getBase64String(img.path)
        .then(base64String => UpdateToServer("data:image/png;base64,"+base64String))
        .catch(err => console.log(err));
    })
  }

  const UpdateToServer = async (img)=>{
    const payload = {
      "userId":user._id,
      "profile_img":img
    }
    const res = await API.userUpdateProfileImg(payload)
    setimage(res.data.data.profile_img)
  }




  return (


    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" color="#000" size={25} onPress={() => navigation.navigate("News")} />
          <MaterialIcons name="logout" color="#f03" size={25} onPress={() => logout()} />
        </View>


        <ScrollView>

          <View style={{ flexDirection: "row", margin: 8, justifyContent: "space-around", alignItems: "center" }}>
            <Image

              style={{ height: 120, width: 120, borderRadius: 99 }}
              source={{
                uri: image,
              }} />

            <View>
              <Text style={{ fontSize: 25, fontFamily: "Poppins-SemiBold", color: "#fff" }}>{profile?.username}</Text>
              <Text style={{ fontSize: 12, fontFamily: "Poppins-Regular", width: "90%", color: "#f0f3f5" }}>{profile?.email}</Text>
            </View>

          </View>

          <View style={{ margin: 8 }}>
            {/* <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://d.newsweek.com/en/full/1962972/spacex-owner-tesla-ceo-elon-musk.jpg',
            }} /> */}

            <TouchableOpacity style={styles.button} onPress={() => SelectImage()}>
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
            <View style={styles.bottom_view_comp}>
              <View>
                <Text style={styles.heading}>Interest</Text>
                <View style={{ flexDirection: "row", marginBottom: 30, flexWrap: "wrap" }}>
                  {[...profile?.interest].map((item, index) =>
                    <Text key={index} style={{ color: "#666", borderRadius: 8, fontFamily: "Poppins-Bold", marginRight: 5, backgroundColor: "#f0f3f5", padding: 5, marginTop: 5 }}>
                      {item.name}
                    </Text>
                  )}
                </View>
              </View>
            </View>



          </View>
          <View style={styles.bottom_view}>
            <Text style={styles.main_heading}>Your Collection</Text>
            <View style={styles.bottom_view_comp}>
              <CollectionComp navigation={navigation} user={user} />


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
    padding: 16
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