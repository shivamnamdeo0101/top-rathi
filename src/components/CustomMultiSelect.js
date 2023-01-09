import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSelectUi from './MultiSelectUi';

const CustomMultiSelect = ({ name, list, defaultValue, placeholder, setValue, value, editable }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setsearch] = useState("")
  const [selectedInterest, setselectedInterest] = useState(defaultValue)

  useEffect(() => {
    setValue(selectedInterest)
  }, [selectedInterest])


  const getList = () => {
    return list.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  }


  const CloseModal = () => {
    setModalVisible(false)
    setsearch("");
  }

  const addToList = (e) => {
    if (!IsAvail(e)) {
      setselectedInterest(current => [...current, e]);
    } else {
      const res = selectedInterest.filter((item) => item.name !== e.name);
      setselectedInterest(res)

    }


  }

  const IsAvail = (e) => {
    const li = []
    Object.values(selectedInterest).forEach((item) => li.push(item.name))
    return li.includes(e.name)

  }


  return (

    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.container,
          { borderColor: '#e8e8e8' },
        ]}>


        <Text style={{ paddingLeft: 5, paddingTop: 5, color: "#15295c", fontFamily: "Poppins-SemiBold", fontSize: 16 }}>{name.toUpperCase()}
        </Text>

        <View style={{ flexDirection: "row", marginBottom: 30, flexWrap: "wrap" }}>
          {[...selectedInterest].length>0  ? [...selectedInterest].map((item, index) =>
            <Text key={index} style={{ color: "#666", borderRadius: 8, fontFamily: "Poppins-Bold", marginRight: 5, backgroundColor: "#f0f3f5", padding: 5, marginTop: 5 }}>
              {item.name}
            </Text>
          )
        
        :
        <Text style={{fontFamily:"Poppins-Regular",marginLeft:10}}>Click Here To Update Your Interest</Text>}
        </View>
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={() => CloseModal()}
          swipeDirection="down"
          onBackButtonPress={() => CloseModal()}
          style={{ flex: 1, backgroundColor: "#fff", margin: 0, marginTop: "50%", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ width: 100, height: 3, borderRadius:33, backgroundColor: "#ccc", alignSelf: "center", margin: 5 }}>

            </View>

            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, color: "#15295c", margin: 5, marginBottom: 16, borderLeftColor: "#f2c305", borderLeftWidth: 2, paddingLeft: 10 }}>SELECT {name.toUpperCase()}</Text>


            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginBottom: 10, elevation: 2, padding: 3, paddingLeft: 10, borderRadius: 10 }}>
              <Ionicons name={"search-outline"} color={"#f2c305"} size={20} />

              <TextInput
                placeholder='Search...'
                onChangeText={setsearch}
                value={search}
                style={{ flex: 1, fontFamily: "Poppins-Regular", paddingLeft: 10, fontSize: 16, }}
              />
            </View>
            


            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5, }}>
                {getList().map((item, index) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity onPress={() => { addToList(item) }} style={{ flexDirection: "row", alignItems: "center", alignContent: "center", borderWidth: 2, borderColor: IsAvail(item) ? "#f2c305" : "#fff", borderRadius: 10, margin: 10, marginBottom: 0, marginLeft: 0, padding: 10, backgroundColor: "#fff", elevation: 2 }}>
                        <Text style={{ marginRight: 10, fontFamily: "Poppins-Regular", fontWeight: "400", textAlign: "center", fontSize: 16 }} key={index}>{index + 1}. {item.name}</Text>
                        {IsAvail(item) && <Ionicons name="checkmark-done-circle-outline" color={"#509403"} size={25} />}
                      </TouchableOpacity>
                    </View>
                  );

                })}
              </View>

            </ScrollView>
          </View>
        </Modal>



      </TouchableOpacity>
    </View>
  )
}

export default CustomMultiSelect

const styles = StyleSheet.create({
  input: {

  },
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 5
  },
  item: {
    padding: 5,
    fontFamily: "Poppins-Bold"
  }
})