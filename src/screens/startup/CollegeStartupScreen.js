import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setBranch, setClass, setCollegeType, setFromWhere, setStream } from '../../store/EducationSlice';
import { setFirstTime } from '../../store/UserSlice';
import CustomInput from '../../components/CustomInput/CustomInput';
import { API } from '../../service/apis/UserService';
import MultiSelectUi from '../../components/MultiSelectUi';

export default function CollegeStartupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [college_type, setcollege_type] = useState("")
  const [error, seterror] = useState("");
  const Next = async data => {
  
    if(!college_type){
      seterror("Please select the option given")
      return
  }

    try {
      
      dispatch(setCollegeType(college_type))
      dispatch(setFirstTime());
     
      navigation.navigate("CollegeBranch")
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  return (
    <View style={styles.container}>

      <View style={{flex:1}}>
        <Text style={styles.heading_text}>SELECT YOUR COLLEGE TYPE</Text>
        <MultiSelectUi 
          error={error}
          seterror={seterror}
          list={[{ id: 0, name: "Diploma" }, { id: 1, name: "Graduation" },{ id: 2, name: "Post Graduation" }]}  setValue={setcollege_type} value={college_type}  />

      </View>
       
      <View style={styles.bottom_view}>
        <CustomButton text="Next" onPress={()=>Next()} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
    padding: 10
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  heading_text: {
    fontSize: 20,
    color:"#000",
    fontWeight: "bold",
    marginBottom:10,
    fontFamily:"Poppins-Bold"
  }
});