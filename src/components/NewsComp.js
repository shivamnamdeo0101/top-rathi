import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, Linking, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CustomButton from './CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { NEWS_API } from '../service/apis/NewsService';
import { useSelector } from 'react-redux';
import PollComp from './PollComp';


export default function NewsComp({ route, navigation }) {
  const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
  const { post ,fromWhere} = route.params;

  const collection = useSelector(state=>state.NewsSlice.collection);
  const user = useSelector(state => state.userAuth.user.user);
  const [saved, setsaved] = useState(false);

  const payload = {
    "userId": user._id,
    "postId": fromWhere === "collection" ?  post.newsId : post._id
  }

  useEffect(() => {
    try {
      const fetchData = async()=>{
        await NEWS_API.GetToCollection(payload).then((res) => {
          console.log(res?.data)
            setsaved(res.data.data)
        })
      }
      fetchData()

    } catch (error) {
      console.log(error)
    }
  }, [saved])



  const toogleSave = async () => {

    if (saved) {
      await NEWS_API.RemToCollection(payload).then((res) => {
        setsaved(false)
      })
    } else {
      await NEWS_API.AddToCollection(payload).then((res) => {
        setsaved(true)
      })
    }

  }


  return (
    <View style={{ flex: 1, backgroundColor: "#fff", flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12, backgroundColor: "#fff" }}>
        <Ionicons name="arrow-back" color="#f5aa42" size={25} onPress={() => navigation.goBack()} />
        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onPress={() => toogleSave()}>
          <Ionicons style={{ marginRight: 10 }} name={saved ? "bookmark" : "bookmark-outline"} color="#f5aa42" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 8, flex: 1,margin:10,marginBottom:0,marginTop:0 }}>



        <ScrollView showsVerticalScrollIndicator={true}>
          <View>


            <View>

              <Image source={{ uri: post?.image }} style={{ width: "100%", height: 220, borderRadius: 10 }} />
              <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                <View style={{...styles.tags_row,marginTop:10,marginBottom:10}}>

                  {post?.tags?.map((tag) =>
                    <View key={tag._id}>
                      <Text style={styles.tag}>{tag?.value}</Text>
                    </View>
                  )}
                </View>

              </View>
              <Text style={{ color: "#000", fontSize: 16, fontFamily: 'OpenSans-Bold' ,marginBottom:10}}>{post?.title}</Text>
              <Text style={{
                color: "#666",
                fontSize: 14,
                fontFamily: "OpenSans-Regular",marginBottom:10
              }}>{moment(post?.timestamp).fromNow()}</Text>

              <Text style={{ color: "#444", fontSize: 14, fontFamily: 'OpenSans-SemiBold',marginBottom:10 }}>{post?.content}{post?.content}{post?.content}{post?.content}</Text>
              <Text style={{ color: "#034efc", fontSize: 14, marginBottom: 10,fontFamily:"OpenSans-Regular" }}
                onPress={() => navigation.navigate("WebView", { link: post.read_more_link })}
              > Read more...</Text>
            </View>
          </View>
        </ScrollView>
        {
          post.poll_title && <PollComp navigation={navigation} user={user} post={post} />
        }
        {
          post.form_link &&
          <TouchableOpacity onPress={() => navigation.navigate("WebView", { link: post.form_link })}>
            <ImageBackground
              source={{ uri: post.image }}
              borderRadius={5}
              blurRadius={90} style={{ display: 'flex', flexDirection: "row", alignItems: "center", backgroundColor: "#f0f3f5", padding: 10, margin: 10, marginLeft: 0, width: 150, }}

            >
              <FontAwesome style={{ marginRight: 10 }} name="hand-o-right" color="#fff" size={25} />
              <Text style={{ fontFamily: "OpenSans-Regular", fontWeight: "bold", fontSize: 14, color: "#f0f3f5" }}>Fill This Form</Text>

            </ImageBackground>
          </TouchableOpacity>
        }

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tags_row: {
    flexDirection: "row",
    marginTop:5
  },
  tag: {
    marginRight: 5,
    color: "#f03",
    fontSize: 12
  },
})