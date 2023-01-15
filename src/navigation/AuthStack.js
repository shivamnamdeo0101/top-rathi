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
    <Stack.Navigator initialRouteName="Login" mode="modal"
      screenOptions={{
        headerShadowVisible: false, headerTintColor: "#f5aa42",
        headerTitleStyle: {
          fontFamily: "OpenSans-SemiBold"
        }

      }}

    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Signup" }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: "Forgot Password" }} />

      <Stack.Screen name="ProfileStartup" component={ProfileStartupScreen} options={{ title: "Are you ?", }} />
      <Stack.Screen name="SchoolStartup" component={SchoolStartupScreen} options={{ title: "School Details" }} />
      <Stack.Screen name="CollegeStartup" component={CollegeStartupScreen} options={{ title: "College Details" }} />
      <Stack.Screen name="CollegeBranch" component={CollegeBranchScreen} options={{ title: "College Details" }} />
      <Stack.Screen name="SchoolStream" component={SchoolStreamScreen} options={{ title: "School Details" }} />
      <Stack.Screen name="Address" component={AddressScreen} options={{ title: "Address Details" }} />
    </Stack.Navigator>
  )
}
