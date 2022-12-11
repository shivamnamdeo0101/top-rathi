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
  const userauth = useSelector(state => state.userAuth.user.user);
  const [user, setuser] = useState({});
  const pwd = watch('password');
  const education = useSelector(state => state.EducationSlice);
  const dispatch = useDispatch();
  const [college_type, setcollege_type] = useState("")
  const [branch, setbranch] = useState("")

  const [error, seterror] = useState("");

  const Next = async data => {

    
    if(!branch && !college_type){
      seterror("Please fill the required value")
      return
    }

    if(!college_type){
      seterror("is required")
      return
    }

    if(!branch){
      seterror("is required")
      return
    }
    
    

    

    try {
      
      dispatch(setCollegeType(college_type))
      dispatch(setBranch(branch))
      dispatch(setFirstTime());
     
      navigation.navigate("Address")
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_view}>

        <Text style={styles.heading_text}>College Type</Text>
        <CustomSelect
          name="College Type"
          control={control}
          list={[{ id: 0, name: "Graduation" }, { id: 1, name: "Post Graduation" }]}
          placeholder="College Type"
          setValue={setcollege_type}
          value={college_type}
          rules={{
            required: 'College type is required',
          }}
          editable={false}
          error={(error && !college_type ) && "College Type "+error}
        />

        <View>
          <Text style={styles.heading_text}>Branch</Text>
          <CustomSelect
            name="branch"
            control={control}
            list={[{ id: 0, name: "IT" }, { id: 1, name: "CS" }, { id: 2, name: "Civil" },]}
            placeholder="Branch"
            setValue={setbranch}
            value={branch}
            rules={{
              required: 'Stream is required',
            }}
            editable={false}
            searchable={true}
            error={ (error && !branch)&& error && "Branch "+ error}
          />



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