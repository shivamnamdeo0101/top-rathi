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

export default function CollegeStartupScreen({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const userauth = useSelector(state=>state.userAuth.user.user);
  const [user, setuser] = useState({});
  const pwd = watch('password');
  const education = useSelector(state => state.EducationSlice);
  const dispatch = useDispatch();





  const Next = async data => {
    const { college_type, branch } = data;

    try {
      dispatch(setCollegeType(college_type))
      dispatch(setBranch(branch))
      dispatch(setFirstTime());
      const payload = {
        "user_data": {
          "education": {
            "college": {
              "college_type": college_type,
              "branch": branch
            }
          }
        }


      }
      
      API.userUpdate({ payload: payload, userId: userauth._id })
          .then(res => {
            console.log(JSON.stringify(res))
      })

      navigation.navigate("Home")
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_view}>

        <Text style={styles.heading_text}>College Type</Text>
        <CustomInput name="college_type"
          control={control}
          placeholder="College Type"
          rules={{
            required: 'College Type is required',

          }} />



        <View>
          <Text style={styles.heading_text}>Branch</Text>
          <CustomInput name="branch"
            control={control}
            placeholder="Branch"
            rules={{
              required: 'Branch is required',
              minLength: {
                value: 3,
                message: 'Branch should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Branch should be max 24 characters long',
              },
            }} />

        </View>
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