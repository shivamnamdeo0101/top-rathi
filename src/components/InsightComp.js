import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel-v4';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,Image
} from 'react-native';
import { NEWS_API } from '../service/apis/NewsService';

const {width: screenWidth} = Dimensions.get('window');

const InsightComp = ({navigation}) => {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    async function fetchData (){
        const res = await NEWS_API.InsightFetch();
            console.log(res)
          setEntries(res.data.data)
       }
    
       fetchData();
  }, [entries]);

  const Comp = ({item, index}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.imageContainer}  onPress={() => navigation.navigate("NewsComp", { post: item })}>
            <Image
            source={{uri: item.image}}
            style={styles.image}
            />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>


      <ScrollView horizontal={true}>
            {
                entries.map((item,index)=>{
                    return (<View key={index}>
                        <Comp item={item} index={index}/>
                    </View>)
                })
            }
      </ScrollView>
     
    </View>
  );
};

export default InsightComp;

const styles = StyleSheet.create({
    container: {
        
    },
    item: {
      width: screenWidth / 2.5,
      height: screenWidth  / 2,
      margin:8,
      borderRadius:10
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      
      borderRadius:10
    },
    title:{
      fontFamily:"Poppins-ExtraBold",
      color:"#000",
      textAlign:"center",
  
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderRadius:10
    },
  });
  