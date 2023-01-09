import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const MultiSelectUi = ({ searchAble, error,seterror, list, setValue, value,dataapi }) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [search, setsearch] = useState("")


  const getData = ()=>{
    return list.filter((item)=>item?.name?.toLowerCase().includes(search?.toLowerCase()))
  }

  const handleValue = (item)=>{
    if (dataapi) {
      setValue(item.iso2 + "-" + item.name)
    } else {
      setValue(item.name)
    }
    seterror && seterror("")
  }

  function getColor(item) {
    if (dataapi) {
      return (item.iso2 + "-" + item.name) === value;
    } else {
      return item?.name === value;
    }
  }

  return (
    <View style={{marginBottom:10}}>

      {searchAble && <View style={{ flexDirection:"row",alignItems:"center",backgroundColor:"#fff", marginBottom:10 ,elevation:2, padding:3, paddingLeft:10,borderRadius:10}}>
        <Ionicons name={"search-outline"} color={"#f2c305"} size={20} />

        <TextInput
          placeholder='Search...'
          onChangeText={setsearch}
          value={search}
          style={{flex:1,fontFamily:"Poppins-Regular",paddingLeft:10,fontSize:16,}}
        />
      </View>}

      <ScrollView>
      {error && <Text style={{fontFamily:"Poppins-Regular",color:"#f03",marginTop:10}}>{error}</Text>}
        <View style={{ flexDirection: "row", flexWrap: "wrap",margin:5,}}>


          {
            getData()?.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => handleValue(item)} key={index} style={{ flexDirection: "row", alignItems: "center", alignContent: "center", borderWidth: 2, borderColor: getColor(item) ? "#f2c305" : "#fff", borderRadius: 10, margin: 10, marginBottom: 0, marginLeft: 0, padding: 10, backgroundColor: "#fff", elevation: 2 }}>
                  <Ionicons name={"checkmark"} color={getColor(item) ? "#f2c305" : "#ccc"} size={20} />
                  <Text style={{ marginLeft: 10, fontFamily: "Poppins-Regular", fontWeight: "400", textAlign: "center", fontSize: 16 }}>{item?.name?.toUpperCase()}</Text>
                </TouchableOpacity>
              )
            })
          }

        </View>
        
      </ScrollView>


    </View>
  )
}

export default MultiSelectUi


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});