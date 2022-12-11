import { View, Text, ScrollView } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { API } from '../service/apis/UserService'
import FetchCollection from './FetchCollection'

const CollectionComp = ({navigation,user}) => {

    const [collection, setcollection] = useState([]);

    useEffect(() => {
        const fetchData = async()=>{
            const res = await API.userGetCollection(user._id);
            if(res.data.success){
                setcollection(res.data.data)
            }
        }
        fetchData()
    }, [collection])
    
  
  if(collection.length === 0){
    return(
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#000",fontFamily:"Poppins-Bold"}}>You don't have any collection !</Text>
      </View>
    )
  }
    
    
  return (
    <View>
      <ScrollView>
        {collection && collection.map((item,index)=>
            <View key={index}>
                <FetchCollection navigation={navigation} postId={item.postId}/>
            </View>
        )}
      </ScrollView>
    </View>
  )
}

export default CollectionComp