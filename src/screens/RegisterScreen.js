import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput';
import SocialSignInButtons from "../components/SocialSignInButtons/SocialSignInButtons";
import CustomButton from "../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import axios from "react-native-axios";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthFetch, setUserDetails, registerAuthUser, flushAuthData, getAuthSuccess, setProfileDetaiils } from '../store/UserSlice';
import { userRegister } from "../service/apis/UserService"
import LoadingComp from '../components/LoadingComp';
import { API } from "../service/apis/UserService";
import GoogleButton from '../components/GoogleButton';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterScreen = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const [user, setuser] = useState({});
    const pwd = watch('password');
    const userauth = useSelector(state => state.userAuth);
    const dispatch = useDispatch();
    const { height } = useWindowDimensions();


    const onRegisterPressed = async data => {
        const { password, email, name } = data;
        const payload = {

            "username": name,
            "email": email,
            "password": password,
            "education": {
                "school": {
                    "class_": "",
                    "stream": ""
                },
                "college": {
                    "college_type": "",
                    "branch": ""
                }
            },
            "address": {
                "country": "",
                "state": "",
                "city": ""
            },
            "interest": [],
            "notifications": []

        }
        try {

            const res = await API.userRegister(payload)

            console.log(res?.data)

            if (res.status === 200) {
                dispatch(setUserDetails(res.data.data))
                dispatch(setProfileDetaiils(res.data.data.user))
                if (res.data.data.user.isSuccess) {
                    dispatch(getAuthSuccess())
                } else {
                    navigation.navigate("ProfileStartup")
                }
            }
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('Login');
    };

    const onTermsOfUsePressed = () => {
        dispatch(flushAuthData())
        console.warn('onTermsOfUsePressed');
    };

    const onPrivacyPressed = () => {
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
                    <Text style={{ textAlign: "center", fontFamily: "Poppins-Bold", color: "#15295c", fontSize: 23 }}>Create An Account</Text>

                    <View style={{ marginBottom: 20 }}>
                        <CustomInput
                            name="name"
                            control={control}
                            placeholder="Name"
                            rules={{
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Name should be at least 3 characters long',
                                },
                                maxLength: {
                                    value: 24,
                                    message: 'Name should be max 24 characters long',
                                },
                            }}
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
                            control={control}
                            placeholder="Password"
                            secureTextEntry
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password should be at least 8 characters long',
                                },
                            }}
                        />
                        <CustomInput
                            name="confirm-password"
                            control={control}
                            placeholder="Confirm Password"
                            secureTextEntry
                            rules={{
                                validate: value => value === pwd || 'Password do not match',
                            }}
                        />

                    </View>

                    <CustomButton

                        text="SIGNUP"
                        onPress={handleSubmit(onRegisterPressed)}
                    />

                    <Text style={{ ...styles.text, marginTop: 10, padding: 10 }}>
                        By registering, you confirm that you accept our{' '}
                        <Text style={styles.link} onPress={onTermsOfUsePressed}>
                            Terms of Use
                        </Text>{' '}
                        and{' '}
                        <Text style={styles.link} onPress={onPrivacyPressed}>
                            Privacy Policy
                        </Text>
                    </Text>

                    <GoogleButton
                        action={"register"}
                        navigation={navigation}
                    />


                    <CustomButton
                        grayText={"Have an account ?"}
                        text=" Sign in"
                        onPress={onSignInPress}
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
        backgroundColor: "#fff",
        padding: 20,
        paddingTop:0,
    },
    title: {
        fontSize: 24,
        fontFamily: "OpenSans-SemiBold",
        color: '#051C60',
        margin: 10,
    },
    text: {
        fontFamily: "OpenSans-Regular",
        color: 'gray',
    },
    link: {
        color: '#FDB075',
    },
    logo: {
        maxWidth: 70,
        maxHeight: 70,
        borderRadius: 50
    },
});

export default RegisterScreen;