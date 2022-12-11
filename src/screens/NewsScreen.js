import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList, Button, ActivityIndicator, SafeAreaView, Alert } from 'react-native'
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


export default function NewsScreen({ navigation }) {

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;


  const dispatch = useDispatch();


  const [loading, setloading] = useState(true);
  const [news_data, set_news_data] = useState([]);
  const [isModalVisible, setModalVisible] = useState(true);
  const [news_comp_data, set_news_comp_data] = useState({});
  const [page, setPage] = useState(1);

  const [email, setemail] = useState("");

  const userauth = useSelector(state => state.userAuth)
  const [email_verified, setemail_verified] = useState(false);
  const [counter_callback, setcounter_callback] = useState(0);



  const payload = { userId: userauth?.profile?._id }
  useEffect(() => {

    const fetchData = async () => {
      const res = await API.userFetch(payload)

      if (res.data.success) {
        setemail(res?.data?.data?.email)
        setemail_verified(res?.data?.data?.emailVerified)
        const temp = res?.data?.data?.emailVerified
        setemail_verified(temp)
        setModalVisible(!temp)
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
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000" }}>Top Stories</Text>
        <CarouselComp navigation={navigation} />
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000" }}>Top Insights</Text>
        <InsightComp navigation={navigation} />
        <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000" }}>For You</Text>

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
    <TouchableOpacity style={styles.news_comp} key={index} onPress={() => navigation.navigate("NewsComp", { post: item })}>
      <Image style={styles.post_img} source={{ uri: item.image }} />

      <View style={styles.content_data}>

        <View style={styles.tags_row}>
          {item.tags.map((tag) =>
            <View key={tag._id}>
              <Text style={{ marginRight: 5, fontFamily: "Poppins-Regular", color: "#f03", fontSize: 12 }}>{tag.value}</Text>
            </View>
          )}
        </View>


        <Text style={styles.title}>{item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}</Text>
        <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
      </View>
    </TouchableOpacity>
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

      <Modal isVisible={isModalVisible} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
        <View style={{ flex: 1, alignItems: 'center', }}>

          {/* fill space at the top */}
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>


          </View>


          <View style={{ flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 10, }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
              <Text style={{ fontSize: 20, fontFamily: "Poppins-Bold", color: "#000", textAlign: "center" }}>Verify Your Email</Text>
              <TouchableOpacity onPress={() => closeModal()}>
                <Ionicons name="close" style={{ marginLeft: 10 }} color="#000" size={20} />
              </TouchableOpacity>
            </View>


            <EmailVerify navigation={navigation} emailVerified={email_verified} email={userauth?.profile?.email} setcounter_callback={setcounter_callback} />



          </View>

          {/* fill space at the bottom*/}
          <View style={{ flex: 1, justifyContent: 'flex-end', }} />
          {/* fill space at the bottom*/}
        </View>




      </Modal>



      <View style={styles.container}>


        <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-around" }}>
          <Ionicons name="search" style={{ marginLeft: 10 }} color="#000" size={20} />
          <TextInput
            placeholder='Search...'
            editable={false}
            style={{ width: "80%", color: "#000", width: "90%", marginLeft: 10, padding: 5, borderRadius: 16, fontFamily: "Poppins-Regular" }}

          />
        </TouchableOpacity>
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
    width: "80%"
  },
  title: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    width: "85%",

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
    width: 100,
    height: 70,
    borderRadius: 5,
    marginRight: 5,

  },
  content: {
    width: "80%",
    fontSize: 16,

  },
  news_comp: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#f0f3f5",
    marginBottom: 5


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