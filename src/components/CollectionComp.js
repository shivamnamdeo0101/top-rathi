import { View, Text, ScrollView, TouchableOpacity,RefreshControl, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../service/apis/UserService'
import LoadingComp from './LoadingComp'
import NewsSlice, { setCollection } from '../store/NewsSlice'
import moment from 'moment'

const CollectionComp = ({ navigation, user }) => {

  const dispatch = useDispatch()
  const collection = useSelector(state => state.NewsSlice.collection);
  const [loading, setloading] = useState(true)
  const [pageNo, setpageNo] = useState(1)
  const [len, setlen] = useState(0)
  const [list, setlist] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.userGetCollection(user._id, pageNo);
      if (res.data.success){
          dispatch(setCollection([...collection,...res.data.data]))
        setloading(false);
      }
    }
    fetchData()

  }, [pageNo])


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    
  }, []);

  
  const fetchCollectionData = async () => {
    const res = await API.userGetCollection(user._id, pageNo);
    if (res.data.success) {
      dispatch(setCollection(res?.data?.data))
    }
  }




  if (loading) {
    return (
      <LoadingComp />
    )
  }

  if (collection?.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#000", fontFamily: "OpenSans-Bold" }}>You don't have any collection !</Text>
      </View>
    )
  }
  const routeNavigation = (post) => {
    navigation.navigate("NewsComp", { "post": post,"fromWhere":"collection" })
    // if(post?.news_type === "feed" || post?.news_type === "slide" ){
    //   navigation.navigate("NewsComp", { post: post })
    // }else if(post?.news_type === "insight"){
    //   navigation.navigate("Insight", { post: post })
    // }

  }


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} colors={["#f5aa42" ]} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
              setpageNo(pageNo + 1)
              console.log(pageNo)
          }

        }}
      >
        {collection?.map((post, index) =>
          <View key={index}>
            <TouchableOpacity style={styles.news_comp} key={post?._id} onPress={() => routeNavigation(post)}>
              <Image style={styles.post_img} source={{ uri: post?.image }} />

              <View style={styles.content_data}>

                <View style={styles.tags_row}>
                  {post?.tags?.map((tag) =>
                    <View key={tag?._id}>
                      <Text style={{ marginRight: 5, fontFamily: "OpenSans-Regular", color: "#f03", fontSize: 10 }}>{tag?.value}</Text>
                    </View>
                  )}
                </View>


                <Text style={styles.title}>{post?.title?.length > 60 ? post?.title?.substring(0, 60) + "..." : post?.title}</Text>
                <Text style={styles.timestamp}>Posted by {moment(post?.timestamp).fromNow()}</Text>
              </View>

            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
      { ((list.length <= len) && (list.length > 8) )  ?   <ActivityIndicator size={"small"} color={"#f5aa42"}/> :<View /> }

      
    </View>
  )
}

export default CollectionComp


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tag_text: {
    flexDirection: "row",
  },

  content_data: {
  },
  title: {
    color: "#000",
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold",
    width: "85%",

  },
  timestamp: {
    color: "#ccc",
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    marginBottom: 5,

  },
  container: {
    padding: 5,
  },
  tags_row: {
    flexDirection: "row",

  },
  tag: {
    backgroundColor: "#f5aa42",
    borderRadius: 3,
    fontWeight: "OpenSans-SemiBold",
    fontSize: 10
  },
  post_img_slide: {
    width: 200,
    height: 100,

  },

  post_slide: {
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  post_img: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 5,

  },
  content: {
    width: "80%",
    fontSize: 16,

  },
  news_comp: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    backgroundColor: "#fff",
    marginTop: 5


  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  }
});