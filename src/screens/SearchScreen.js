import { View, Text, StyleSheet, Image,ScrollView, TextInput,TouchableOpacity, Dimensions, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComp from '../components/LoadingComp';
import Modal from "react-native-modal";
import NewsComp from '../components/NewsComp';
import CarouselComp from '../components/CarouselComp';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InsightComp from '../components/InsightComp';
import { NEWS_API } from '../service/apis/NewsService';


export default function SearchScreen({ navigation }) {

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [query, setquery] = useState("To");
  const [news_data, set_news_data] = useState([]);


  useEffect(() => {
    NEWS_API.SearchNews(query)
    .then((res)=>{
        console.log(res)
        // set_news_data(res.data)
        // setloading(false)
    })
  }, [query, loading])


  const separator = () => (
    <View style={{height: 0.8, width: '100%', backgroundColor: '#fff'}} />
  )

  if (loading) {
    return (
      <LoadingComp />
    )
  }
  const fetchMoreData = () => {
    { console.log(news_data.count) }
  }

  const renderHeader = () => (
    <View>
      {news_data ? 
        <Text style={{fontSize:20,fontFamily:"Poppins-Bold",color:"#000"}}>Search Results</Text>
        :
        <Text style={{fontSize:20,fontFamily:"Poppins-Bold",color:"#000"}}>Top Stories</Text>
      }
    
    </View>
   
  )
  const renderFooter = () => (
    <View style={styles.footerText}>
     
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




      {/* <View style={styles.container}>

        
        <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#f0f3f5", margin: 5, borderRadius: 40, justifyContent: "space-around" }}>
          <Ionicons name="search" style={{ marginLeft: 10 }} color="#000" size={20}  />
          <TextInput
            placeholder='Search...'
            editable={true}
            onChangeText={(e)=>setquery(e)}
            value={query}
            style={{ width: "80%", color: "#000", width: "90%", marginLeft: 10, padding: 5, borderRadius: 16, fontFamily: "Poppins-Regular" }}
          />
        </TouchableOpacity>
        <>
        

        <View style={{margin:5}}>

          
          <View>
          <FlatList
            
            data={news_data}
            keyExtractor={item => item._id}
            renderItem={renderItem}
           
          />
          </View>
        </View>
        </>


      </View> */}

   
   
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