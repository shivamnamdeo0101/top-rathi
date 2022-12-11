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


    useEffect(() => {



        const timer = counter > 0 && setInterval(() => { setCounter(counter - 1) }, 1000);
        return () => clearInterval(timer);


    }, [counter]);


    const SubmitEmail = async data => {
        
        if (counter > 0) {
            return
        }

        setCounter(60)
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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>


                <View style={styles.root}>
                    <CustomInput
                        name="email"
                        control={control}
                        placeholder="Enter your email"
                        rules={{

                            required: 'Email is required',
                            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                        }}
                    />
                    {!(email_sent && counter > 0) && <CustomButton

                        text={loading ? "Sending email..." : "Send the verification Link"}
                        onPress={loading ? handleSubmit : handleSubmit(SubmitEmail)}
                    />}

                    {(email_sent && counter > 0) && <Text style={{ fontSize: 14, fontFamily: "Poppins-Bold", color: "green", textAlign: "center" }}>Email sent and link expired in {counter} second</Text>}
                    {true && <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "green", textAlign: "center" }}>Email Verified</Text>}

                    {(counter === 0) && <Text style={{ fontSize: 12, fontFamily: "Poppins-Bold", color: "#f003", textAlign: "center" }}> Link has been expired, resend the verification email</Text>}



                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
