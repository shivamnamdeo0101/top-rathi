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
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleButton from '../components/GoogleButton';


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


    
    if (userauth.isLoading) {
      return;
    }



    try {

      const res = await API.userLogin(data)

      console.log(res.data)

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
            style={[styles.logo, { height: height * 0.3, alignSelf: "center" }]}
            resizeMode="contain"
          />
          <Text style={{ textAlign: "center", fontFamily: "OpenSans-Bold", color: "#15295c", fontSize: 25 }}>Let's Sign You In</Text>

          <View style={{ marginBottom: 20 }}>
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
          </View>




          <CustomButton
            text={userauth.isLoading ? 'Loading...' : 'SIGN IN'}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Forgot password ?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />


          <Text style={{ fontFamily: "OpenSans-SemiBold", color: "#637994", fontSize: 14,textAlign:"center",margin:10 }}>or continue with</Text>

          <GoogleButton 
            action={"login"}
            navigation={navigation}
          />

              
           
            <CustomButton
            grayText="Don't have an account ?"
            text="Create one"
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
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"

  },
  logo: {
    maxWidth: 100,
    maxHeight: 100,
    borderRadius: 50
  },
});

export default LoginScreen;
