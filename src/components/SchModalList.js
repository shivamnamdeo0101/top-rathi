import { View, Text } from 'react-native'
import React from 'react'

const SchModalList = ({ list, setValue, value, name }) => {

    const setFun = (item) => {
        setValue(item)
    }

    return (
        <View style={{ backgroundColor: "#e8e8e8", marginBottom: 16, padding: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: "OpenSans-SemiBold", color: "#15295c", textTransform: "capitalize", }}>{name}</Text>

           { <View style={{flexDirection:"row",alignItems:"center"}}>
                {
                    list?.map((item, index) => {
                        return (
                            <Text onPress={() => setFun(item)} style={{marginRight:16,margin:10,marginLeft:0, textTransform: "uppercase", color: value?.indexId === item?.indexId ? "#f5aa42" : "#000", fontFamily:  "OpenSans-SemiBold"}} key={index}>{item?.label}</Text>
                        )
                    })
                }
            </View>}


        </View>
    )
}

export default SchModalList