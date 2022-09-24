import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileStartupScreen from "../screens/startup/ProfileStartupScreen"
const Stack = createNativeStackNavigator();

export default function ProfileStartupStack({navigation}) {

  const profile_done = false;
  return (
    <Stack.Navigator initialRouteName="ProfileStartup" mode="modal">
      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} />
    </Stack.Navigator>
  )
}
