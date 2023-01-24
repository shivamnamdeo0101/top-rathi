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
  const education = useSelector(state => state?.EducationSlice);



  const dispatch = useDispatch();
  const [fromState, setfromState] = useState({})
  const [error, seterror] = useState("")
  const Next = () => {

    if (!fromState?.label) {
      seterror("Please select the value")
      return
    }

    delete fromState?.image;
    

    try {
      
      dispatch(setFromWhere(fromState))
      if (fromState?.value == "school") {
        navigation.navigate("SchoolStartup")
      }
      if (fromState?.value == "college") {
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

        <View style={{ padding: 20, paddingTop: 0 }}>
          <Text style={styles.heading_text}>Are you a college student or school student ?</Text>
          <Text style={{ fontFamily: "OpenSans-Regular", color: "#637994" }} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

        </View>

        <CustomSelectTap

          list={[{ indexId: 2, value: "college",label: "College", image: "https://ik.imagekit.io/lajz2ta7n/FROM_WHERE/college.png" },
          { indexId: 1,  value: "school",label: "School", image: "https://ik.imagekit.io/lajz2ta7n/FROM_WHERE/school.png" }]}
          setValue={setfromState}
          value={fromState}
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
    fontSize: 18,
    color: "#15295c",
    fontFamily: "OpenSans-SemiBold",

  }
});