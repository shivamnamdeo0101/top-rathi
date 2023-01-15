import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch } from 'react-redux'
import { setBranch, setClass } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'
import SelectClass from '../../components/SelectClass'

const SchoolStartupScreen = ({ navigation }) => {

  const [class_, setclass] = useState("")
  const [error, seterror] = useState("")
  const dispatch = useDispatch();



  const Next = () => {

    if (!class_) {
      seterror("Please select the option given")
      return
    }

    try {
      dispatch(setClass(class_))

      if (class_?.split("Class")[1] > 10) {
        navigation.navigate("SchoolStream")
      } else {
        navigation.navigate("Address")
      }

    } catch (e) {

      Alert.alert('Oops', e.message);
    }

  }

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <View>

          <View style={{padding:20,paddingTop:0}}>
          <Text style={styles.heading_text}>Choose the class which you are currently pursuing .</Text>
        <Text style={{fontFamily:"OpenSans-Regular",color:"#637994"}} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

        </View>
          <SelectClass
            type="class"
            error={error}
            seterror={seterror}
            list={[
    
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