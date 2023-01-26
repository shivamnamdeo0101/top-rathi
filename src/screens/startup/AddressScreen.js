import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setClass, setFromWhere, setStream } from '../../store/EducationSlice';
import { getAuthSuccess, setAddress, setFirstTime, setProfileDone } from '../../store/UserSlice';
import { API } from '../../service/apis/UserService';
import { DATA_API } from '../../service/apis/DataService';
import CustomInput from "../../components/CustomInput";

export default function AddressScreen({ navigation }) {


    const dispatch = useDispatch()
    const { control, handleSubmit, watch } = useForm();
    const [user, setuser] = useState({});
    const userauth = useSelector(state => state.userAuth.profile);
    const userToken = useSelector(state => state?.userAuth?.user?.token)
    const [country_list, setcountry_list] = useState([]);
    const [state_list, setstate_list] = useState([]);
    const [cities_list, setcities_list] = useState([]);

    const profileDone = useSelector((state) => state?.userAuth?.user?.isProfileDone)

    const edu = useSelector(state => state.EducationSlice)

    const [country, setcountry] = useState({})
    const [state, setstate] = useState({})
    const [city, setcity] = useState({})

    const sch = useSelector(state => state?.SchFilterListSlice)


    const modifyRegion = (jsonArr, type) => {
        return jsonArr.map(
            obj => {
                return {
                    "_id": obj?._id,
                    "label": obj?.name,
                    "value": obj?.iso2,
                }
            }
        );

    }

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await DATA_API.GetCountries()
            if (res.status == '200') {
                console.log()
                setcountry_list(modifyRegion(res?.data, "c"))
            }
        }
        fetchCountries()
    }, [country])



    useEffect(() => {

        const fetchStates = async () => {

            const c = country?.value;

            const res = await DATA_API.GetStates(c)
            if (res.status == '200') {
                setstate_list(modifyRegion(res?.data, "s"))
            }
        }

        if (country)
            fetchStates()



    }, [country])

    useEffect(() => {

        const fetchCities = async () => {
            const c = country?.value;
            const s = state?.value;
            const res = await DATA_API.GetCities(c, s)
            if (res.status == '200') {
                setcities_list(modifyRegion(res?.data, "city"))
            }
        }

        if (state && country)
            fetchCities()


    }, [state])

    const Next = async data => {
        try {


            const payload = {
                "user_data": {
                    "education": {
                        "fromWhere": edu?.fromwhere,
                        "college": {
                            "college_type": edu?.college_type,
                            "branch": edu?.branch
                        },
                        "school": {
                            "class_": edu?.class_,
                            "stream": edu?.stream
                        }
                    },
                    "address": {
                        "country": country,
                        "state": state,
                        "city": city,
                        "pincode": data?.pincode
                    },
                    "isProfileDone": profileDone,
                    "notifyToken": ""
                }
            }


            dispatch(setAddress(payload.user_data.address))

            await API.userUpdate({ payload: payload, userId: userauth._id, token: userToken })
                .then(res => {
                    console.log(JSON.stringify(res.data.data))
                })



            const res = await API.userSuccess({ isSuccess: true, userId: userauth._id })
            console.log(res)
            if (res.status === 200) {

                dispatch(getAuthSuccess())
            }



        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.top_view}>

                <View style={{ padding: 20, paddingTop: 0 }}>
                    <Text style={styles.heading_text}>Fill the address details .</Text>
                    <Text style={{ fontFamily: "OpenSans-Regular", color: "#637994" }} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

                </View>
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
                    data={"country"}
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


                <View style={{ padding: 10, paddingTop: 0 }}>
                    <CustomInput
                        name="pincode"
                        control={control}
                        keyboardType="number-pad"
                        placeholder="Enter your pincode"
                        rules={{
                            required: 'pincode is required',
                            minLength: {
                                value: 3,
                                message: 'pincode should be at least 3 characters long',
                            },
                            maxLength: {
                                value: 6,
                                message: 'pincode should be max 6 characters long',
                            },
                        }}
                    />
                </View>


            </View>

            <View style={styles.bottom_view}>

                <CustomButton text="Next" onPress={handleSubmit(Next)} />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        padding: 10
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    heading_text: {
        fontSize: 18,
        color: "#15295c",
        fontFamily: "OpenSans-SemiBold",

    }
});