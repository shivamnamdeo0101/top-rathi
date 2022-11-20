import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView ,Linking} from 'react-native'
import React from 'react'
import moment from 'moment'
import CustomButton from './CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function NewsComp({ route, navigation }) {
  const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
  const { post } = route.params;
  console.log(post)

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
        <View style={{display:"flex",flexDirection:"row", alignItems:"center",justifyContent:"space-between",padding:16,elevation:1,backgroundColor:"#fff"}}>
          <Ionicons name="arrow-back" color="#000" size={25} onPress={() => navigation.goBack()} />
          <View style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
            <Ionicons style={{marginRight:10}} name="bookmark" color="#000" size={25} onPress={() => navigation.goBack()} />
          </View>
      </View>
      <View style={{padding:8,flex:1}}>
      
      

      <ScrollView showsVerticalScrollIndicator={true}>
        <View>
         
          <View style={styles.tags_row}>
            {post.tags.map((tag) =>
              <View key={tag._id}>
                <Text style={styles.tag}>{tag.value}</Text>
              </View>
            )}
          </View>
          <View style={{ height: "85%" }}>
            <Text style={{ color: "#000", fontSize: 20, marginTop: 10 ,fontFamily: 'Poppins-Bold'}}>{post.title}</Text>
            <Text style={{
            color: "#666",
            fontSize: 14,
            fontFamily:"Poppins-Regular",
            marginBottom: 5
          }}>{moment(post.timestamp).fromNow()}</Text>
            
            <Image source={{ uri: post.image }} style={{ width: "100%", height: 200, borderColor: "#eee", borderWidth: 1, marginTop: 10 }} />
            <Text style={{ color: "#000", fontSize: 16, marginTop: 10 ,fontFamily: 'Poppins-Light'}}>{post.content}{post.content}{post.content}{post.content}</Text>
            <Text style={{ color: "#034efc", fontSize: 20, marginBottom: 10 }}
              onPress={()=>navigation.navigate("WebView",{link:post.read_more_link})}
            >READ MORE...</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {post.form_link && <CustomButton
          text="Fill This Form"
          onPress={()=>navigation.navigate("WebView",{link:post.form_link})}
        />}
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tags_row: {
    flexDirection: "row",

  },
  tag: {
    marginRight:5,
    color:"#f03",
    fontSize: 12
  },
})