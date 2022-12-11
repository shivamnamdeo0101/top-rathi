import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomSelect from '../../components/CustomSelect'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setClass, setFromWhere, setStream } from '../../store/EducationSlice';
import { setAddress, setFirstTime } from '../../store/UserSlice';
import { API } from '../../service/apis/UserService';
import { DATA_API } from '../../service/apis/DataService';
import CustomInput from "../../components/CustomInput";

export default function AddressScreen({ navigation }) {


    const dispatch = useDispatch()
    const { control, handleSubmit, watch } = useForm();
    const [user, setuser] = useState({});
    const userauth = useSelector(state => state.userAuth.profile);
    const [country_list, setcountry_list] = useState([]);
    const [state_list, setstate_list] = useState([]);
    const [cities_list, setcities_list] = useState([]);



    const edu = useSelector(state => state.EducationSlice)
    console.log(edu,"=>")

    const [country, setcountry] = useState("")
    const [state, setstate] = useState("")
    const [city, setcity] = useState("")

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await DATA_API.GetCountries()
            if (res.status == '200') {
                setcountry_list(res?.data)
            }
        }
        fetchCountries()
    }, [country])



    useEffect(() => {

        const fetchStates = async () => {

            const c = country.split("-")[0];
            const res = await DATA_API.GetStates(c)
            if (res.status == '200') {
                setstate_list(res?.data)
            }
        }

        fetchStates()
    }, [country])

    useEffect(() => {

        const fetchCities = async () => {
            const c = country.split("-")[0];
            const s = state.split("-")[0];
            const res = await DATA_API.GetCities(c, s)
            if (res.status == '200') {
                setcities_list(res?.data)
            }
        }

        fetchCities()
    }, [state])

    const Next = async data => {
        try {

            
            const payload = {
                "user_data": {
                    "education": {
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
                    }
                }
            }
            dispatch(setAddress(payload.user_data.address))
            await API.userUpdate({ payload: payload, userId: userauth._id })
                .then(res => {
                    console.log(JSON.stringify(res.data.data))
                })
            navigation.navigate("Home")
        } catch (e) {
            Alert.alert('Oops', e.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.top_view}>

                <Text style={styles.heading_text}>Address</Text>
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
                    control={control}
                    placeholder="Enter your pincode"
                    rules={{
                        required: 'pincode is required',
                        minLength: {
                            value: 3,
                            message: 'pincode should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'pincode should be max 24 characters long',
                        },
                    }}
                />

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
        backgroundColor: "#f0f3f5",
        justifyContent: "space-between",
        padding: 10
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    heading_text: {
        fontSize: 20,

        fontWeight: "bold"
    }
});