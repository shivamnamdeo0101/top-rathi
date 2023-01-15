import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor, grayText }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
        {grayText && <Text style={{fontFamily:"OpenSans-Regular", marginBottom:2,marginRight:8}}>
          {grayText}
        </Text>}
        <Text
          style={[
            styles.text,
            styles[`text_${type}`],

            fgColor ? { color: fgColor, fontFamily: "OpenSans-SemiBold" } : {},
          ]}>
          {text}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    padding: 14,
    alignItems: 'center',
    borderRadius: 33,
    alignSelf:"center"

  },

  container_PRIMARY: {
    backgroundColor: '#f5aa42',
    
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    color: 'white',
    fontFamily: "OpenSans-SemiBold",
    textTransform: "capitalize",

  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: '#f5aa42',
    fontFamily: "Poppins-SemiBold",
    textTransform: "capitalize",

  },
});

export default CustomButton;
