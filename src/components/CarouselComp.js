import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage,Pagination} from 'react-native-snap-carousel-v4';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { NEWS_API } from '../service/apis/NewsService';
import { useDispatch, useSelector } from 'react-redux';
import { addSlide } from '../store/NewsSlice';


const {width: screenWidth} = Dimensions.get('window');

const CarouselComp = ({navigation}) => {

  const [entries, setEntries] = useState([]);
  const [activeSlide, setactiveSlide] = useState(1);
  const carouselRef = useRef(null);
  const slide = useSelector(state => state.NewsSlice.slide);
  const dispatch = useDispatch()
  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const goPrev = () => {
    carouselRef.current.snapToPrev();
  };
  useEffect(() => {
   async function fetchData (){
    const res = await NEWS_API.slideFetch();
    dispatch(addSlide(res.data.data))
   }

   fetchData();
    
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("NewsComp", { post: item })}>
        <ParallaxImage
          source={{uri: item.image}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
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
        data={slide}
        onSnapToItem={(index) => setactiveSlide(index) }
        renderItem={renderItem}
        hasParallaxImages={true}
      />
        <Pagination
              dotsLength={slide.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: "transparent"}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: "#666"
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
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
