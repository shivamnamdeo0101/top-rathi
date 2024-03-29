import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, FlatList, Button, ActivityIndicator, SafeAreaView } from 'react-native'
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
import { set } from 'immer/dist/internal';


export default function SearchScreen({ navigation }) {

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const [query, setquery] = useState("");
  const [news_data, set_news_data] = useState({});
  const [pageNo, setpageNo] = useState(1)
  const [news_arr, setnews_arr] = useState([])
  const [titleArr, settitleArr] = useState([])


  useEffect(() => {

    try {
      if (!query) {
        setloading(false)
      }
      const fetchData = async () => {
        await NEWS_API.SearchNews(query, pageNo)
          .then((res) => {
            set_news_data(res.data)
            setnews_arr([...news_arr, ...res.data.data])
            setloading(false)
          })
      }

      if (query) {
        fetchData()
      }

    } catch (error) {
      console.log(error)
    }

  }, [pageNo])


  const separator = () => (
    <View style={{ height: 0.8, width: '100%', backgroundColor: '#fff' }} />
  )

  if (loading) {
    return (
      <LoadingComp />
    )
  }
  const fetchMoreData = () => {

    setpageNo(pageNo + 1)
    console.log(pageNo)
  }

  const renderHeader = () => (
    <View>
      {news_data ?
        <Text style={{ fontSize: 20, fontFamily: "OpenSans-Bold", color: "#000" }}>Search Results</Text>
        :
        <Text style={{ fontSize: 20, fontFamily: "OpenSans-Bold", color: "#000" }}>Top Stories</Text>
      }

    </View>

  )
  const renderFooter = () => (
    <View style={styles.footerText}>

    </View>
  )

  function SearchTitleComp() {
    return (
      <View style={{marginBottom:100, margin: 16, marginTop: 0, marginLeft: 20, marginRight: 20 }}>
        <ScrollView>
          {
            titleArr?.map((item, index) => {
              return (
                <TouchableOpacity style={{ backgroundColor: "#e8e8e8", padding: 14, marginBottom: 10,borderRadius:8 }} key={index}>
                  <Text>{item?.title?.length > 40 ? item?.title?.substring(0,40) : item?.title}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    )
  }

  const renderEmpty = () => (
    <View style={styles.emptyText}>
      <Text>No Data at the moment</Text>
    </View>
  )


  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ ...styles.news_comp }} key={item._id} onPress={() => navigation.navigate("NewsComp", { post: item,fromWhere:"search" })}>
        <Image style={styles.post_img} source={{ uri: item.image }} />

        <View style={styles.content_data}>

          <View style={styles.tags_row}>
            {item.tags.map((tag) =>
              <View key={tag._id}>
                <Text style={{ marginRight: 5, fontFamily: "OpenSans-Regular", color: "#f03", fontSize: 10 }}>{tag.value}</Text>
              </View>
            )}
          </View>


          <Text style={styles.title}>{item.title.length > 60 ? item.title.substring(0, 60) + "..." : item.title}</Text>
          <Text style={styles.timestamp}>{moment(item.timestamp).fromNow()}</Text>
        </View>
      </TouchableOpacity>
    )

  }



  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    let offset = 0;
    const currentOffset = contentOffset.y;
    const dif = currentOffset - (offset || 0);

    if (Math.abs(dif) < 3) {
      console.log('unclear');
    } else if (dif < 0) {
      console.log('up');
    } else {
      console.log('down');
      setpageNo(pageNo + 1)
    }

    offset = currentOffset;
  };


  const SetSearch = (e) => {
    setquery(e)
  }

  const callSearch = async ()=>{
    if(query?.length <= 0){
      return
    }
    setloading(true)
    setnews_arr([])
    try {
      await NEWS_API.SearchNews(query, 1)
          .then((res) => {
            set_news_data(res.data)
            setnews_arr(res.data.data)
      })

      setloading(false)
      
    } catch (error) {
      console.log(error)
    }
  }

  const getList = ()=>{
    return news_arr.filter((item)=>item?.title?.toLowerCase()?.includes(query?.toLowerCase()))
  }

  return (
    <View style={styles.root}>

      <TouchableOpacity onPress={() => navigation.navigate("Search")} style={{ width: "90%", alignSelf: "center", display: "flex", flexDirection: "row", alignItems: "center", padding: 5, backgroundColor: "#e8e8e8", margin: 5, borderRadius: 40, justifyContent: "space-around" }}>
        <TextInput
          placeholder='Search...'
          editable={true}
          onChangeText={(e) => SetSearch(e)}
          value={query}
          style={{ width: "80%", color: "#000", width: "90%", marginLeft: 10, padding: 5, borderRadius: 16, fontFamily: "OpenSans-Regular" }}
        />
        <Ionicons name="search" onPress={()=>callSearch()} style={{ marginRight: 20 }} color="#f5aa42" size={20} />

      </TouchableOpacity>
      <>


        <View style={{ margin: 5 }}>
          {/* 
{    query && <Text style={{fontFamily:"OpenSans-SemiBold" ,color:"#f5aa42",marginLeft:16,marginBottom:10}}>Search Results : {news_data.count}</Text>
}          */}



          {!query && <View style={{ margin: 10, marginTop: 0 }}>
            <Text style={{ color: "#888", fontFamily: "OpenSans-Regular", fontSize: 14, margin: 10 }}>Relevant Topics</Text>

            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", margin: 10, marginTop: 0, }}>

              {
                ["Sports", "Education", "Science", "Maths", "Politics", "Government", "Admission", "AI"].map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => SetSearch(item.toLowerCase())} key={index} style={{ marginBottom: 10, marginRight: 5, backgroundColor: "#eeeeee", paddingLeft: 15, paddingRight: 20, padding: 10, borderRadius: 33 }}>
                      <Text style={{ color: "#000", fontFamily: "OpenSans-Regular", fontSize: 14 }}>{item}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>}
          {/* <SearchTitleComp /> */}

          <View style={{marginBottom:100}}>
            <ScrollView
         
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                isCloseToBottom(nativeEvent)
              }}
            >
              <View>
                {query &&
                  getList()?.map((item, index) => {
                    return (
                      <View key={index} style={{}}>
                        <RenderItem item={item} />
                      </View>
                    )
                  })

                }
              </View>


            </ScrollView>
              
          </View>

        </View>
      </>


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
    width: "85%"
  },
  title: {
    color: "#000",
    fontSize: 10,
    fontFamily: "OpenSans-Bold",
    width: "85%",

  },
  timestamp: {
    color: "#000",
    fontFamily: "OpenSans-Regular",
    fontSize: 10,
    marginBottom: 5,

  },
  container: {
    padding: 5,
  },
  tags_row: {
    flexDirection: "row",

  },
  tag: {
    backgroundColor: "#f5aa42",
    borderRadius: 3,
    fontWeight: "bold",
    fontSize: 10
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
    backgroundColor: "#e8e8e8",
    marginBottom: 5,
    margin: 14,
    marginTop: 0,
    borderRadius: 14


  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000"
  }
});