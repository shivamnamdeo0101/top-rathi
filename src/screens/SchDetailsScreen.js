import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SCH_API } from '../service/apis/SchService';
import Ionicons from 'react-native-vector-icons/Ionicons';


const li = [
  {
    id: 1,
    value: "Students must be enrolled in first-year full-time undergraduate degree in any stream from a recognised Indian institute."
  },
  {
    id: 2,
    value: "Must have passed class 12 with a minimum of 60% marks"
  },
  {
    id: 3,
    value: "The annual household income should be less than INR 15,00,000 (preference will be given to those students whose family income is less than INR 2,50,000)"
  },
  {
    id: 4,
    value: "All applicants are required to complete an online aptitude test as part of their application."
  },

]


const SchDetailsScreen = ({ route, navigation }) => {

  const { id } = route?.params;
  const [schData, setschData] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      await SCH_API.getSchById(id).then((res) => {
        console.log(res?.data?.data[0])
        setschData(res?.data?.data[0])
      })
    }

    fetchData()

  }, [])


  const RenderList = ({ list, heading }) => {
    return (
      <View style={{ margin: 14 }}>

        <View>
          <Text style={{ fontFamily: "OpenSans-SemiBold", fontSize: 16, color: "#15295c", margin: 5, marginBottom: 16, textTransform: "capitalize", borderLeftColor: "#f5aa42", borderLeftWidth: 2, paddingLeft: 10 }}>{heading}</Text>

          {
            list?.map((item, index) => {
              return (
                <View key={index} style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 10 }}>
                  <Ionicons name="star" color="#f5aa42" size={16} style={{ marginTop: 5 }} />
                  <Text style={{ color: "#333", marginLeft: 10, width: '90%', fontSize: 14, fontFamily: "OpenSans-Regular" }}>
                    {item?.value}
                  </Text>
                </View>
              )
            })
          }

        </View>


      </View>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>

        <Text style={{ fontFamily: "OpenSans-SemiBold", marginLeft: 10, fontSize: 20, color: "#000", margin: 5, marginBottom: 16, textTransform: "capitalize", borderLeftColor: "#f5aa42", borderLeftWidth: 2, paddingLeft: 10 }}>{schData?.name}</Text>

        <Image source={{ uri: 'https://i.ytimg.com/vi/cASlIybYBqU/maxresdefault.jpg' }} style={{ width: '100%', height: 250 }} />

        {schData?.schlorshipData?.schDetails && <RenderList list={schData?.schlorshipData?.schDetails} heading={"Schlorship Details"} />}
        {schData?.schlorshipData?.docRequired && <RenderList list={schData?.schlorshipData?.docRequired} heading={"Documents Required"} />}
        {schData?.schlorshipData?.awards && <RenderList list={schData?.schlorshipData?.awards} heading={"Awards"} />}
        {schData?.schlorshipData?.impNotes && <RenderList list={schData?.schlorshipData?.impNotes} heading={"Important Notes"} />}


      </ScrollView>
    </SafeAreaView>
  )
}

export default SchDetailsScreen