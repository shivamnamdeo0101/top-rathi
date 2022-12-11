import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setFromWhere } from '../../store/EducationSlice';
import CustomInput from '../../components/CustomInput/CustomInput';

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

        <Text style={styles.heading_text}>Are you from school/college ...?</Text>

        
        <CustomSelect
          name="from where"
          control={control}
          list={[{ id: 0, name: "college" }, { id: 1, name: "school" }]}
          placeholder="From Where School Or College"
          setValue={setfrom_state}
          value={from_state}
          rules={{
            required: 'Stream is required',
          }}
          editable={false}
          error={error}
        />
      </View>

      <View style={styles.bottom_view}>
        <CustomButton text="Next" onPress={handleSubmit(Next)} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
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

    fontWeight: "bold"
  }
});