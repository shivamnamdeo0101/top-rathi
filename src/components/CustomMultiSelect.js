import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView ,ImageBackground} from 'react-native'
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

        ]}>


        <View>
          <Text style={{ padding: 10, paddingTop: 0, paddingLeft: 20, color: "#15295c", fontFamily: "OpenSans-SemiBold", fontSize: 16, textTransform: "capitalize" }}>{name}</Text>

        </View>

        <View style={{ flexDirection: "row", width: "95%", alignSelf: "center", padding: 10, borderRadius: 33, flexWrap: "wrap", ...styles.input }}>
          {[...selectedInterest].length > 0 ? [...selectedInterest].map((item, index) =>
            <Text key={index} style={{ color: "#000", borderRadius: 8, fontFamily: "OpenSans-Regular", marginRight: 5, backgroundColor: "#f0f3f5", padding: 5, marginTop: 5 }}>
              {item.name}
            </Text>
          )

            :
            <Text style={{ fontFamily: "Poppins-Regular", marginLeft: 10 }}>Click Here To Update Your Interest</Text>}
        </View>
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={() => CloseModal()}
          swipeDirection="down"
          onBackButtonPress={() => CloseModal()}
          style={{ flex: 1, backgroundColor: "#fff", margin: 0, marginTop: "50%", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 16 }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ width: 100, height: 3, borderRadius: 33, backgroundColor: "#ccc", alignSelf: "center", margin: 5 }}>

            </View>

            <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 20, color: "#15295c", margin: 5, marginBottom: 16, borderLeftColor: "#f5aa42", borderLeftWidth: 2, paddingLeft: 10, textTransform: "capitalize" }}>Select {name}</Text>

            <View style={{ width: "97%", flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderColor: "#e8e8e8", borderWidth: 2, borderRadius: 33, paddingLeft: 10 }}>
              <Ionicons name={"search-outline"} color={"#f5aa42"} size={20} />

              <TextInput
                placeholder='Search...'
                onChangeText={setsearch}
                value={search}
                style={{ flex: 1, fontFamily: "OpenSans-Regular", paddingLeft: 10, fontSize: 16, }}
              />
            </View>



            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", margin: 5, }}>
                {getList().map((item, index) => {
                  return (

                      <TouchableOpacity style={{ width: "40%", borderRadius: 10, height: 100, margin: 5, marginBottom: 10 }} key={index} onPress={() => addToList(item)}>
                        <ImageBackground blurRadius={9} resizeMode="cover" borderRadius={10} source={{ uri: `https://source.unsplash.com/featured/?${item?.name}` }}  key={index} style={{
                          flex: 1,
                          justifyContent: 'center',
                          borderRadius: 13,
                          borderColor: IsAvail(item) ? "#f5aa42" : "#eee", borderWidth: 2
                        }}>
                          <Text style={{ color: "#fff", backgroundColor: "#000", padding: 5, fontFamily: "OpenSans-Regular", fontWeight: "400", textAlign: "center", fontSize: 14 ,textTransform:"capitalize"}}>{item?.name}</Text>

                        </ImageBackground>
                      </TouchableOpacity>
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
    borderColor: '#e8e8e8',
    borderWidth: 2,
    padding: 14
  },
  container: {
    backgroundColor: 'white',

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