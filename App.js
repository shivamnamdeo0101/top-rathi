import * as React from 'react';
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


const saga = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [saga]

})
saga.run(rootSaga)

function Root() {
  const userauth = useSelector(state => state.userAuth)
  const token = useSelector(state => state.userAuth.user.token)


  return (
    <NavigationContainer >
      {!userauth?.user?.user?._id ? <AuthStack /> :
          <AppStack />
      }
    </NavigationContainer>
  )
}

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.Fragment>
          <App />
          <Root />
        </React.Fragment>
      </PersistGate>
    </Provider >
  );
}
