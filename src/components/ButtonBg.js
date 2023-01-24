import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonBg = ({onPress,text,bgRed}) => {
    return (
            <TouchableOpacity style={bgRed ? styles.buttonRedBg :  styles.buttonRedBorder} onPress={onPress}>
                <Text style={{ color:bgRed? "#fff" :"#f5aa42", fontWeight: "bold", fontSize: 18 }}>{text}</Text>
            </TouchableOpacity>
    )
}

export default ButtonBg


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-between" },
    buttonRedBg: { flexDirection: "column", alignItems: "center", width: "48%", padding: 12, textAlign: "center", backgroundColor: "#f5aa42", borderRadius: 10, alignContent: "center" },
    buttonRedBorder: { flexDirection: "column", alignItems: "center", width: "48%", padding: 12, borderWidth: 2, borderColor: "#f5aa42", borderRadius: 10 }

});