import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch } from 'react-redux'
import { setBranch, setClass } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'

const SchoolStartupScreen = ({ navigation }) => {

  const [class_, setclass] = useState("")
  const [error, seterror] = useState("")
  const dispatch = useDispatch();



  const Next = () => {

    if(!class_){
      seterror("Please select the option given")
      return
  }

    try {
      dispatch(setClass(class_))

      if(class_?.split("Class")[1] > 10){
        navigation.navigate("SchoolStream")
      }else{
        navigation.navigate("Address")
      }

    } catch (e) {

      Alert.alert('Oops', e.message);
    }

  }

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <Text style={styles.heading_text}>SELECT YOUR CLASS</Text>
        <MultiSelectUi 
          type="class"
          error={error}
          seterror={seterror}
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
          setValue={setclass} value={class_}
        />

       
      

      </View>
      <View style={styles.bottom_view}>
        <CustomButton text="Next" onPress={() => Next()} />
      </View>
    </View>
  )
}

export default SchoolStartupScreen


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
    color: "#000",
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Poppins-Bold"
  }
});