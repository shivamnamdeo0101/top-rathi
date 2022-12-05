import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../components/CustomInput/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import { API } from '../service/apis/UserService';


const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
export default function ForgotPasswordScreen({ navigation }) {

    const [email_sent, setemail_sent] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    const val = getValues();


    const SubmitEmail = async data => {
        try {

            await API.userForgotPass(data)
                .then((res) => {
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
                    <CustomButton
                        text={"Submit"}
                        onPress={handleSubmit(SubmitEmail)}
                    />


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
