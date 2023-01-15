import React, { useState, useEffect } from 'react'
import { View, useWindowDimensions,Text ,StyleSheet, ScrollView} from 'react-native';
import { TabView, TabBar,SceneMap } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { API } from '../service/apis/UserService';
import Snackbar from 'react-native-snackbar';




const PersonalRoute = () => {
  const user = useSelector(state=>state.userAuth.profile)

 

  const [loading, setloading] = useState(false)
  const [sent, setsent] = useState(false)

  const sendVerify = async ()=>{
    setloading(true)
    const data = { "email": user?.email }
    try {
      
            await API.userSendEmailVerifyLink(data)
                .then((res) => {
                    setloading(false)
                    if (res.data.success) {
                      setsent(true)
                        setloading(false)
                        Snackbar.show({
                            text: "Email sent. if you didn't get the email click on the Resend ",
                            duration: Snackbar.LENGTH_SHORT,
                            action: {
                                text: 'RESEND',
                                textColor: 'green',
                                onPress: () => sendVerify(),
                            },
                        });


                    }

                })

        

    } catch (e) {
        setloading(false)
        Alert.alert('Oops', e.message);
    }

  }

  return(
    <View style={styles.route}>
        <Text style={styles.route_title}>PERSONAL DETAILS</Text>

        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>NAME</Text>
          <Text style={styles.route_comp_text}>{user?.username}</Text>
        </View>
        
        <View style={{...styles.route_comp_view}}>
          <Text style={styles.route_comp_title}>EMAIL</Text>
          <Text style={styles.route_comp_text}>{user?.email} </Text>
          {user?.emailVerified ? <Text style={{color:"#fff",fontSize:12,backgroundColor:"green",width:60,padding:4,textAlign:"center",borderRadius:10,}}>VERIFIED</Text>
            : <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{color:"#fff",fontSize:12,backgroundColor:"red",width:100,padding:4,textAlign:"center",borderRadius:10}}>UNVERIFIED</Text>
              <Text onPress={()=>sendVerify()} style={{fontSize:12,color:"green",padding:4,textAlign:"center",borderRadius:10,fontFamily:"OpenSans-SemiBold"}}> {loading ? "Sending email.." : sent? "Email Sent. Click to resend" : "Send email to verify" } </Text>
            </View>
          }
        </View>
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>INTEREST</Text>
          {
           ( user?.interest && user?.interest?.length > 0 )?
            <View style={{flexDirection:"row",flexWrap:"wrap",}}>
                {
                  user?.interest.map((item,index)=>{
                    return(
                      <Text key={index} style={{marginRight:6,fontFamily:"OpenSans-Regular",backgroundColor:"#f0f3f5",padding:3,borderRadius:5,fontSize:12}}>{item.name}</Text>
                     )
                  })
                }
            </View> 
            :
            <View>  
              <Text style={styles.route_comp_text}>{"Go to settings -> edit profile -> In Education section update your interest"}</Text>
            </View>   
          }
    </View>
    </View>
  )
}


const EducationRoute = () =>  {
  const user = useSelector(state=>state.userAuth.profile)

  
  return(
    <View style={styles.route}>
       <Text style={styles.route_title}>EDUCATIONAL DETAILS</Text>
       <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>CLASS</Text>
          <Text style={styles.route_comp_text}>{user?.education?.school?.class_}</Text>
        </View>
        
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>STREAM</Text>
          <Text style={styles.route_comp_text}>{user?.education?.school?.stream}</Text>
        </View>

        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>COLLEGE TYPE</Text>
          <Text style={styles.route_comp_text}>{user?.education?.college?.college_type}</Text>
        </View>

        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>BRANCH</Text>
          <Text style={styles.route_comp_text}>{user?.education?.college?.branch}</Text>
        </View>
    </View>
  )
}
const AddressRoute = () => {
  const user = useSelector(state=>state.userAuth.profile)


  return(
    <View style={styles.route}>
        <Text style={styles.route_title}>ADDRESS DETAILS</Text>
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>COUNTRY</Text>
          <Text style={styles.route_comp_text}>{user?.address?.country}</Text>
        </View>
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>STATE</Text>
          <Text style={styles.route_comp_text}>{user?.address?.state}</Text>
        </View>
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>CITY</Text>
          <Text style={styles.route_comp_text}>{user?.address?.city}</Text>
        </View>
        <View style={styles.route_comp_view}>
          <Text style={styles.route_comp_title}>PINCODE</Text>
          <Text style={styles.route_comp_text}>{user?.address?.pincode}</Text>
        </View>
    </View>
  )
}


const renderScene = SceneMap({
  first: PersonalRoute,
  second: EducationRoute,
  third: AddressRoute,
});

export default function ProfileTabView({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Personal' },
    { key: 'second', title: 'Education' },
    { key: 'third', title: 'Address' },
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{fontSize:12,fontFamily:"OpenSans-Bold"}}
      activeColor='#f5ae0a' 
      inactiveColor="#ccc"
      indicatorStyle={{ backgroundColor: '#f5ae0a' }}
      style={{ backgroundColor: 'white' }}
      renderIcon={({ route, focused, color,size=18}) => (
        
        <View>
          {(route.key ==="first") && <Ionicons name="person" color={color} size={size} />}
          {(route.key ==="second") && <MaterialCommunityIcons name="book-education-outline" color={color} size={size} />}
          {(route.key ==="third") && <Ionicons name="md-bookmarks" color={color} size={size} />}
        </View>
        


      )}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  route: { flex: 1, backgroundColor: '#fff',padding:10 },
  route_comp_view:{padding:10,borderWidth:2,borderColor:"#f0f3f5",borderRadius:10,marginBottom:10},
  route_title:{fontFamily:"OpenSans-SemiBold",fontSize:18,color:"#000",textTransform:"capitalize",margin:8},
  route_comp_title:{fontFamily:"OpenSans-Bold",fontSize:12,color:"#000"},
  route_comp_text:{fontFamily:"OpenSans-Regular",fontSize:14,color:"#000"}
});