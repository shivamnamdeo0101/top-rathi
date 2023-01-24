import { View, Text } from 'react-native'
import React from 'react'

const SchDetailsScreen = ({route,navigation}) => {

  const {id} = route?.params;


  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <Text>{id}</Text>
    </View>
  )
}

export default SchDetailsScreen