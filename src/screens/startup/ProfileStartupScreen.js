import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setFromWhere } from '../../store/EducationSlice';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomSelectTap from '../../components/CustomSelectTap';

export default function ProfileStartupScreen({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const [user, setuser] = useState({});
  const pwd = watch('password');
  const education = useSelector(state => state.EducationSlice);
  const dispatch = useDispatch();
  const [from_state, setfrom_state] = useState("")
  const [error, seterror] = useState("")
  const Next =  () => {

    if(!from_state){
      seterror("Please select the value")
      return
    }
    console.log(from_state)
    try {
      dispatch(setFromWhere(from_state))
      console.log(JSON.stringify(education));
      if (from_state == "school") {
        navigation.navigate("SchoolStartup")
      }
      if (from_state == "college") {
        navigation.navigate("CollegeStartup")
      }
      seterror("")
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_view}>

        <Text style={styles.heading_text}>ARE YOU FROM SCHOOL / COLLEGE ?</Text>

        <CustomSelectTap 
          list={[{ id: 0, name: "college",image:"https://ik.imagekit.io/lajz2ta7n/FROM_WHERE/college.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672397794520" },
           { id: 1, name: "school" ,image:"https://ik.imagekit.io/lajz2ta7n/FROM_WHERE/school.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672397813359"}]}
          setValue={setfrom_state}
          value={from_state}
          error={error}
          seterror={seterror}
        />
        
        
      </View>

      <View style={styles.bottom_view}>
        <CustomButton text="NEXT" onPress={handleSubmit(Next)} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
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
    textAlign:"center",
    marginBottom:20
  }
});