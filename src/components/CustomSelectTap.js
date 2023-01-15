import { View, Text,StyleSheet,Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomSelectTap = ({ list, setValue, value,error,seterror }) => {

    const setChange = (item)=>{
        setValue(item.name)
        seterror("")
    }

    return (
        <View style={styles.container}>
            {
                list.map((item,index)=>{
                   return(
                    <TouchableOpacity key={index} style={{borderColor:value === item.name ? "#15295c" : "#fff",borderWidth:2 ,borderRadius:10,padding:10}} onPress={()=>setChange(item)}>
                        <Image source={{uri:item.image}} style={styles.image}/>
                     </TouchableOpacity>
                   )
                })
            }
            {error ? <Text style={{color:"#f03",textAlign:"center",fontFamily:"Poppins-Regular"}}>Please select any one from the given option</Text> : <Text></Text>}

        </View>
    )
}

export default CustomSelectTap



const styles = StyleSheet.create({
    container: {
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"space-around"
    },
    image:{
        width:200,
        height:200
    }
    
  });