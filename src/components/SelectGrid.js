import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const SelectGrid = ({ searchAble, data, error, seterror, list, setValue, value, dataapi }) => {

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
        <View>

            {searchAble && <View style={{width:"95%", flexDirection: "row", alignItems: "center", margin: 10,backgroundColor:"#fff",borderColor:"#e8e8e8",borderWidth:2,borderRadius:33 ,paddingLeft: 10 }}>
                <Ionicons name={"search-outline"} color={"#f5aa42"} size={20} />

                <TextInput
                    placeholder='Search...'
                    onChangeText={setsearch}
                    value={search}
                    style={{ flex: 1, fontFamily: "OpenSans-Regular", paddingLeft: 10, fontSize: 16, }}
                />
            </View>}

            <ScrollView>
                {error && <Text style={{ fontFamily: "OpenSans-Regular", color: "#f03",paddingLeft:14,marginBottom:10}}>{error}</Text>}
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", }}>


                    {
                        getData()?.map((item, index) => {

                            return (


                                <TouchableOpacity style={{ width: "40%", borderRadius: 10, height: 100, margin: 5, marginBottom: 10 }} key={index} onPress={() => handleValue(item)}>
                                    <ImageBackground blurRadius={9} resizeMode="cover" borderRadius={10} source={{ uri: `https://source.unsplash.com/featured/?${item?.name}` }} onPress={() => handleValue(item)} key={index} style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        borderRadius: 13,
                                        borderColor: getColor(item) ? "#f5aa42" : "#eee", borderWidth: 2
                                    }}>
                                        <Text style={{ color: "#fff", backgroundColor: "#000", padding: 5, fontFamily: "OpenSans-Regular", fontWeight: "400", textAlign: "center", fontSize: 14 }}>{item?.name}</Text>

                                    </ImageBackground>
                                </TouchableOpacity>

                            )
                        })
                    }

                </View>

            </ScrollView>


        </View>
    )
}

export default SelectGrid


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});


