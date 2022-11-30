import { View, Text, ImageBackground } from 'react-native'
import React,{useState} from 'react'
import Carousel, { ParallaxImage,Pagination } from 'react-native-snap-carousel-v4';
import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

const InsightScreen = ({ route, navigation }) => {
    const { post } = route.params;
    const [activeSlide, setactiveSlide] = useState(1);
    const renderItem = ({ item, index }, parallaxProps) => {
        return (

            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item?.image}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                
                
            </View>
        )
    }
    return (
        <View style={styles.container}>
             <ImageBackground style={styles.container} source={{ uri: post?.image }} blurRadius={5}>

            <Text style={{fontFamily:"Poppins-Thin",textAlign:"right", fontSize:24,fontWeight:"100",color:"#fff",marginBottom:10,marginTop:10 ,marginRight:20}} numberOfLines={2}>
                   Insights
            </Text>
            <Text style={{fontFamily:"Poppins-BoldItalic",textAlign:"right", fontSize:14,fontWeight:"100",color:"#fff",marginBottom:10,marginTop:10 ,marginRight:20}} numberOfLines={2}>
                   {post.title}
            </Text>
            <Carousel
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                onSnapToItem={(index) => setactiveSlide(index) }
                data={post?.insight_arr}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
            
            <Pagination
         dotsLength={post?.insight_arr.length}
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
        </ImageBackground>
         
        </View>
       
    )
}

export default InsightScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    item: {
        width: screenWidth - 60,
        height: "100%",
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',

        borderRadius: 10
    },
    title: {fontFamily:"Poppins-Light",textAlign:"right", fontSize:14,fontWeight:"100",color:"#fff",marginBottom:20,marginTop:20 ,marginRight:20},
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
