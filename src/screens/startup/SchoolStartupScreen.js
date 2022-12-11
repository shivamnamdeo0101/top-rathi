import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setClass, setFromWhere, setStream } from '../../store/EducationSlice';
import { setFirstTime } from '../../store/UserSlice';
import { API } from '../../service/apis/UserService';

export default function SchoolStartupScreen({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const [user, setuser] = useState({});
  const userauth = useSelector(state => state.userAuth.user.user);
  const pwd = watch('password');
  const education = useSelector(state => state.EducationSlice);
  const dispatch = useDispatch();

  const [stream_state, setstream_state] = useState("")
  const [class_state, setclass_state] = useState("Class 1")
  const Next = async data => {
    const { stream, class_ } = data;

    try {
      dispatch(setClass(class_state))
      dispatch(setStream(stream_state))
      dispatch(setFirstTime())
     
      navigation.navigate("Address")
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.top_view}>

        <Text style={styles.heading_text}>Pursuing class...?</Text>
        <CustomSelect
          name="Class"
          control={control}
          list={[
                  { id: 0, name: "Class 1" },
                  { id: 1, name: "Class 2" },
                  { id: 2, name: "Class 3" },
                  { id: 3, name: "Class 4" },
                  { id: 4, name: "Class 5" },
                  { id: 5, name: "Class 6" },
                  { id: 6, name: "Class 7" },
                  { id: 7, name: "Class 8" },
                  { id: 8, name: "Class 9" },
                  { id: 9, name: "Class 10" },
                  { id: 10, name: "Class 11" },
                  { id: 11, name: "Class 12" },
                  
                
                ]}
          placeholder="Select Your Class"
          setValue={setclass_state}
          value={class_state}
          rules={{
            required: 'Class is required',
          }}
          editable={false}
        />

        {
          class_state.split("Class")[1] > 10 &&

          <View>
            <Text style={styles.heading_text}>Stream</Text>

            <CustomSelect
              name="Stream"
              control={control}
              list={[{ id: 0, name: "Maths" }, { id: 1, name: "Bio" }, { id: 2, name: "Commerce" },]}
              placeholder="Select Your Stream"
              setValue={setstream_state}
              value={stream_state}
              rules={{
                required: 'Stream is required',
              }}
              editable={false}
            />

          </View>


        }
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