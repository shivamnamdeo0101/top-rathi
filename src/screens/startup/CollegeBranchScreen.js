import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch } from 'react-redux'
import { setBranch } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'
import { setProfileDone } from '../../store/UserSlice'
import SelectGrid from '../../components/SelectGrid'

const CollegeBranchScreen = ({ navigation }) => {

    const [branch, setbranch] = useState("")
    const [error, seterror] = useState("")
    const dispatch = useDispatch();



    const Next = () => {

        if (!branch) {
            seterror("Please select the option given")
            return
        }

        try {

            dispatch(setBranch(branch))
            navigation.navigate("Address")
        } catch (e) {

            Alert.alert('Oops', e.message);
        }

    }

    return (
        <View style={styles.container}>

            <View style={{ flex: 1 }}>
                <View style={{ padding: 20, paddingTop: 0 }}>
                    <Text style={styles.heading_text}>Choose the branch type which you are currently pursuing .</Text>
                    <Text style={{ fontFamily: "OpenSans-Regular", color: "#637994" }} >Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0</Text>

                </View>
                <SelectGrid searchAble={true}
                    error={error}
                    seterror={seterror}
                    list={[{ id: 0, name: "Computer Science" }, { id: 1, name: "Information Technology" }, { id: 2, name: "Civil engineering" }, { id: 3, name: "Mech" }, { id: 4, name: "Electical Engineering" }]} setValue={setbranch} value={branch} />

            </View>
            <View style={styles.bottom_view}>
                <CustomButton text="Next" onPress={() => Next()} />
            </View>
        </View>
    )
}

export default CollegeBranchScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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