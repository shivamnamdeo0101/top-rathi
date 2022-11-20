import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomMultiSelect = ({ name, list, defaultValue, placeholder, setValue, value, editable }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setsearch] = useState("")
  const [selectedInterest, setselectedInterest] = useState([])

  const getList = () => {
    return list.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  }

  console.log(selectedInterest)

  const CloseModal = () => {
    setModalVisible(false)
    setsearch("");
  }

  const addToList = (e) => {
    if (!IsAvail(e)) {
      console.log(selectedInterest)
      setselectedInterest([...selectedInterest, e])
    } else {
      const res = selectedInterest.filter((item) => item.id !== e.id);
      setselectedInterest(res)
    }


  }

  const IsAvail = (e) => {
    const li = []
    Object.values(selectedInterest).forEach((item) => li.push(item.name))
    console.log(li.includes(e.name))
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


        <Text style={{ paddingLeft: 5, paddingTop: 5, color: "#666", fontFamily: "Poppins-Bold" }}>{name.toUpperCase()}
        </Text>

          <View style={{flexDirection:"row",marginBottom:30,flexWrap:"wrap"}}>
            {[...selectedInterest].map((item) =>
              <Text key={item.id} style={{color: "#666", borderRadius:8,fontFamily: "Poppins-Bold",marginRight:5,backgroundColor:"#f0f3f5",padding:5,marginTop:5}}>
                {item.name}
              </Text>
            )}
          </View>
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={() => CloseModal()}
          swipeDirection="down"
          onBackButtonPress={() => CloseModal()}
          style={{ flex: 1, backgroundColor: "#f0f3f5", margin: 0, marginTop: "50%", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 16 }}>SELECT {name.toUpperCase()}</Text>
            <TextInput
              placeholder={"Search " + name}
              value={search}
              onChangeText={(e) => setsearch(e)}
              style={{ backgroundColor: "#fff", borderRadius: 10, padding: 10, fontFamily: "Poppins-Bold", marginBottom: 10 }}
            />

           
            <ScrollView showsVerticalScrollIndicator={false}>
              {getList().map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity onPress={() => { addToList(item) }} style={styles.itemContainer}>
                      <Text style={styles.item} key={index}>{index + 1}. {item.name}</Text>
                      {IsAvail(item) && <Ionicons name="checkmark-done-circle-outline" color="#509403" size={25} />}
                    </TouchableOpacity>
                  </View>
                );

              })}
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