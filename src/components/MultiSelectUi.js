import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const MultiSelectUi = ({ searchAble, data, error, seterror, list, setValue, value, dataapi }) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [search, setsearch] = useState("")


  const getData = () => {
    return list.filter((item) => item?.name?.toLowerCase().includes(search?.toLowerCase()))
  }

  const handleValue = (item) => {
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
    <View style={{ marginBottom: 10 }}>

      {searchAble && <View style={{ width: "97%", flexDirection: "row", alignItems: "center",backgroundColor: "#fff", borderColor: "#e8e8e8", borderWidth: 2, borderRadius: 33, paddingLeft: 10 }}>
        <Ionicons name={"search-outline"} color={"#f5aa42"} size={20} />

        <TextInput
          placeholder='Search...'
          onChangeText={setsearch}
          value={search}
          style={{ flex: 1, fontFamily: "OpenSans-Regular", paddingLeft: 10, fontSize: 16, }}
        />
      </View>}


      <ScrollView>
        {error && <Text style={{ fontFamily: "Poppins-Regular", color: "#f03", marginTop: 10 }}>{error}</Text>}
        <View style={{flex:2,marginBottom:100}}>


          {
            getData()?.map((item, index) => {

              return (
                <TouchableOpacity onPress={() => handleValue(item)} key={index} style={{ width: "95%", alignSelf: "center", flexDirection: "row", alignItems: "center", alignContent: "center", borderWidth: 2, borderColor: getColor(item) ? "#f5aa42" : "#e8e8e8", borderRadius: 10, margin: 10, marginBottom: 0, marginLeft: 0, padding: 14 }}>
                 {data === "country" && <View style={{width:"20%", flexDirection: "row",alignItems:"center" ,marginRight:10,justifyContent:"space-between"}}>
                    <Text style={{ fontFamily: "OpenSans-SemiBold", textAlign: "center", fontSize: 16, textTransform: "uppercase", color: "#000" }}>{item?.iso2}</Text>

                    <Image source={{ uri: `https://countryflagsapi.com/png/` + item?.name }} style={{ width: 25, height: 20, backgroundColor: "#ccc", borderRadius: 2 }} />


                  </View>}
                  <Text style={{ marginLeft: 10, fontFamily: "OpenSans-SemiBold", textAlign: "center", fontSize: 16, textTransform: "capitalize", color: "#000" }}>{item?.name}</Text>
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