import { View, Text, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../service/apis/UserService'
import FetchCollection from './FetchCollection'
import LoadingComp from './LoadingComp'
import NewsSlice, { setCollection } from '../store/NewsSlice'

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
    
    
  return (
    <View style={{flex:1}}>
      <ScrollView>
        {collection?.map((item,index)=>
            <View key={index}>
                <FetchCollection navigation={navigation} postId={item.postId}/>
            </View>
        )}
      </ScrollView>
    </View>
  )
}

export default CollectionComp