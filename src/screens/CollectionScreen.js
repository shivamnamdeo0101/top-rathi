import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'
import CollectionComp from '../components/CollectionComp'

const CollectionScreen = ({navigation}) => {

  const user = useSelector(state=>state.userAuth.profile)
  return (
    <View style={{flex:1}}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity style={{ padding: 3, backgroundColor: "#fff", borderRadius: 99, marginRight: 10 }}>
              <Ionicons name="arrow-back" color="#000" size={23} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: "Poppins-Bold", color: "#000" }}>SAVED COLLECTION</Text>
          </View>
         
      </View>

        <CollectionComp navigation={navigation} user={user} />
    </View>
  )
}

export default CollectionScreen

const styles = StyleSheet.create({

    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"center",
      backgroundColor: "#fff",
      padding: 12,
      elevation: 4
    },

  });