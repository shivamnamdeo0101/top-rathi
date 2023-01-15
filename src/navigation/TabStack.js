import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import HomeScreen from '../screens/HomeScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingScreen from '../screens/SettingScreen';
import AppStack from './AppStack';

const Tab = createBottomTabNavigator();

export default function TabStack({ navigation }) {
  return (

    <Tab.Navigator initialRouteName='NEWS'

      screenOptions={{
        tabBarActiveTintColor: '#f5aa42',
        tabBarLabelStyle: { fontSize: 13, marginBottom: 2 },
        tabBarIconStyle: { fontSize: 14, marginBottom: 2 },
        tabBarStyle: { height: 55 }, headerShown: false
      }}

    >

      <Tab.Screen name="NEWS" component={NewsScreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ focused, color, size = 16 }) => (
            <Icon
              name="home"
              size={size}
              color={color}
              focused={focused}
            />
          )
        }}

      />
      <Tab.Screen name="PROFILE" component={ProfileScreen}

        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size = 16 }) => (
            <Icon
              name="user"
              size={size}
              color={color}
              focused={focused}
            />
          )
        }}
      />
     
      <Tab.Screen
        name="COLLECTION" component={CollectionScreen}
        options={{
          tabBarLabel: 'Collection',
          tabBarIcon: ({ focused, color, size = 16 }) => (
            <FontAwesome
              name="bookmark"
              size={size}
              color={color}
              focused={focused}
            />
          )
        }}
      />

      <Tab.Screen
        name="SETTING" component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, color, size = 20 }) => (
            <Icon
              name="settings"
              size={size}
              color={color}
              focused={focused}
            />
          )
        }}
      />

    </Tab.Navigator>
  )
}