import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flushAuthData,setLoadingUser } from '../store/UserSlice'
import LoadingComp from '../components/LoadingComp';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.userAuth);
  const data = JSON.stringify(user);
  const [loading, setloading] = useState(false);
  console.log(user.isLoading)

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