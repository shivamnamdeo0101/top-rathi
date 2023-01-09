import { View, Text, ScrollView,TouchableOpacity ,Image,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../service/apis/UserService'
import LoadingComp from './LoadingComp'
import NewsSlice, { setCollection } from '../store/NewsSlice'
import moment from 'moment'

const CollectionComp = ({navigation,user}) => {

    const dispatch = useDispatch()
    const collection = useSelector(state=>state.NewsSlice.collection);
    const [loading, setloading] = useState(true)
    useEffect(() => {
        const fetchData = async()=>{
            const res = await API.userGetCollection(user._id);
            if(res.data.success){
                dispatch(setCollection(res.data.data))
                setloading(false);
            }
        }
        fetchData()

    }, [collection])
    
  if(loading){
    return(
      <LoadingComp />
    )
  }
  
  if(collection.length === 0){
    return(
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#000",fontFamily:"Poppins-Bold"}}>You don't have any collection !</Text>
      </View>
    )
  }
  const routeNavigation = (post)=>{
    if(post?.news_type === "feed" || post?.news_type === "slide" ){
      navigation.navigate("NewsComp", { post: post })
    }else if(post?.news_type === "insight"){
      navigation.navigate("Insight", { post: post })
    }
    
  }
    
    
  return (
    <View style={{flex:1}}>
      <ScrollView>
        {collection?.map((post,index)=>
            <View key={index}>
                <TouchableOpacity style={styles.news_comp} key={post?._id} onPress={() => routeNavigation(post)}>
                        <Image style={styles.post_img} source={{ uri: post?.image }} />

                        <View style={styles.content_data}>

                            <View style={styles.tags_row}>
                                {post?.tags?.map((tag) =>
                                    <View key={tag._id}>
                                        <Text style={{ marginRight: 5, fontFamily: "Poppins-Regular", color: "#f03", fontSize: 12 }}>{tag?.value}</Text>
                                    </View>
                                )}
                            </View>


                            <Text style={styles.title}>{post?.title?.length > 60 ? post?.title?.substring(0, 60) + "..." : post?.title}</Text>
                            <Text style={styles.timestamp}>{moment(post?.timestamp).fromNow()}</Text>
                        </View>
                    </TouchableOpacity>
            </View>
        )}
      </ScrollView>
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