import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import CustomInput from '../components/CustomInput/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../components/CustomButton';
import Snackbar from 'react-native-snackbar';
import { API } from '../service/apis/UserService';

export default function ForgotPasswordScreen({ navigation }) {

    const [otp_sent, setotp_sent] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm();

    const val = getValues();


    const SubmitEmail = async data => {
        try {

            const { email } = data;
            API.userForgotPass(email)
            .then((res)=>{
                console.log(res)
                setotp_sent(true);
                Snackbar.show({
                    text: 'OTP sent to your email ',
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'OK',
                        textColor: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
            })

           

        } catch (e) {
            Alert.alert('Oops', e.message);
        }



    };
    const SubmitOtp = async data => {
        try {

            const { otp } = data;


        } catch (e) {
            Alert.alert('Oops', e.message);
        }



    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>


                {(!val.otp && !val.email) && <View style={styles.root}>
                    <CustomInput
                        name="email"
                        control={control}
                        placeholder="Enter your email"
                        rules={{
                            required: 'Email is required',
                        }}
                    />
                    <CustomButton
                        text={"Submit"}
                        onPress={handleSubmit(SubmitEmail)}
                    />


                </View>}

                {(val.email) && <View style={styles.root}>
                    <CustomInput
                        name="otp"
                        control={control}
                        placeholder="Enter your OTP"
                        rules={{
                            required: 'OTP is required',
                        }}
                    />
                    <CustomButton
                        text={"Submit OTP"}
                        onPress={handleSubmit(SubmitOtp)}
                    />


                </View>}






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
