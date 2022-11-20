import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import LoadingComp from '../components/LoadingComp';

export default function WebViewScreen({ route,navigation }) {
    const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
    const {link} = route.params
    return (
        <WebView
            source={{ uri: link}}
            
        />
    )
}