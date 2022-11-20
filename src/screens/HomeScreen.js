import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flushAuthData,setLoadingUser } from '../store/UserSlice'
import LoadingComp from '../components/LoadingComp';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.userAuth.user.user);
  const profile = useSelector(state=>state.userAuth.profile);
  const data = JSON.stringify(user);
  const [loading, setloading] = useState(false);
  

  const Logout = async  ()=>{
    setloading(true);
    try {
      setTimeout(()=>{
        dispatch(flushAuthData())
      },4000)
      
     
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    
    setloading(false);
    
   
  }

  if(loading){
    return(
      <LoadingComp/>
    )
  }
  


  return (
    <View>
      <Text >{
        data
      }</Text>
      <TouchableOpacity onPress={()=>Logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}