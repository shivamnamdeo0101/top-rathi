import { View, Text } from 'react-native'
import React from 'react'

export default function NewsScreen({navigation}) {
  return (
    <View>
      <Text onPress={()=>navigation.navigate("Home")}>NewsScreen</Text>
    </View>
  )
}