import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'


export default function LoadingComp() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large"  color="#f2c305"/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})