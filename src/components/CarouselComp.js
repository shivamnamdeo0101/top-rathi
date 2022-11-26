import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel-v4';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NEWS_API } from '../service/apis/NewsService';

// const ENTRIES1 = [
//   {
//     title: 'Beautiful and dramatic Antelope Canyon',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//     illustration: 'https://i.imgur.com/UYiroysl.jpg',
//   },
//   {
//     title: 'Earlier this morning, NYC',
//     subtitle: 'Lorem ipsum dolor sit amet',
//     illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
//   },
//   {
//     title: 'White Pocket Sunset',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
//     illustration: 'https://i.imgur.com/MABUbpDl.jpg',
//   },
//   {
//     title: 'Acrocorinth, Greece',
//     subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//     illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
//   },
//   {
//     title: 'The lone tree, majestic landscape of New Zealand',
//     subtitle: 'Lorem ipsum dolor sit amet',
//     illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
//   },
// ];
const {width: screenWidth} = Dimensions.get('window');

const CarouselComp = ({navigation}) => {

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const goPrev = () => {
    carouselRef.current.snapToPrev();
  };
  useEffect(() => {
   async function fetchData (){
    const res = await NEWS_API.slideFetch();
      setEntries(res.data.data)
   }

   fetchData();
    
  }, [entries]);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("NewsComp", { post: item })}>
        <ParallaxImage
          source={{uri: item.image}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 50}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default CarouselComp;

const styles = StyleSheet.create({
  container: {

  },
  item: {
    width: screenWidth-40,
    height: screenWidth+20,
    marginLeft:-16,
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
  },
});
