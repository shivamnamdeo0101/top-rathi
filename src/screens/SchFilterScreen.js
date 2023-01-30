import { View, Text, StyleSheet, ScrollView, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import SwipeModal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { setSchDone } from '../store/NewsSlice';
import ButtonBg from '../components/ButtonBg';
import SliderComp from '../components/SliderComp';
import SchModalList from '../components/SchModalList';
import SchSelect from '../components/SchSelect';
import CustomButton from '../components/CustomButton';
import { setSchObj } from '../store/SchFilterSlice';


const genderList  = [
  {
    _id:0,
    indexId:1,
    value:"female",
    label:"Female"
  },
  {
    _id:1,
    indexId:2,
    value:"male",
    label:"Male"
  },
  {
    _id:2,
    indexId:3,
    value:"transgender",
    label:"Transgender"
  }
]

const SchFilterScreen = ({ navigation }) => {
    const modalTrue = useSelector(state => state?.NewsSlice?.schFilterDone)
    const [modalVisible, setmodalVisible] = useState(true)

    const edu = useSelector(state => state?.EducationSlice)

    const sch = useSelector(state => state?.SchFilterListSlice)
    const [caste, setcaste] = useState(sch?.schObj?.caste)
    const [annualIncome, setannualIncome] = useState(sch?.schObj?.annualIncome)
    const [age, setage] = useState(sch?.schObj?.age)
    const [gender, setgender] = useState(sch?.schObj?.gender)
    const [lastExam, setlastExam] = useState(sch?.schObj?.lastExam)
    const [percentage, setpercentage] = useState(sch?.schObj?.percentage)
    const [region, setregion] = useState(sch?.schObj?.region)
    const [authority, setauthority] = useState(sch?.schObj?.authority)
    const dispatch = useDispatch()
    const user = useSelector(state => state.userAuth.profile)



    const toogleModal = () => {
        dispatch(setSchDone(!modalTrue))
        const reduxPayload = {
            "annualIncome": annualIncome,
            "authority": authority,
            "educationType": user?.education?.college?.college_type,
            "caste": caste,
            "fromWhere": edu?.fromWhere,
            "region": region,
            "lastExam": lastExam,
            "percentage": percentage,
            "gender":gender
        }
        dispatch(setSchObj(reduxPayload))
    }

    return (
        <Modal
            animationType="none"
            visible={true}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View style={{ padding: 14, elevation: 4, backgroundColor: "#fff" }}>
                        <Text style={{ fontFamily: "OpenSans-SemiBold", paddingLeft: 16, fontSize: 20, color: "#15295c", textTransform: "capitalize", borderLeftColor: "#f5aa42", borderLeftWidth: 2, }}>Fill All The Details</Text>
                    </View>
                    <ScrollView>

                        <View style={{ margin: 10, padding: 10 }}>
                            <SchModalList list={sch?.caste} name="Select Caste" setValue={setcaste} value={caste} />
                            <SchModalList list={genderList} name="Select Gender" setValue={setgender} value={gender} />
                            <SchModalList list={sch?.authority} name="Select Authority" setValue={setauthority} value={authority} />
                            <SliderComp setValue={setpercentage} name="Last Exam Appeard Percentage" value={percentage} min={0} max={100} valueText={"Percentage "} step={1} suffix={"%"} />

                            {/* <SliderComp setValue={setage} name="Age" value={age} min={0} max={150} valueText={"Age In Years"} step={1} suffix={"Years"} /> */}
                            <SchSelect list={sch?.annualIncomeList} name="Select Annual Income" setValue={setannualIncome} value={annualIncome} />

                            <SchSelect name="Your Region" setValue={setregion} value={region} list={sch?.region} />
                            <SchSelect name="Last Appeared Exam" setValue={setlastExam} value={lastExam} list={sch?.examlist} />
                        </View>

                    </ScrollView>

                    <View style={{ backgroundColor: "#fff", elevation: 4, padding: 10 }}>
                        <CustomButton

                            text="Submit"
                            onPress={() => toogleModal()}
                        />
                    </View>




                </View>
            </View>
        </Modal>
    )
}

export default SchFilterScreen

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8" },
    header: { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", padding: 14 },
    header_name: { fontSize: 18 },
    header_welcome: { fontSize: 30, fontWeight: "bold", color: "#000" },
    image: { height: 100, width: 100, backgroundColor: "#f0f3f5", borderRadius: 20, textAlign: "center" },
    search_box: { backgroundColor: "#f0f3f5", marginTop: 16, borderRadius: 30 },
    search_input: { padding: 12, fontSize: 16, fontWeight: "500" },
    bgButtonRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8, borderTopWidth: 1, borderTopColor: "#f8f8f8" }

});