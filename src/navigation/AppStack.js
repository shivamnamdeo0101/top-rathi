import { View, Text } from 'react-native'
import React from 'react'
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

const Stack = createNativeStackNavigator();

export default function AppStack({navigation}) {

  const profile_done = false;
  const userauth = useSelector(state => state.userAuth)
  return (
    <Stack.Navigator initialRouteName={!userauth.isFirstTime?"Home":"ProfileStartup"} >
      <Stack.Screen name="Home" component={TabStack}  options={{headerShown:false}} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="NewsComp" component={NewsComp} options={{headerShown:false}}/>
      <Stack.Screen name="WebView" component={WebViewScreen} />
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}} />

      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} />
      <Stack.Screen name="SchoolStartup" component={SchoolStartupScreen} />
      <Stack.Screen name="CollegeStartup" component={CollegeStartupScreen} />

      <Stack.Screen name="InsightScreen" component={InsightScreen} options={{headerShown:false}}/>

      
      
    </Stack.Navigator>
  )
}
