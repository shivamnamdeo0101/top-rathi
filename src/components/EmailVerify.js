import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomInput from './CustomInput/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from './CustomButton';
import Snackbar from 'react-native-snackbar';
import { API } from '../service/apis/UserService';
import { useSelector } from 'react-redux';


const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default function EmailVerify({ navigation, emailVerified, email, setcounter_callback }) {

    const [counter, setCounter] = React.useState(-1);
    const [email_sent, setemail_sent] = useState(false);

    const userauth = useSelector(state => state.userAuth)
    const [loading, setloading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();


    const payload = { userId: userauth?.profile?._id }

    useEffect(() => {



        const timer = counter > 0 && setInterval(() => { setCounter(counter - 1); setcounter_callback(counter) }, 1000);
        return () => clearInterval(timer);


    }, [counter]);



    const val = getValues();


    const SubmitEmail = async () => {

        if(counter > 0){
            return
        }

        setCounter(60)
        const data = { "email": email }
        try {
            if (!loading) {
                setloading(true)
                await API.userSendEmailVerifyLink(data)
                    .then((res) => {
                        setloading(false)
                        if (res.data.success) {
                            setemail_sent(true);
                            Snackbar.show({
                                text: 'Verificaion email has been sent, click on the link to verify your account',
                                duration: Snackbar.LENGTH_INDEFINITE,
                                action: {
                                    text: 'OK',
                                    textColor: 'green',
                                    onPress: () => { /* Do something. */ },
                                },
                            });


                        }

                    })

            }

        } catch (e) {
            setloading(false)
            Alert.alert('Oops', e.message);
        }



    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>


                <View style={styles.root}>

                    {/* <Text style={{ padding: 20, fontFamily: "Poppins-Regular", fontSize: 16, fontWeight: "bold", backgroundColor: "#f0f3f5", margin: 3, borderRadius: 10 }}>{email}</Text> */}

                    <CustomInput
                        name="email"
                        editable={false}
                        defaultValue={email}
                        control={control}
                        placeholder="Email"
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
                    {emailVerified && <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "green", textAlign: "center" }}>Email Verified</Text>}

                    {(counter === 0) && <Text style={{ fontSize: 12, fontFamily: "Poppins-Bold", color: "#f003", textAlign: "center" }}> Link has been expired, resend the verification email</Text>}



                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",

    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
