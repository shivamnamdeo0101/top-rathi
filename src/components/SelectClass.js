import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

const SelectClass= ({ searchAble, data, error, seterror, list, setValue, value, dataapi }) => {

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

            {searchAble && <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginBottom: 10, elevation: 2, padding: 3, paddingLeft: 10, borderRadius: 10 }}>
                <Ionicons name={"search-outline"} color={"#f5aa42"} size={20} />

                <TextInput
                    placeholder='Search...'
                    onChangeText={setsearch}
                    value={search}
                    style={{ flex: 1, fontFamily: "OpenSans-Regular", paddingLeft: 10, fontSize: 16, }}
                />
            </View>}

            <ScrollView>
                {error && <Text style={{ fontFamily: "OpenSans-Regular", color: "#f03", marginTop: 10 }}>{error}</Text>}
                <View>


                    {
                        getData()?.map((item, index) => {

                            return (
                                <TouchableOpacity onPress={() => handleValue(item)} key={index} style={{width:"90%",flexDirection:"row", alignItems:"center",flexDirection:"row",borderColor: getColor(item) ? "#15295c" : "#eee", borderWidth: 2,alignSelf: "center", marginBottom: 20, borderRadius:12,backgroundColor:"#f8f8f8",}}>
                                    <View style={{backgroundColor:"#15295c",alignItems:"center",flexDirection:"row",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                                        {/* <Ionicons name={"checkmark"} color={getColor(item) ? "#f5aa42" : "#fff"} size={20} /> */}
                                        <Text style={{padding: 14, width:60,  fontFamily: "OpenSans-SemiBold", fontWeight: "400", textAlign: "center", fontSize: 16,color:"#fff" }}>{index+5+1}</Text>
                                    </View>
                                    <Text style={{ color:"#000", marginLeft:30, padding: 5, fontFamily: "OpenSans-SemiBold", fontWeight: "400", textAlign: "center", fontSize: 16 }}>Class</Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>

            </ScrollView>


        </View>
    )
}

export default SelectClass


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});