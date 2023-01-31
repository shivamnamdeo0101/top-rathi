import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SchInput = ({  setValue, value, name }) => {



    return (
        <View style={{ backgroundColor: "#e8e8e8", marginBottom: 16, padding: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: "OpenSans-SemiBold", color: "#15295c", textTransform: "capitalize", }}>{name}</Text>

           <TextInput 
                placeholder='Enter your annual Income'
                value={value}
                keyboardType="numeric"
                onChangeText={setValue}
                style={{fontFamily:"OpenSans-SemiBold",color:"#000"}}
           />


        </View>
    )
}

export default SchInput