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
        const val = parseInt((counter - Date.now()) / 1000)

        if(val < 60 && val > 0){
            Alert.alert("Verification is")

            return
        }
        
        setloading(true)

        setCounter(Date.now() + 60000)
        const data = { "email": email }
        try {
          
               
                await API.userSendEmailVerifyLink(data)
                    .then((res) => {
                        setloading(false)
                        if (res.data.success) {
                            setemail_sent(true);
                            setloading(false)
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

            

        } catch (e) {
            setloading(false)
            Alert.alert('Oops', e.message);
        }



    };


    return (
        <View style={styles.root}>
         
                <ScrollView>

                    {/* <Text style={{ padding: 20, fontFamily: "Poppins-Regular", fontSize: 16, fontWeight: "bold", backgroundColor: "#f0f3f5", margin: 3, borderRadius: 10 }}>{email}</Text> */}

                    <Text style={{ padding: 16, paddingLeft: 10, fontFamily: "Poppins-Regular", borderRadius: 10, borderColor: "#ccc", borderWidth: 2, }}>{email}</Text>
                    {!email_sent && <CustomButton
                        
                        text={loading ? "Sending email..." :  "Send the verification Link"}
                        onPress={()=>SubmitEmail()}
                    />}
                    
                    {(Date.now() <= counter) && <Text style={{ color:"green",fontFamily:"Poppins-SemiBold"}}>Email sent and link expired in {parseInt((counter - Date.now()) / 1000)} second</Text>}

                    {(Date.now() > counter && email_sent) && <Text style={{ fontSize: 12, fontFamily: "Poppins-Bold", color: "#f003", textAlign: "center",marginTop:10 }}> Link has been expired, resend the verification email</Text>}

                </ScrollView>
            {(email_sent)  && <Text style={{color:"green",fontFamily:"Poppins-SemiBold" ,alignSelf:"flex-start"}} onPress={()=>SubmitEmail()} > Didn't get the email ? Resend Email</Text>}

        </View>
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
