import { View, Text } from 'react-native'
import React,{useEffect,useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileStartupScreen from '../screens/startup/ProfileStartupScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TabStack from './TabStack';
import NewsComp from '../components/NewsComp';
import WebViewScreen from '../screens/WebViewScreen';
import SchoolStartupScreen from '../screens/startup/SchoolStartupScreen';
import CollegeStartupScreen from '../screens/startup/CollegeStartupScreen';

import { useSelector } from 'react-redux';
import SearchScreen from '../screens/SearchScreen';
import InsightScreen from '../screens/InsightScreen';
import { API } from '../service/apis/UserService';
import EmailVerifyScreen from '../components/EmailVerify';
import AddressScreen from "../screens/startup/AddressScreen";
import NewsScreen from '../screens/NewsScreen';
import CollegeBranchScreen from '../screens/startup/CollegeBranchScreen';

import SchoolStreamScreen from '../screens/startup/SchoolStreamScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

export default function AppStack({navigation}) {
  const isProfileDone = useSelector((state)=>state?.userAuth?.user?.user?.isProfileDone)
  console.log(isProfileDone)
  
  
  return (
    <Stack.Navigator initialRouteName={"Home"} >
      <Stack.Screen name="Home" component={TabStack}  options={{headerShown:false,}} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="NewsComp" component={NewsComp} options={{headerShown:false}}/>
      <Stack.Screen name="WebView" component={WebViewScreen}  options={{headerShown:false}}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />
      <Stack.Screen name="Insight" component={InsightScreen} options={{headerShown:false}}/>

     
      <Stack.Screen name="Notification" component={NotificationScreen} options={{headerShown:false}}/>


      

      
     


    </Stack.Navigator>
  )
}
