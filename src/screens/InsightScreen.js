import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel-v4';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NEWS_API } from '../service/apis/NewsService';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window')

const InsightScreen = ({ route, navigation }) => {
    const { post } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(state => state.userAuth.user.user);
    const [saved, setsaved] = useState(false);

    const payload = {
        "userId": user._id,
        "postId": post._id
    }

    useEffect(() => {
        try {
            NEWS_API.GetToCollection(payload).then((res) => {
                if (res.data.data) {
                    setsaved(true)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [saved])


    const toogleSave = async () => {

        if (saved) {
            await NEWS_API.RemToCollection(payload).then((res) => {
                setsaved(false)
            })
        } else {
            await NEWS_API.AddToCollection(payload).then((res) => {
                setsaved(true)
            })
        }

    }



    const [activeSlide, setactiveSlide] = useState(1);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (

            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item?.image }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.container} source={{ uri: post?.image }} blurRadius={20}>

                <View style={{flexDirection:"row",alignSelf:"flex-end", alignItems:"center",justifyContent:"center",marginTop:10,backgroundColor:"#eeee",padding:12,borderTopLeftRadius:33,borderBottomLeftRadius:33 }}>
                    <Text style={{ fontFamily: "Poppins-Thin", fontSize: 24, fontWeight: "100", color: "#000", marginRight: 20 }}>
                        Insights
                    </Text>

                    <TouchableOpacity onPress={()=>toogleSave()} style={{backgroundColor:"#fff",padding:5,borderRadius:99,elevation:4}}>
                        <Ionicons  name={saved ? "bookmark" : "bookmark-outline"} color="#000" size={25}  />
                    </TouchableOpacity>

                </View>


                <Text style={{ fontFamily: "Poppins-BoldItalic", textAlign: "right", fontSize: 14, fontWeight: "100", color: "#fff", marginBottom: 10, marginTop: 10, marginRight: 20 }} numberOfLines={2}>
                    {post.title}
                </Text>
                <Carousel
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 60}
                    onSnapToItem={(index) => setactiveSlide(index)}
                    data={post?.insight_arr}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                />

                <Pagination
                    dotsLength={post?.insight_arr?.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{ backgroundColor: "transparent" }}
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
    title: { fontFamily: "Poppins-Light", textAlign: "right", fontSize: 14, fontWeight: "100", color: "#fff", marginBottom: 20, marginTop: 20, marginRight: 20 },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
