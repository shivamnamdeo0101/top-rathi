import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
        <Text>Hi</Text>
    </View>
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }}>
        <Text>Hi</Text>
    </View>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export default function  NewsTabView ({ navigation }){

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'For You' },
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            labelStyle={{ fontSize: 12, fontFamily: "OpenSans-Bold" }}
            activeColor='#f5ae0a'
            inactiveColor="#ccc"
            indicatorStyle={{ backgroundColor: '#f5ae0a' }}
            style={{ backgroundColor: 'white' }}
            renderIcon={({ route, focused, color, size = 18 }) => (

                <View>
                    
                </View>



            )}
        />
    );

    return (
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}
