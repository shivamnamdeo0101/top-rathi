import React ,{useState}from 'react';
import {View, Text, TextInput, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
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
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
              <Text style={{paddingLeft:5,paddingTop:5,color:"#15295c",fontFamily:"Poppins-SemiBold",fontSize:16}}>{name.toUpperCase()} </Text>
            
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between",
              paddingRight:16
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
            <TouchableOpacity style={{width:20,height:20}}>
           <Icon onPress={()=>setshow(!show)} name={!show ? "eye" : "eye-off"} type="ionicon" color="#1d2740" size={20} />
            </TouchableOpacity>
            }

            </View>
            
         
         
          </View>
          {error && (
            <Text style={{fontFamily:"Poppins-Regular",color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
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
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontFamily:"Poppins-Regular",
    flex:1,
  },
});

export default CustomInput;
