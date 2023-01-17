import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, Linking, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import CustomButton from './CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { NEWS_API } from '../service/apis/NewsService';
import { useDispatch, useSelector } from 'react-redux';
import PollComp from './PollComp';
import { setCollection } from '../store/NewsSlice';
import { API } from '../service/apis/UserService';
import LoadingComp from './LoadingComp';


export default function NewsComp({ route, navigation }) {
  const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
  const { post ,fromWhere} = route.params;
  const dispatch = useDispatch();
  const collection = useSelector(state=>state.NewsSlice.collection);
  const user = useSelector(state => state.userAuth.user.user);
  const [saved, setsaved] = useState(false);
  const token = useSelector(state => state.userAuth.user.token);
  const [loading, setloading] = useState(true)
  const [fetchedPost, setfetchedPost] = useState({})

  const getIdFrom = {
    "collection":post?.newsId,
    "newsscreen":post?._id,
    "notification":post?.refId
  }



  const payload = {
    "userId": user._id,
    "postId": getIdFrom[fromWhere]
  }

  const getNewsPayload = {
    "token":token,
    "postId":getIdFrom[fromWhere]
  }

  useEffect(() => {
    try {
      const fetchData = async()=>{
        await NEWS_API.GetNewsById(getNewsPayload).then((res) => {
          setfetchedPost(res.data.data)
          setloading(false)
        })
      }
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [loading])

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

  

  const fetchCollectionData = async () => {
    const res = await API.userGetCollection(user._id, 1);
    if (res.data.success) {
      dispatch(setCollection(res?.data?.data))
    }
  }


  const toogleSave = async () => {

    if (saved) {
      await NEWS_API.RemToCollection(payload).then((res) => {
        console.log(res.data,"Delete===================");
        setsaved(false)
      })
    } else {
      await NEWS_API.AddToCollection(payload).then((res) => {
        
        setsaved(true)
      })
    }
    //fetchCollectionData()

  }

  if(loading){
    return(
      <LoadingComp />
    )
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



        <ScrollView showsVerticalScrollIndicator={false}>
          <View>


            <View>

              <Image source={{ uri: fetchedPost?.image }} style={{ width: "100%", height: 220, borderRadius: 10 }} />
              <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                <View style={{...styles.tags_row,marginTop:10,marginBottom:10}}>

                  {fetchedPost?.tags?.map((tag) =>
                    <View key={tag._id}>
                      <Text style={styles.tag}>{tag?.value}</Text>
                    </View>
                  )}
                </View>

              </View>
              <Text style={{ color: "#000", fontSize: 16, fontFamily: 'OpenSans-Bold' ,marginBottom:10}}>{fetchedPost?.title}</Text>
              <Text style={{
                color: "#666",
                fontSize: 14,
                fontFamily: "OpenSans-Regular",marginBottom:10
              }}>{moment(fetchedPost?.timestamp).fromNow()}</Text>

              <Text style={{ color: "#444", fontSize: 14, fontFamily: 'OpenSans-SemiBold',marginBottom:10 }}>{fetchedPost?.content}{fetchedPost?.content}{fetchedPost?.content}{fetchedPost?.content}</Text>
              <Text style={{ color: "#034efc", fontSize: 14, marginBottom: 10,fontFamily:"OpenSans-Regular" }}
                onPress={() => navigation.navigate("WebView", { link: fetchedPost?.read_more_link })}
              > Read more...</Text>
            </View>
          </View>
        </ScrollView>
        {
          fetchedPost.poll_title && <PollComp navigation={navigation} user={user} post={fetchedPost} />
        }
        {
          fetchedPost.form_link &&
          <TouchableOpacity onPress={() => navigation.navigate("WebView", { link: fetchedPost?.form_link })}>
            <ImageBackground
              source={{ uri: fetchedPost?.image }}
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