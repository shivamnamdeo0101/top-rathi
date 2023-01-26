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

import { useDispatch, useSelector } from 'react-redux';
import SearchScreen from '../screens/SearchScreen';
import InsightScreen from '../screens/InsightScreen';
import { API } from '../service/apis/UserService';
import EmailVerifyScreen from '../components/EmailVerify';
import AddressScreen from "../screens/startup/AddressScreen";
import NewsScreen from '../screens/NewsScreen';
import CollegeBranchScreen from '../screens/startup/CollegeBranchScreen';

import SchoolStreamScreen from '../screens/startup/SchoolStreamScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SchFilterScreen from '../screens/SchlorshipScreen';
import SchDetailsScreen from '../screens/SchDetailsScreen';
import { setAuthority, setBranchList, setCaste, setEducationType, setExamList, setFromWhere, setInterestList, setRegion, setStreamList } from '../store/SchFilterSlice';
import { SCH_API } from '../service/apis/SchService';
import { TabBar } from 'react-native-tab-view';
import SchlorshipScreen from '../screens/SchlorshipScreen';

const Stack = createNativeStackNavigator();

export default function AppStack({navigation}) {
  const isProfileDone = useSelector((state)=>state?.userAuth?.user?.user?.isProfileDone)
  

  
  return (
    <Stack.Navigator initialRouteName={"Home"} 
    screenOptions={{
      headerShadowVisible: false, headerTintColor: "#f5aa42",
      headerTitleStyle: {
        fontFamily: "OpenSans-SemiBold"
      }
      

    }}


    >


      <Stack.Screen name="Home" component={TabStack}  options={{headerShown:false,}} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}  options={{ title: "Edit Profile" }}/>
      <Stack.Screen name="NewsComp" component={NewsComp} options={{headerShown:false}}/>
      <Stack.Screen name="WebView" component={WebViewScreen}  options={{headerShown:false}} />
      <Stack.Screen name="Search" component={SearchScreen}  />
      <Stack.Screen name="Insight" component={InsightScreen} options={{headerShown:false}}/>
      <Stack.Screen name="SchDetails" component={SchDetailsScreen}  options={{ title: "Schlorship", }}/>

      {/* <Stack.Screen name="SchFilter" component={SchFilterScreen}  options={{ title: "Schlorship Form" ,}}/>
      <Stack.Screen name="Schlorship" component={SchlorshipScreen} /> */}

      <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: "Notifications" }}/>


      

      
     


    </Stack.Navigator>
  )
}
