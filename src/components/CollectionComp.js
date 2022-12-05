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
    
  
    
    
  return (
    <View>
      <ScrollView horizontal={true}>
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