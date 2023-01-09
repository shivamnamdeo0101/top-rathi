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
import { getAuthFetch, getAuthSuccess, setProfileDetaiils, setProfileDone, setUserDetails } from '../store/UserSlice';
import LoadingComp from '../components/LoadingComp';
import { API } from '../service/apis/UserService';


const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const LoginScreen = ({ navigation }) => {

  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userauth = useSelector(state => state.userAuth);



  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async data => {


    console.log(data)

    if (userauth.isLoading) {
      return;
    }



    try {

      const res = await API.userLogin(data)
      
      if (res.status === 200) {
        dispatch(setUserDetails(res.data.data))
        dispatch(setProfileDetaiils(res.data.data.user))
        dispatch(getAuthSuccess())
        
        if (res.data.data.user.isProfileDone) {
          dispatch(setProfileDone())
        }
        // } else {
        //   navigation.navigate("ProfileStartup")
        // }
      }


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


  if (userauth.isLoading) {
    return (
      <LoadingComp />
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.root}>
          <Image
            source={require("../assets/logo.png")}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
        <Text style={{textAlign:"center", fontFamily: "Poppins-Bold", color: "#15295c", fontSize: 23 }}>Let's Sign You In</Text>

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
            text={userauth.isLoading ? 'Loading...' : 'SIGN IN'}
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
    flex:1,
    alignItems: 'center',
    padding: 20,
    backgroundColor:"#fff"

  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 50
  },
});

export default LoginScreen;
