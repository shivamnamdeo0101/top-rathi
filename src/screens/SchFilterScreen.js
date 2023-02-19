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
import SchInput from '../components/SchInput';


const genderList = [
    {
        _id: 0,
        indexId: 1,
        value: "female",
        label: "Female"
    },
    {
        _id: 1,
        indexId: 2,
        value: "male",
        label: "Male"
    },
    {
        _id: 2,
        indexId: 3,
        value: "transgender",
        label: "Transgender"
    }
]

const classList = [
    {
        _id: 0,
        indexId: 5,
        value: 5,
        label: "Class 5"
    },
    {
        _id: 1,
        indexId: 6,
        value: 6,
        label: "Class 6"
    },
    {
        _id: 2,
        indexId: 7,
        value: 7,
        label: "Class 7"
    },
    {
        _id: 3,
        indexId: 8,
        value: 8,
        label: "Class 8"
    },
    {
        _id: 4,
        indexId: 9,
        value: 9,
        label: "Class 9"
    },
    {
        _id: 5,
        indexId: 10,
        value: 10,
        label: "Class 10"
    },
    {
        _id: 6,
        indexId: 11,
        value: 11,
        label: "Class 11"
    },
    {
        _id: 7,
        indexId: 12,
        value: 12,
        label: "Class 12"
    },

]

const SchFilterScreen = ({ navigation }) => {
    const modalTrue = useSelector(state => state?.NewsSlice?.schFilterDone)
    const [modalVisible, setmodalVisible] = useState(true)

    const edu = useSelector(state => state?.EducationSlice)

    const sch = useSelector(state => state?.SchFilterListSlice)




    //College
    const [degreeName, setdegreeName] = useState(sch?.schObj?.degreeName)
    const [compExam, setcompExam] = useState(sch?.schObj?.compExam)
    const [compExamRank, setcompExamRank] = useState(sch?.schObj?.compExamRank)
    const [lastYearCollegePercent, setlastYearCollegePercent] = useState(sch?.schObj?.lastYearCollegePercent)


    //School
    const [currClass, setcurrClass] = useState(sch?.schObj?.currClass)
    const [lastClassExamPercent, setlastClassExamPercent] = useState(sch?.schObj?.lastClassExamPercent)

    //Both
    const [xIIPercent, setxIIPercent] = useState(sch?.schObj?.xIIPercent)
    const [xPercent, setxPercent] = useState(sch?.schObj?.xPercent)
    const [region, setregion] = useState(sch?.schObj?.region)
    const [authority, setauthority] = useState(sch?.schObj?.authority)
    const [caste, setcaste] = useState(sch?.schObj?.caste)
    const [annualIncome, setannualIncome] = useState(sch?.schObj?.annualIncome)
    const [gender, setgender] = useState(sch?.schObj?.gender)



    const dispatch = useDispatch()
    const user = useSelector(state => state.userAuth.profile)



    const toogleModal = () => {
        dispatch(setSchDone(!modalTrue))
        const reduxPayload = {
            "annualIncome": annualIncome,
            "educationType": user?.education?.college?.college_type,
            "stream": user?.education?.school?.stream,
            "branch": user?.education?.college?.branch,

            "caste": caste,
            "fromWhere": edu?.fromWhere,
            "region": region,
            "gender": gender,

            "xPercent": xPercent,
            "xIIPercent": xIIPercent,
            "degreeName": degreeName,
            "compExam": compExam,
           
            "compExamRank": compExamRank,
            "lastYearCollegePercent": lastYearCollegePercent,
            "currClass": currClass,
            "lastClassExamPercent": lastClassExamPercent



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
                    {/* <View style={{marginLeft:10,marginTop:10,padding:10}}>
                        <Text style={{color:"#000",fontSize:18,fontFamily:"OpenSans-SemiBold"}}>{edu?.fromwhere?.label}</Text>
                    </View> */}

                    <ScrollView>


                        <View style={{ margin: 10, padding: 10 }}>
                            <SchModalList list={sch?.caste} name="Select Caste" setValue={setcaste} value={caste} />
                            <SchSelect name="Your Region" setValue={setregion} value={region} list={sch?.region} />
                            <SchModalList list={genderList} name="Select Gender" setValue={setgender} value={gender} />
                            <SchSelect list={sch?.annualIncomeList} name="Annual Income" setValue={setannualIncome} value={annualIncome} />

                            {edu?.fromwhere?.value === "college" && <View>

                                <SchSelect list={sch?.degreeNameList} name="Degree Name" setValue={setdegreeName} value={degreeName} />
                                <SchSelect list={sch?.examlist} name="Comptative Exam Name" setValue={setcompExam} value={compExam} />
                                <SchInput setValue={setcompExamRank} name="Comptative Exam Rank" value={compExamRank} />
                                <SliderComp setValue={setlastYearCollegePercent} name="Last Year College Percentage" value={lastYearCollegePercent} min={0} max={100} valueText={"Percentage "} step={1} suffix={"%"} />
                                <SliderComp setValue={setxPercent} name="10th Percentage" value={xPercent} min={0} max={100} valueText={"Percentage "} step={1} suffix={"%"} /> 
                                <SliderComp setValue={setxIIPercent} name="12th Percentage" value={xIIPercent} min={0} max={100} valueText={"Percentage "} step={1} suffix={"%"} /> 

                            
                            </View>}

                            {edu?.fromwhere?.value === "school" && <View>
                                <SchSelect list={classList} name="Current Class" setValue={setcurrClass} value={currClass} />
                                <SliderComp setValue={setlastClassExamPercent} name={(currClass?.value-1)+"th Class Exam Percentage"} value={lastClassExamPercent} min={0} max={100} valueText={"Percentage "} step={1} suffix={"%"} />

                            </View>}




                            {/* <SchModalList list={sch?.authority} name="Select Authority" setValue={setauthority} value={authority} /> */}
                            {/* <SchInput setValue={setannualIncome} name="Annual Income" value={annualIncome} /> */}
                            {/* <SliderComp setValue={setage} name="Age" value={age} min={0} max={150} valueText={"Age In Years"} step={1} suffix={"Years"} /> */}


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