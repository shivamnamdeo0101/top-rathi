import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


 
import HomeScreen from '../screens/HomeScreen';
import CollectionScreen from '../screens/CollectionScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = AnimatedTabBarNavigator();

export default function TabStack({navigation}) {
  return (
    
    <Tab.Navigator initialRouteName='NEWS'  
      tabBarOptions={{
      labelStyle:{
        fontFamily:"Poppins-Bold",
      },
      activeTintColor: "#666",
      inactiveTintColor: "#222222"
    }}>
      
      <Tab.Screen name="NEWS" component={NewsScreen}
         options={{
          
          tabBarIcon: ({ focused, color, size=20 }) => (
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
        
          tabBarIcon: ({ focused, color, size=20 }) => (
              <Icon
                  name="user"
                  size={size }
                  color={color}
                  focused={focused}
              />
          )
        }}
      />
      <Tab.Screen  
       name="COLLECTION" component={CollectionScreen} 
         options={{
          tabBarIcon: ({ focused, color, size=20 }) => (
              <FontAwesome
                  name="bookmark"
                  size={size }
                  color={color}
                  focused={focused}
              />
          )
        }}
      />
      <Tab.Screen  
       name="SETTING" component={SettingScreen} 
         options={{
          tabBarIcon: ({ focused, color, size=20 }) => (
              <Icon
                  name="settings"
                  size={size }
                  color={color}
                  focused={focused}
              />
          )
        }}
      />
      
    </Tab.Navigator>
  )
}