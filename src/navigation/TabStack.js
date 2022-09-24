import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import AppStack from './AppStack';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
const Tab = AnimatedTabBarNavigator();

export default function TabStack({navigation}) {
  return (
    <Tab.Navigator initialRouteName='Home' tabBarOptions={{
      activeTintColor: "#000",
      inactiveTintColor: "#000",
      labelStyle:{
        color:"#000"
      }
     
    }}>
      <Tab.Screen name="Ask" component={AppStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                  name="head-question-outline"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
        }}
      />
      <Tab.Screen name="News" component={NewsScreen}
         options={{
          tabBarIcon: ({ focused, color, size }) => (
              <Icon
                  name="home"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
        }}
      
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
         options={{
          tabBarIcon: ({ focused, color, size }) => (
              <Icon
                  name="user"
                  size={size ? size : 24}
                  color={focused ? color : "#222222"}
                  focused={focused}
                  color={color}
              />
          )
        }}
      />
    </Tab.Navigator>
  )
}