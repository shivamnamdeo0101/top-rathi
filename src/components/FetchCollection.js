import { View, Text, Image, TouchableOpacity,StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NEWS_API } from '../service/apis/NewsService';
import NewsComp from './NewsComp';
import moment from 'moment';
import { useSelector } from 'react-redux';
import LoadingComp from './LoadingComp';

const FetchCollection = ({ navigation, postId}) => {
    const [post, setpost] = useState(null);
    const [loading, setloading] = useState(true)
    
    const { width: screenWidth } = Dimensions.get('window');
    const user = useSelector(state=>state.userAuth.user)
    const payload = {
      "postId":postId,
      "token":user?.token
    }
    useEffect(() => {
       

        const fetchData = async () => {
            const res = await NEWS_API.GetNewsById(payload);
            if (res.data.success) {
                setpost(res.data.data)
                setloading(false)
            }
        }
        fetchData()
        
    }, [post])


    if(loading){
        return(
          <View >
          </View>
        )
    }

    if(!post || post === null){
        return(
            <View />
        )
    }

    const routeNavigation = ()=>{
      if(post?.news_type === "feed" || post?.news_type === "slide" ){
        navigation.navigate("NewsComp", { post: post })
      }else if(post?.news_type === "insight"){
        navigation.navigate("Insight", { post: post })
      }
      
    }

    return (
        <View style={styles.root}>
            {
                post!=null &&
                    <TouchableOpacity style={styles.news_comp} key={post._id} onPress={() => routeNavigation()}>
                        <Image style={styles.post_img} source={{ uri: post.image }} />

                        <View style={styles.content_data}>

                            <View style={styles.tags_row}>
                                {post.tags.map((tag) =>
                                    <View key={tag._id}>
                                        <Text style={{ marginRight: 5, fontFamily: "Poppins-Regular", color: "#f03", fontSize: 12 }}>{tag.value}</Text>
                                    </View>
                                )}
                            </View>


                            <Text style={styles.title}>{post.title.length > 60 ? post.title.substring(0, 60) + "..." : post.title}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default FetchCollection


const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: "#fff",
    },
    tag_text: {
      flexDirection: "row",
    },
  
    content_data: {
      width: "80%"
    },
    title: {
      color: "#000",
      fontSize: 14,
      fontFamily: "Poppins-Bold",
      width: "85%",
  
    },
    timestamp: {
      color: "#ccc",
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginBottom: 5,
  
    },
    container: {
      padding: 5,
    },
    tags_row: {
      flexDirection: "row",
  
    },
    tag: {
      backgroundColor: "#f2c305",
      borderRadius: 3,
      fontWeight: "bold",
      fontSize: 12
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
      width: 100,
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
      padding: 8,
      backgroundColor: "#fff",
      marginTop:5
  
  
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