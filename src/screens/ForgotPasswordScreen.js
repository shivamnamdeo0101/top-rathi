import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInput from '../components/CustomInput/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import { API } from '../service/apis/UserService';


const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function ForgotPasswordScreen({ navigation }) {
    const [counter, setCounter] = React.useState(-1);
    const [loading, setloading] = useState(false)
    const [email_sent, setemail_sent] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    const val = getValues();




    const SubmitEmail = async data => {
        setloading(true)
        try {


            await API.userForgotPass(data)
                .then((res) => {
                    setloading(false)
                    if (res.data.success) {

                        setemail_sent(true);
                        Snackbar.show({
                            text: 'Email has been sent, click on the link to reset your password',
                            duration: Snackbar.LENGTH_INDEFINITE,
                            action: {
                                text: 'OK',
                                textColor: 'green',
                                onPress: () => { /* Do something. */ },
                            },
                        });
                    }

                })



        } catch (e) {
            Alert.alert('Oops', e.message);
        }



    };


    return (
        <View style={styles.root}>


            <ScrollView>
                <Text style={{ fontFamily: "OpenSans-SemiBold", color: "#15295c", fontSize: 16, paddingRight: 20 }}>Please enter the emaill address associated with your account.</Text>
                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Enter your email"
                    rules={{

                        required: 'Email is required',
                        pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                    }}
                />

            </ScrollView>
            <CustomButton

                text={loading ? "Sending email..." : "Send the verification Link"}
                onPress={loading ? handleSubmit : handleSubmit(SubmitEmail)}
            />

            {(email_sent) && <Text style={{ fontSize: 14, fontFamily: "Poppins-Bold", color: "green", textAlign: "center" }}>Email sent and link expired 1 min</Text>}

            {/* {(counter === 0) && <Text style={{ fontSize: 12, fontFamily: "Poppins-Bold", color: "#f003", textAlign: "center" }}> Link has been expired, resend the verification email</Text>} */}





        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        padding: 20,
    },

});
