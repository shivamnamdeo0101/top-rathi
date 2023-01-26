import { View, Text, Pressable } from 'react-native'
import React,{useState} from 'react'
import MultiSelectUi from './MultiSelectUi'
import Modal from 'react-native-modal'


const SchSelect = ({ list, setValue, value, name }) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toogleModal = () => {
        setModalVisible(!isModalVisible)
       
    }
    return (
        <View>
            <Pressable onPress={()=>toogleModal()} style={{ backgroundColor: "#e8e8e8", marginBottom: 16, padding: 10, borderRadius: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: "OpenSans-SemiBold", color: "#15295c", textTransform: "capitalize", }}>{name}</Text>

                <Text style={{fontFamily:"OpenSans-SemiBold",color:"#000",marginTop:10,textTransform:"capitalize",marginBottom:10}}>{value?.label ? value?.label : "Select "+name}</Text>

            </Pressable>

            <Modal
                isVisible={isModalVisible}
                onSwipeComplete={() => toogleModal()}
                swipeDirection="down"
                onBackButtonPress={() => toogleModal()}
                style={{ flex: 1, backgroundColor: "#fff", margin: 0, marginTop: "50%", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 16 }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ width: 100, height: 3, borderRadius: 33, backgroundColor: "#ccc", alignSelf: "center", margin: 5 }}>

                    </View>

                    <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 20, color: "#15295c", margin: 5, marginBottom: 16, textTransform: "capitalize", borderLeftColor: "#f5aa42", borderLeftWidth: 2, paddingLeft: 10 }}>Select {name}</Text>

                    <MultiSelectUi
                        list={list}
                        setValue={setValue}
                        value={value}
                        searchAble={true}
                        CloseModal={toogleModal}
                    />

                </View>



            </Modal>

        </View>
    )
}

export default SchSelect