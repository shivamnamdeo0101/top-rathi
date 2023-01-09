import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList, Button, ActivityIndicator, SafeAreaView, Alert, TouchableHighlight, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComp from '../components/LoadingComp';
import Modal from "react-native-modal";
import NewsComp from '../components/NewsComp';
import CarouselComp from '../components/CarouselComp';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InsightComp from '../components/InsightComp';
import { addNews, flushHomeData } from '../store/NewsSlice';
import { NEWS_API } from '../service/apis/NewsService';
import Snackbar from 'react-native-snackbar';

import { API } from '../service/apis/UserService';
import EmailVerify from '../components/EmailVerify';
import ProfileTabView from '../components/ProfileTabView';
import PollComp from '../components/PollComp';


export default function NewsScreen({ navigation }) {

  const userauth = useSelector(state => state.userAuth)
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();


  const [loading, setloading] = useState(true);
  const [news_data, set_news_data] = useState([]);
  const [isModalVisible, setModalVisible] = useState(userauth?.profile?.emailVerified);
  const [news_comp_data, set_news_comp_data] = useState({});
  const [page, setPage] = useState(1);

  const [email, setemail] = useState("");


  const [email_verified, setemail_verified] = useState(false);
  const [counter_callback, setcounter_callback] = useState(0);



  const payload = { userId: userauth?.profile?._id, token: userauth?.user?.token }
  useEffect(() => {

    const fetchData = async () => {
      const res = await API.userFetch(payload)
      if (res.data.success) {
        setemail(res?.data?.data?.email)
        setemail_verified(!res?.data?.data?.emailVerified)

      }

    }


    fetchData()

  }, [email_verified, isModalVisible, counter_callback])

  const [news_arr, setnews_arr] = useState([])
  var myHeaders = new Headers();



  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  useEffect(() => {
    const fetchData = async () => {
      const payload = {
        "page": page,
        "perPage": 5,
      }
      const res = await NEWS_API.FeedFetch(payload);
      if (res.data.success) {
        set_news_data(res.data);
        setloading(false);
        setnews_arr([...news_arr, ...res.data.data])
      }
    }

    //if(news_arr.length <= news_data.count){
    fetchData()
    // }
    // fetch(`http://localhost:5000/api/private/news/${page}/5`, requestOptions)
    //   .then(response => response.json())
    //   .then(data => { 
    //       set_news_data(data); 
    //       setloading(false) ;
    //       setnews_arr([...news_arr,...data.data])
    //       //dispatch(addNews(news_arr));
    //     })


  }, [page])






  const ShowNewsModal = (item) => {
    set_news_comp_data(item);
    setModalVisible(true)
  }
  const separator = () => (
    <View style={{ height: 0.8, width: '100%', backgroundColor: '#fff' }} />
  )

  if (loading) {
    return (
      <LoadingComp />
    )
  }
  const fetchMoreData = () => {

    if (news_arr.length < news_data.count) {
      setPage(page + 1)
      console.log(page)
    }


  }

  function renderHeader() {

    return (
      <View>
        {/* <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000" }}>Top Stories</Text>
        <CarouselComp navigation={navigation} /> */}
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000", borderLeftColor: "#f2c305", borderLeftWidth: 2, paddingLeft: 10 }}>Top Insights</Text>
        <InsightComp navigation={navigation} />
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000", borderLeftColor: "#f2c305", borderLeftWidth: 2, paddingLeft: 10, marginBottom: 5 }}>For You</Text>

      </View>
    )

  }



  const renderFooter = () => (
    <View style={styles.footerText}>
      {
        news_arr.length == news_data.count ?
          <Text></Text>
          :
          <ActivityIndicator />
      }
    </View>
  )
  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  )


  const renderItem = ({ item, index }) => (
   
  <View>
   
      <TouchableOpacity style={styles.news_comp} key={index} onPress={() => navigation.navigate("NewsComp", { post: item })}>
      <Image style={styles.post_img} source={{ uri: item.image }} />
      
      <View style={styles.content_data}>

        <View style={styles.tags_row}>
          {item.tags.map((tag) =>
            <View key={tag._id}>
              <Text style={{ marginRight: 5, fontFamily: "Poppins-Regular", color: "#545063", fontSize: 14 }}>{tag.value}</Text>
            </View>
          )}
          <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
        </View>

        <Text style={styles.title}>{item.title.length > 100 ? item.title.substring(0, 100) + "..." : item.title}</Text>
        <Text style={styles.content}>{item.content.length > 400 ? item.content.substring(0, 400) + "..." : item.content + item.content + item.content}</Text>

      </View>
    </TouchableOpacity>
            
          {  item.poll_title && <PollComp navigation={navigation} user={userauth?.user?.user} post={item} />}
  </View>

   
  );



  const closeModal = () => {
    if (email_verified) {
      setModalVisible(false)
    } else {
      Snackbar.show({
        text: 'Please verify your email...',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      });
    }
  }


  return (
    <View style={styles.root}>
      
      {/* <Modal isVisible={email_verified} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <View style={{ flex: 1, alignItems: 'center', }}>

     
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>


          </View>


          <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 10, }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000", textAlign: "center" }}>Verify Your Email</Text>

            </View>


            <EmailVerify navigation={navigation} emailVerified={email_verified} email={userauth?.profile?.email} setcounter_callback={setcounter_callback} />



          </View>

        
          <View style={{ flex: 1, justifyContent: 'flex-end', }} />
         
        </View>




      </Modal> */}

      <View style={styles.container}>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={{ width: 20, height: 35, backgroundColor: "#ccc" }} source={{ uri: "https://ik.imagekit.io/lajz2ta7n/LOGO/logoApp.jpeg" }} />
            <Text style={{ fontFamily: "Anton-Regular", color: "#f2c305", fontSize: 25  }}>TOP<Text style={{ color: "#000" }}>RATHI</Text></Text>
          </View>


          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={() => navigation.navigate("Search")} style={{ width: 40, height: 40, display: "flex", flexDirection: "row", alignItems: "center", padding: 1, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-between" }}>
              <Ionicons name="search-outline" style={{ marginLeft: 10 }} color="#000" size={20} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Notification")} style={{ width: 40, height: 40, display: "flex", flexDirection: "row", position:"relative", alignItems: "center", padding: 1, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-between" }}>
              <Ionicons name="notifications-outline" style={{ marginLeft: 10 }} color="#000" size={20} />
              <Text style={{width:20,height:20,textAlign:"center", borderRadius:99,fontFamily:"Poppins-SemiBold",color:"#fff",alignSelf:"flex-end", position:"relative",marginBottom:20,marginRight:16, backgroundColor:"#f03"}}>3</Text>
            </Pressable>
            {/* <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ width: 40, height: 40, display: "flex", flexDirection: "row", alignItems: "center", padding: 1, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-between" }}>
              <Ionicons name="search" style={{ marginLeft: 10 }} color="#000" size={20} />
            </TouchableOpacity> */}
          </View>
        </View>

        <>

          <View style={{ margin: 5 }}>

            <View>

              <FlatList

                style={{ marginBottom: 100 }}
                data={news_arr}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader()}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                onEndReachedThreshold={0.2}
                onEndReached={fetchMoreData}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={separator}
              />
            </View>
          </View>
        </>


      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tag_text: {
    flexDirection: "row",
  },

  content_data: {
    padding: 10
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Poppins-Bold",


  },
  timestamp: {
    color: "#ccc",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 5,

  },
  container: {
    padding: 5,
  },
  tags_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

  },
  tag: {
    backgroundColor: "#f2c305",
    borderRadius: 3,
    fontWeight: "bold",
    fontSize: 12
  },
  post_img_slide: {
    width: 200,
    height: 100,

  },

  post_slide: {
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  post_img: {
    width: "100%", height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10

  },
  content: {
    fontSize: 10,
    fontFamily: "Poppins-Regular",
    color: "#555",
    marginTop: 10
  },
  news_comp: {
    flexDirection: "column", borderRadius: 10, backgroundColor: "#f0f3f5", marginBottom: 10
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  }
});