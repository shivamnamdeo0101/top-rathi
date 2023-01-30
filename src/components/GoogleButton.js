import { View, Text,TouchableOpacity,Image, Alert } from 'react-native'
import React,{useEffect} from 'react'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { getAuthSuccess, setProfileDetaiils, setProfileDone, setUserDetails } from '../store/UserSlice';
import { API } from '../service/apis/UserService';

const GoogleButton = ({action,navigation}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/userinfo.profile'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '418906309485-jv9r66slivispvl3kl7l8uo0rrgil869.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
          });
    }, [])
    

    const onSignInPressed = async data => {
    
        try {
            
          const res = await API.googleLogin(data)
          if (res.status === 200) {
            
            dispatch(setUserDetails(res.data.data))
            dispatch(setProfileDetaiils(res.data.data.user))
            dispatch(getAuthSuccess())
            
            if (res.data.data.user.isProfileDone) {
              dispatch(setProfileDone())
            }

            

            // await GoogleSignin.revokeAccess();
            // } else {
            //   navigation.navigate("ProfileStartup")
            // }
          }
    
    
        } catch (e) {
          Alert.alert('Oops', e.message);
        }
    
    
    
      };

      const onRegisterPressed = async data => {
        

        try {

            const res = await API.googleRegister(data)

            console.log(res?.data)

            if (res.status === 200) {
                dispatch(setUserDetails(res?.data?.data))
                dispatch(setProfileDetaiils(res?.data?.data?.user))
                if (res?.data?.data?.user?.isSuccess) {
                    dispatch(getAuthSuccess())
                } else {
                    navigation.navigate("ProfileStartup")
                }
            }
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };


    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const payload = {
            "email":userInfo?.user?.email,
            "password":userInfo?.user?.email,
            "profile_img":userInfo?.user?.photo,
            "username":userInfo?.user?.name,
          }
          if(action === "login"){
            await onSignInPressed(payload)
          }else{
            await onRegisterPressed(payload)
          }
          
          
        } catch (error) {
            console.log(error)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    };

    const loginAction = ()=>{
        signIn()
    }

    const registerAction = ()=>{
        signIn()
    }

    const signOut = async ()=>{
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    }

    return (
        <TouchableOpacity onPress={()=>action ==="login" ? loginAction() : registerAction()} style={{ flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 33, borderWidth: 1, borderColor: "#e8e8e8", backgroundColor: "#fff", alignSelf: "center" }}>
            <Image source={{ uri: "https://ik.imagekit.io/lajz2ta7n/LOGO/google.png" }} style={{ width: 20, height: 20, borderRadius: 33, marginRight: 10 }} />
            <Text style={{ fontFamily: "OpenSans-SemiBold", color: "#15295c", fontSize: 14 }}>Continue With Google</Text>
        </TouchableOpacity>
    )
}

export default GoogleButton