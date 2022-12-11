import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { useDispatch, useSelector } from 'react-redux'
import { flushAuthData } from '../store/UserSlice';

const SettingScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.userAuth.profile)

  const logoutUser = () => {
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


  return (
    <View style={{ flex: 1, backgroundColor: "#f0f3f5" }}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity style={{ padding: 3, backgroundColor: "#fff", borderRadius: 99, marginRight: 10 }}>
            <Ionicons name="arrow-back" color="#000" size={23} onPress={() => navigation.goBack()} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontFamily: "Poppins-Bold", color: "#000" }}>SETTING</Text>
        </View>
      </View>

      <View style={{marginTop:5}}>


        <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")} style={{ flexDirection: "row", alignItems: "center", borderBottomWidth:1,borderBottomColor:"#f0f3f5", backgroundColor: "#fff", padding: 10 }}>
          <MaterialIcons name="mode-edit" color="#000" size={23} style={{ backgroundColor: "#f0f3f5", borderRadius: 10, padding: 10 }} />
          <View style={{  marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins-Bold", color: "#000", fontSize: 16 }}>EDIT PROFILE</Text>
            <Text style={{ fontFamily: "Poppins-Regular", color: "#000", fontSize: 11 }}>Update Your Account Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", borderBottomWidth:1,borderBottomColor:"#f0f3f5", backgroundColor: "#fff", padding: 10 }}>
          <MaterialCommunityIcons name="contacts-outline" color="#000" size={23} style={{ backgroundColor: "#f0f3f5", borderRadius: 10, padding: 10 }} />
          <View style={{marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins-Bold", color: "#000", fontSize: 16 }}>HELP & SUPPORT</Text>
            <Text style={{ fontFamily: "Poppins-Regular", color: "#555", fontSize: 11 }}>FAQ's, Contact Support</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", borderBottomWidth:1,borderBottomColor:"#f0f3f5", backgroundColor: "#fff", padding: 10 }}>
          <MaterialIcons name="info-outline" color="#000" size={23} style={{ backgroundColor: "#f0f3f5", borderRadius: 10, padding: 10 }} />
          <View style={{marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins-Bold", color: "#000", fontSize: 16 }}>ABOUT US</Text>
            <Text style={{ fontFamily: "Poppins-Regular", color: "#555", fontSize: 11 }}>Know more about us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>logoutUser()}style={{ flexDirection: "row", alignItems: "center", borderBottomWidth:1,borderBottomColor:"#f0f3f5", backgroundColor: "#fff", padding: 10 }}>
          <MaterialIcons name="logout" color="#f03" size={23} style={{ backgroundColor: "#f0f3f5", borderRadius: 10, padding: 10 }} />
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
            <Text style={{ fontFamily: "Poppins-Bold", color: "#f03", fontSize: 16 }}>LOGOUT</Text>
          </View>
        </TouchableOpacity>




      </View>

    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    elevation: 4
  },

});