import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileStartupScreen from '../screens/startup/ProfileStartupScreen';

const Stack = createNativeStackNavigator();

export default function AppStack({navigation}) {

  const profile_done = false;
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal">
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} />
    </Stack.Navigator>
  )
}
