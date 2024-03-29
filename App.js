import * as React from 'react';
import { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";

import AuthStack from './src/navigation/AuthStack';
import TabStack from './src/navigation/TabStack';

import { Provider, useSelector, useDispatch } from "react-redux";

import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedReducer } from './src/store/RootReducer';
import { rootSaga } from './src/service/sagas/RootSaga';
import createSagaMiddleware from 'redux-saga';
import ProfileStartupStack from './src/navigation/ProfileStartupStack';
import AppStack from './src/navigation/AppStack';
import axios from 'react-native-axios';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import notifee, { AndroidStyle, AndroidColor } from '@notifee/react-native';
import { flushHomeData } from './src/store/NewsSlice';
import { API } from './src/service/apis/UserService';
import ReduxSetup from './src/components/ReduxSetup';



const saga = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [saga]

})
saga.run(rootSaga)

function Root() {
  const userauth = useSelector(state => state.userAuth)

  async function saveTokenToDatabase(notifyToken) {

    if(userauth?.isSuccess){
      const payload = {
        "userId":userauth?.profile?._id,
        "notifyToken":notifyToken
      }
  
      const res = await API.userSendToken(payload)
  
      console.log(res)
    }
    
  }


  useEffect(() => {


    messaging()
      .getToken()
      .then(token => {
        console.log(token)
        return saveTokenToDatabase(token);
      });



    return messaging().onTokenRefresh(token => {
      saveTokenToDatabase(token);
    });
  }, []);

  return (
    <NavigationContainer >
      {!userauth?.isSuccess ? <AuthStack /> :
        <AppStack />
      }
    </NavigationContainer>
  )
}


async function onDisplayNotification(payload) {


  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  // Display a notification
  await notifee.displayNotification({
    title: payload.data.title,
    body: payload.data.body,
    android: {
      channelId,
      style: { type: AndroidStyle.BIGPICTURE, picture: payload?.data?.url },
    },
  });
}


export default function App() {

  useEffect(() => {

    messaging().onNotificationOpenedApp(remoteMessage => {
      onDisplayNotification(remoteMessage)
    });
    
    messaging().getInitialNotification().then(remoteMessage => {
      onDisplayNotification(remoteMessage)
    });
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage)
    });
   

    return unsubscribe;
  }, [])
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.Fragment>
          <App />
          <Root />
          <ReduxSetup />
        </React.Fragment>
      </PersistGate>
    </Provider >
  );
}
