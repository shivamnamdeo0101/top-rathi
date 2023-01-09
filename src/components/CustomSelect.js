import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultiSelectUi from './MultiSelectUi';

const CustomSelect = ({ name, list, defaultValue, placeholder, setValue, value, editable, searchable, dataapi,seterror, error }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setsearch] = useState("")

  function getList() {
    return list.filter((item) => search.toLowerCase().includes(item.name.toLowerCase()))
  }

  const CloseModal = () => {
    setModalVisible(false)
    setsearch("");
  }

  const setData = (item) => {
    if (dataapi) {
      setValue(item.iso2 + "-" + item.name)
    } else {
      setValue(item.name)
    }
  }

  return (

    <View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={() => CloseModal()}
        swipeDirection="down"
        onBackButtonPress={() => CloseModal()}
        style={{ flex: 1, backgroundColor: "#fff", margin: 0, marginTop: "50%", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 16 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{width:100,height:3, borderRadius:33,backgroundColor:"#ccc",alignSelf:"center",margin:5}}>

          </View>

          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20,color:"#15295c" ,margin:5, marginBottom:16, borderLeftColor:"#f2c305",borderLeftWidth:2,paddingLeft:10}}>SELECT {name.toUpperCase()}</Text>

          <MultiSelectUi 
            list={list}
            setValue={setValue}
            value={value}
            searchAble={searchable}
            dataapi={dataapi}
          />
          {/* {searchable && <TextInput
            placeholder={"Search " + name}
            value={search}
            onChangeText={(e) => setsearch(e)}
            style={{ backgroundColor: "#fff", borderRadius: 10, padding: 10, fontFamily: "Poppins-Bold", marginBottom: 10 }}
          />}
          <ScrollView showsVerticalScrollIndicator={false}>
            {getList().map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => { setData(item); CloseModal() }} style={styles.itemContainer}>
                    <Text style={styles.item} key={index}>{index + 1}. {dataapi ? item.iso2 + "-" + item.name : item.name}</Text>
                    {item.name === value && <Ionicons name="checkmark-done-circle-outline" color="#509403" size={25} />}
                  </TouchableOpacity>
                </View>



              );

            })}
          </ScrollView> */}

          

        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {borderColor: error ? 'red' : '#e8e8e8'},
        ]}>
        <Text style={{ paddingLeft: 5, paddingTop: 5, color: "#15295c", fontFamily: "Poppins-SemiBold" ,fontSize:16}}>{name.toUpperCase()}</Text>


        <TextInput
          name={name}
          defaultValue={defaultValue}
          value={value}
          onChangeText={(e) => { setValue(e) }}
          placeholder={placeholder}
          style={styles.input}
          editable={editable}

        />
        
      </TouchableOpacity>
      {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error || 'Error'}</Text>
          )}
    </View>
  )
}

export default CustomSelect

const styles = StyleSheet.create({
  input: {
    fontFamily:"Poppins-Regular"
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