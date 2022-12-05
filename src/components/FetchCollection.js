import { View, Text, Image, TouchableOpacity,Dimensions } from 'react-native'
import React,{useEffect,useState} from 'react'
import { NEWS_API } from '../service/apis/NewsService';
import NewsComp from './NewsComp';

const FetchCollection = ({navigation,postId}) => {
    const [post, setpost] = useState(null);
    
    const {width: screenWidth} = Dimensions.get('window');

    useEffect(() => {
        const fetchData = async()=>{
            const res = await NEWS_API.GetNewsById(postId);
            if(res.data.success){
                setpost(res.data.data)
            }
        }
        fetchData()
    }, [post])


  return (
    <View>
        {
            post == null? <TouchableOpacity style={{margin:10}}>
            <View  style={{ width: screenWidth-60, height: 200, borderColor: "#eee", borderWidth: 1, marginTop: 10 }}>
            <Text>Post Unavailable</Text>
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>navigation.navigate("NewsComp",{"post":post})} style={{margin:10}}>
            <Image source={{uri:post.image}} style={{ width: screenWidth-60, height: 200, borderColor: "#eee", borderWidth: 1, marginTop: 10 }} />
            <Text>{post.title}</Text>
        </TouchableOpacity>
        }
    </View>
  )
}

export default FetchCollection