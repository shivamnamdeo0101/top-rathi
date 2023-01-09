import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch } from 'react-redux'
import { setBranch, setClass, setStream } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'

const SchoolStreamScreen = ({ navigation }) => {

  const [stream, setstream] = useState("")
  const [error, seterror] = useState("")
  const dispatch = useDispatch();



  const Next = () => {

    if(!stream){
        seterror("Please select the option given")
        return
    }

    try {
      dispatch(setStream(stream))
      navigation.navigate("Address")
    } catch (e) {

      Alert.alert('Oops', e.message);
    }

  }

  return (
    <View style={styles.container}>

      <View style={{ flex: 1 }}>
        <Text style={styles.heading_text}>SELECT YOUR STREAM</Text>
        <MultiSelectUi 
          type="class"
          error={error}
          seterror={seterror}
          list={[
            { id: 0, name: "Mathematics" },
            { id: 1, name: "Biology" },
            { id: 2, name: "Commerce" },
            { id: 3, name: "Science" },
           


          ]}
          setValue={setstream} value={stream}
        />

       
      

      </View>
      <View style={styles.bottom_view}>
        <CustomButton text="Next" onPress={() => Next()} />
      </View>
    </View>
  )
}

export default SchoolStreamScreen


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