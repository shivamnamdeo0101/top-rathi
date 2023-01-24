import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch, useSelector } from 'react-redux'
import { setBranch, setClass, setStream } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'
import SelectGrid from '../../components/SelectGrid'

const SchoolStreamScreen = ({ navigation }) => {

  const [stream, setstream] = useState({})
  const [error, seterror] = useState("")
  const dispatch = useDispatch();

  const sch = useSelector(state=>state?.SchFilterListSlice);

  const Next = () => {

    if(!stream?.label){
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
        <View style={{padding:20,paddingTop:0}}>
        <Text style={styles.heading_text}>Select your stream</Text>
        <Text style={{fontFamily:"OpenSans-Regular",color:"#637994"}} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

        </View>
      
        <SelectGrid 
          type="class"
          error={error}
          seterror={seterror}
          list={sch?.stream}
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