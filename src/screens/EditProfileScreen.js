import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput';
import SocialSignInButtons from "../components/SocialSignInButtons/SocialSignInButtons";
import CustomButton from "../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form';
import axios from "react-native-axios";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthFetch, setProfileDetaiils, registerAuthUser, flushAuthData, setAddress, setLoadingUser } from '../store/UserSlice';
import LoadingComp from '../components/LoadingComp';
import CustomSelect from '../components/CustomSelect';
import CustomMultiSelect from '../components/CustomMultiSelect';
import Snackbar from 'react-native-snackbar';
import { API } from '../service/apis/UserService';
import { DATA_API } from '../service/apis/DataService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const EditProfileScreen = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const [user, setuser] = useState({});
    const pwd = watch('password');
    const userauth = useSelector(state => state.userAuth?.user?.user);
    const profile = useSelector(state => state?.userAuth?.profile);

    const dispatch = useDispatch();
    const [selectedItems, setselectedItems] = useState([])

    const [country_list, setcountry_list] = useState([]);
    const [state_list, setstate_list] = useState([]);
    const [cities_list, setcities_list] = useState([]);


    const [country, setcountry] = useState(profile?.address?.country)
    const [state, setstate] = useState(profile?.address?.state)
    const [city, setcity] = useState(profile?.address?.city)


    const [stream, setStream] = useState(profile?.education?.school?.stream)
    const [Interest, setInterest] = useState(profile?.interest)
    const [branch, setBranch] = useState(profile?.education?.college?.branch)
    const [class_state, setclass_state] = useState(profile?.education?.school?.class_)
    const [from_state, setfrom_state] = useState(profile?.education?.formWhere)
    const [college_type, setcollege_type] = useState(profile?.education?.college?.college_type)

    const sch = useSelector(state => state?.SchFilterListSlice)
    const edu = useSelector(state => state?.EducationSlice)


    const modifyRegion = (jsonArr) => {
        return jsonArr.map(
          obj => {
            return {
              "_id": obj._id,
              "label": obj.name,
              "value": obj.iso2,
            }
          }
        );
    
      }


    useEffect(() => {
        const fetchCountries = async () => {
            const res = await DATA_API.GetCountries()
            if (res.status == '200') {
                setcountry_list(modifyRegion(res?.data))
            }
        }
        fetchCountries()
    }, [country])



    useEffect(() => {

        const fetchStates = async () => {
            const c = country?.value;
            const res = await DATA_API.GetStates(c)
            if (res.status == '200') {
                setstate_list(modifyRegion(res?.data))
            }
        }

        fetchStates()
    }, [country])

    useEffect(() => {

        const fetchCities = async () => {
            const c = country?.value;
            const s = state?.value
            const res = await DATA_API.GetCities(c, s)
            if (res.status == '200') {
                setcities_list(modifyRegion(res?.data))
            }
        }

        fetchCities()
    }, [state])

    const checkPresent = (name, arr) => {

        return arr.some(e => e.name === name);
    }

    const switchSubcription = async ({ prevInterest, currInterest }) => {

        await currInterest.forEach(async (item) => {
            if (!checkPresent(item?.name, prevInterest)) {
                await messaging()
                    .subscribeToTopic(item?.name)
                    .then(() => console.log(item?.name, 'Subscribed to topic!'));
            }

        })
        await prevInterest.forEach(async (item) => {
            if (!checkPresent(item?.name, currInterest)) {
                await messaging()
                    .unsubscribeFromTopic(item?.name)
                    .then(() => console.log(item?.name, 'UnsubscribeFromTopic to topic!'));
            }

        })
    }



    const onRegisterPressed = async data => {

        const { email, username } = data;
        const address_obj = {
            "country": country,
            "state": state,
            "city": city,
            "pincode": data.pincode
        }
        const payload = {
            "user_data": {
                "username": username,
                "address": address_obj,
                "education": {
                    "fromWhere":edu?.fromWhere,
                    "school": {
                        "class_": class_state,
                        "stream": stream
                    },
                    "college": {
                        "college_type": college_type,
                        "branch": branch
                    }
                },
                "interest": Interest
            }
        }
        try {
            const tempInterest = Interest;
            dispatch(setLoadingUser(true))
            await API.userUpdate({ payload: payload, userId: userauth?._id, token: userauth?.user?.token })
                .then(async (res) => {

                    console.log(res)

                    if (res?.status === 200) {
                        await switchSubcription({ prevInterest: profile?.interest, currInterest: tempInterest })
                        dispatch(setProfileDetaiils(res.data.data))
                        dispatch(setLoadingUser(false))
                        Snackbar.show({
                            text: 'Profile Updated...',
                            duration: Snackbar.LENGTH_SHORT,
                            action: {
                                text: 'OK',
                                textColor: 'green',
                                onPress: () => { dispatch(setProfileDetaiils(res.data.data)) },
                            },
                        })
                        navigation.navigate("PROFILE")
                    }
            })
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

    if (userauth?.isLoading) {
        return (
            <LoadingComp />
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* <View style={styles.header}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={{ padding: 3, backgroundColor: "#fff", borderRadius: 99, marginRight: 10 }}>
                        <Ionicons name="arrow-back" color="#000" size={23} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily: "Poppins-Bold", color: "#000" }}>EDIT PROFILE</Text>
                </View>
            </View> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.root}>
                    <Text style={styles.title}>Personal Details</Text>

                    <CustomInput
                        name="username"
                        defaultValue={profile?.username}
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
                        editable={false}
                        defaultValue={profile?.email}
                        control={control}
                        placeholder="Email"
                        rules={{
                            required: 'Email is required',
                            pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
                        }}
                    />


                    <Text style={styles.title}>Education Details</Text>

                    <CustomSelect
                        name="from where"
                        control={control}
                        list={sch?.fromWhere}
                        placeholder="From Where School Or College"
                        setValue={setfrom_state}
                        value={from_state}
                        rules={{
                            required: 'Stream is required',
                        }}
                        editable={false}
                    />
                    <CustomSelect
                        name="College Type"
                        control={control}
                        list={sch?.educationType}
                        placeholder="College Type"
                        setValue={setcollege_type}
                        value={college_type}
                        rules={{
                            required: 'College type is required',
                        }}
                        editable={false}
                    />


                    <CustomSelect
                        name="branch"
                        control={control}
                        list={sch?.branch}
                        defaultValue={profile?.education?.college?.branch}
                        placeholder="Branch"
                        setValue={setBranch}
                        value={branch}
                        rules={{
                            required: 'Stream is required',
                        }}
                        editable={false}
                        searchable={true}
                    />




                    <CustomSelect
                        name="Class"
                        control={control}
                        list={[
                            { id: 0, label: "Class 1" },
                            { id: 1, label: "Class 2" },
                            { id: 2, label: "Class 3" },
                            { id: 3, label: "Class 4" },
                            { id: 4, label: "Class 5" },
                            { id: 5, label: "Class 6" },
                            { id: 6, label: "Class 7" },
                            { id: 7, label: "Class 8" },
                            { id: 8, label: "Class 9" },
                            { id: 9, label: "Class 10" },
                            { id: 10, label: "Class 11" },
                            { id: 11, label: "Class 12" },


                        ]}
                        placeholder="Select Your Class"
                        setValue={setclass_state}
                        value={class_state}
                        rules={{
                            required: 'Class is required',
                        }}
                        editable={false}
                        searchable={false}
                    />


                    <CustomSelect
                        name="stream"
                        control={control}
                        list={sch?.stream}
                        defaultValue={profile?.education?.school?.stream}
                        placeholder="Stream"
                        setValue={setStream}
                        value={stream}
                        rules={{
                            required: 'Stream is required',
                        }}
                        editable={false}
                        searchable={true}
                    />



                    <CustomMultiSelect
                        name="interest"
                        control={control}
                        list={sch?.interest}
                        defaultValue={Interest ? Interest : []}
                        placeholder="interest"
                        setValue={setInterest}
                        value={Interest}
                        rules={{
                            required: 'Interest is required',
                        }}
                        editable={false}
                    />

                    <Text style={styles.title}>Address Details</Text>
                    <CustomSelect

                        name="country"
                        control={control}
                        list={country_list}
                        placeholder="Select country"
                        setValue={setcountry}
                        value={country}
                        rules={{
                            required: 'Country is required',
                        }}
                        editable={false}
                        searchable={true}
                        dataapi={true}
                    />
                    <CustomSelect
                        name="state"
                        control={control}
                        list={state_list}
                        placeholder="Select State"
                        setValue={setstate}
                        value={state}
                        rules={{
                            required: 'State is required',
                        }}
                        editable={false}
                        searchable={true}
                        dataapi={true}
                    />


                    <CustomSelect

                        name="city"
                        control={control}
                        list={cities_list}
                        placeholder="Select City"
                        setValue={setcity}
                        value={city}
                        rules={{
                            required: 'City is required',
                        }}
                        editable={false}
                        searchable={true}

                    />
                    <CustomInput
                        name="pincode"
                        editable={true}
                        defaultValue={profile?.address?.pincode}
                        control={control}
                        placeholder={"Pincode"}
                        rules={{
                            required: 'Pincode is required',
                        }}
                    />









                </View>
            </ScrollView>
            <View style={{ margin: 10 }}
            >
                <CustomButton
                    text="Update"
                    onPress={handleSubmit(onRegisterPressed)}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        textTransform: "uppercase",
        borderLeftColor: "#f5aa42",
        borderLeftWidth: 2, paddingLeft: 10,
        marginBottom: 10,
        marginTop: 10,
        fontFamily: "Poppins-SemiBold",
        color: '#15295c',

    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        elevation: 4
    },

});

export default EditProfileScreen;
