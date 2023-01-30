import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import Render from 'react-native-render-html';



export default function RenderHtml({ value }) {

    const source = {
        html: value
    };
    const { width } = useWindowDimensions();
    return (
        <View style={{margin:16}}>
            <Render
                contentWidth={width}
                source={source}
            />
        </View>

    );
}