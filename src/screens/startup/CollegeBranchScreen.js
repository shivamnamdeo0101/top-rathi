import { View, Text, StyleSheet, Alert } from 'react-native'
import React ,{useState} from 'react'
import MultiSelectUi from '../../components/MultiSelectUi'
import { useDispatch } from 'react-redux'
import { setBranch } from '../../store/EducationSlice'
import CustomButton from '../../components/CustomButton'
import { setProfileDone } from '../../store/UserSlice'

const CollegeBranchScreen = ({ navigation }) => {

    const [branch, setbranch] = useState("")
    const [error, seterror] = useState("")
    const dispatch = useDispatch();



    const Next = ()=>{

        if(!branch){
            seterror("Please select the option given")
            return
        }
        
        try{
           
            dispatch(setBranch(branch))
            navigation.navigate("Address")
        }catch(e){
            
            Alert.alert('Oops', e.message);
        }
       
    }

    return (
            <View style={styles.container}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.heading_text}>SELECT YOUR BRANCH</Text>
                    <MultiSelectUi searchAble={true} 
                        error={error}
                        
                        seterror={seterror}
                        list={[{ id: 0, name: "Computer Science" }, { id: 1, name: "Information Technology" }, { id: 2, name: "Civil engineering" },{ id: 3, name: "Mech" },{ id: 4, name: "Electical Engineering" }]} setValue={setbranch} value={branch} />

                </View>
                <View style={styles.bottom_view}>
                    <CustomButton text="Next" onPress={()=>Next()} />
                </View>
            </View>
    )
}

export default CollegeBranchScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
        padding: 10
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    heading_text: {
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "Poppins-Bold"
    }
});