import { View, Text, StyleSheet, Image,ScrollView, TextInput,TouchableOpacity, Dimensions, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComp from '../components/LoadingComp';
import Modal from "react-native-modal";
import NewsComp from '../components/NewsComp';
import CarouselComp from '../components/CarouselComp';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function NewsScreen({ navigation }) {

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;


  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  const [loading, setloading] = useState(true);
  const [news_data, set_news_data] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [news_comp_data, set_news_comp_data] = useState({});
  const [page, setPage] = useState(1);
  var myHeaders = new Headers();

  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmVmOTgxNjZkNjgxNTY4MDY5YWRmYSIsImlhdCI6MTY2NjM3MDAxNSwiZXhwIjoxNjY5Mzk0MDE1fQ.MToBixXHAGgaUQsIVClv7VnqaanyJ6YL6gBK--Lro8U");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  useEffect(() => {
    fetch(`https://toprathi-api.herokuapp.com/api/private/news/1/${page}`, requestOptions)
      .then(response => response.json())
      .then(data => { set_news_data(data); setloading(false) })
  }, [page, loading])

  const ShowNewsModal = (item) => {
    set_news_comp_data(item);
    setModalVisible(true)
  }
  const separator = () => (
    <View style={{height: 0.8, width: '100%', backgroundColor: '#fff'}} />
  )

  if (loading) {
    return (
      <LoadingComp />
    )
  }
  const fetchMoreData = () => {
    setPage(page + 4)
    { console.log(news_data.count) }
  }
  const renderHeader = () => (
    <View>
      <Text style={{fontSize:20,fontFamily:"Poppins-Bold",color:"#000"}}>Top Stories</Text>
      <CarouselComp />
      <Text style={{fontSize:20,fontFamily:"Poppins-Bold",color:"#000"}}>For You</Text>
         
    </View>
   
  )
  const renderFooter = () => (
    <View style={styles.footerText}>
      {
        news_data.data.length == news_data.count ?
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


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.news_comp} key={item._id} onPress={() => navigation.navigate("NewsComp", { post: item })}>
      <Image style={styles.post_img} source={{ uri: item.image }} />

      <View style={styles.content_data}>
      
        <View style={styles.tags_row}>
          {item.tags.map((tag) =>
            <View key={tag._id}>
              <Text style={{marginRight:5, fontFamily:"Poppins-Regular",color:"#f03",fontSize:12}}>{tag.value}</Text>
            </View>
          )}
        </View>


        <Text style={styles.title}>{item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}</Text>
        <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );

      
  


  return (
    <View style={styles.root}>




      <Modal
        style={{ margin: 0, marginTop: 20 }}
        isVisible={isModalVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
      >
        <View style={{ flex: 1, backgroundColor: "#fff", margin: 0, height: "90%", padding: 10, borderRadius: 10 }}>
          <NewsComp post={news_comp_data} />
        </View>
      </Modal>






      <View style={styles.container}>

        
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-around" }}>
          <Ionicons name="search" style={{ marginLeft: 10 }} color="#000" size={20} onPress={() => navigation.navigate("News")} />
          <TextInput
            placeholder='Search...'
            style={{ width: "80%", color: "#000", width: "90%", marginLeft: 10, padding: 5, borderRadius: 16, fontFamily: "Poppins-Regular" }}
          />
        </View>
        <>
        

        <View style={{margin:5}}>

          
          <View>
          <FlatList
            nestedScrollEnabled
            style={{ marginBottom:100}}
            data={news_data?.data}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
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
    fontFamily:"Poppins-Bold",
    width:"85%",

  },
  timestamp: {
    color: "#ccc",
    fontFamily:"Poppins-Regular",
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
    marginBottom:5


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