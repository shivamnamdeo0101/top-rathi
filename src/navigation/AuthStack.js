import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen"
import ProfileStartupScreen from '../screens/startup/ProfileStartupScreen';
import SchoolStartupScreen from '../screens/startup/SchoolStartupScreen';
import CollegeStartupScreen from '../screens/startup/CollegeStartupScreen';
import AddressScreen from '../screens/startup/AddressScreen';
import CollegeBranchScreen from '../screens/startup/CollegeBranchScreen';
import SchoolStreamScreen from '../screens/startup/SchoolStreamScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" mode="modal">
      <Stack.Screen name="Login" component={LoginScreen} options={{title:"LOGIN"}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{title:"SIGNUP"}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{title:"FORGOT PASSWORD"}} />
      
      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} options={{title:"FROM WHERE"}} />
      <Stack.Screen name="SchoolStartup" component={SchoolStartupScreen} options={{title:"SCHOOL DETAILS"}}/>
      <Stack.Screen name="CollegeStartup" component={CollegeStartupScreen} options={{title:"COLLEGE DETAILS"}}/>
      <Stack.Screen name="CollegeBranch" component={CollegeBranchScreen} options={{title:"COLLEGE DETAILS"}}/>
      <Stack.Screen name="SchoolStream" component={SchoolStreamScreen} options={{title:"SCHOOL DETAILS"}}/>
      <Stack.Screen name="Address" component={AddressScreen} options={{title:"ADDRESS DETAILS"}}/>
    </Stack.Navigator>
  )
}
