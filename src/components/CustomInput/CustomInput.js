import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';


const CustomInput = ({
  control,
  name,
  value,
  defaultValue,
  rules = {},
  placeholder,
  secureTextEntry,
  editable,
  keyboardType
}) => {

  const [show, setshow] = useState(secureTextEntry && true)

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          
          <View>
          <Text style={{ padding:10, paddingLeft:20, color: "#15295c", fontFamily: "OpenSans-SemiBold", fontSize: 16,textTransform:"capitalize" }}>{name} </Text>

          </View>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingRight: 16
            }}>
              <TextInput
                defaultValue={defaultValue?.toString()}
                editable={editable}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={show}
                keyboardType={keyboardType}
              />
              {secureTextEntry &&
                <TouchableOpacity style={{ width: 20, height: 20 }}>
                  <Icon onPress={() => setshow(!show)} name={!show ? "eye" : "eye-off"} type="ionicon" color="#1d2740" size={20} />
                </TouchableOpacity>
              }

            </View>



          </View>
          {error && (
            <Text style={{ fontFamily: "OpenSans-Regular", color: 'red', alignSelf: 'stretch',paddingLeft:10 }}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 2,
    borderRadius:33,
    paddingLeft:10,
    width:"95%",
    alignItems:"center",
    alignSelf:"center"
   
  },
  input: {
    fontFamily: "OpenSans-Regular",
    flex: 1,

  },
});

export default CustomInput;
