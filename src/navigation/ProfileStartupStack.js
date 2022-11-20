import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileStartupScreen from "../screens/startup/ProfileStartupScreen";
import SchoolStartupScreen from '../screens/startup/SchoolStartupScreen';
import CollegeStartupScreen from '../screens/startup/CollegeStartupScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStartupStack({navigation}) {

  const profile_done = false;
  return (
    <Stack.Navigator initialRouteName="ProfileStartup">
      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} />
      <Stack.Screen name="SchoolStartup" component={SchoolStartupScreen} />
      <Stack.Screen name="CollegeStartup" component={CollegeStartupScreen} />
      
    </Stack.Navigator>
  )
}
