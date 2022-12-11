import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';


import CustomInput from '../components/CustomInput/CustomInput';
import SocialSignInButtons from "../components/SocialSignInButtons/SocialSignInButtons";

import CustomButton from "../components/CustomButton/CustomButton";

import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthFetch } from '../store/UserSlice';
import LoadingComp from '../components/LoadingComp';


const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const LoginScreen = ({ navigation }) => {
  
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userauth = useSelector(state => state.userAuth);




  console.log(userauth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {
   
    if (userauth.isLoading) {
      return;
    }

    console.log("Login",data)

    try {

      dispatch(getAuthFetch(data));

    
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    
   
    
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('Register');
  };


if(userauth.isLoading){
  return(
    <LoadingComp/>
  )
}

  return (
    <View style={{flex:1,backgroundColor:"#fff",}}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={require("../assets/logo.png")}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
          }}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        

        <CustomButton
          text={userauth.isLoading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />
        
        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    
  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    borderRadius:50 
  },
});

export default LoginScreen;
