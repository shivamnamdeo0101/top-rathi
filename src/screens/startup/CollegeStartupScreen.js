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
import SelectGrid from '../../components/SelectGrid';

export default function CollegeStartupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [college_type, setcollege_type] = useState({})

  const sch = useSelector(state=>state?.SchFilterListSlice);

  const [error, seterror] = useState("");
  const Next = async data => {

    if (!college_type?.label) {
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

      <View style={{ flex: 1 }}>
        <View style={{ padding: 20, paddingTop: 0 }}>
          <Text style={styles.heading_text}>Choose the college type which you are currently pursuing .</Text>
          <Text style={{ fontFamily: "OpenSans-Regular", color: "#637994" }} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

        </View>
        <SelectGrid
          error={error}
          seterror={seterror}
          list={sch?.educationType} setValue={setcollege_type} value={college_type} />

      </View>

      <View style={styles.bottom_view}>
        <CustomButton text="Next" onPress={() => Next()} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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