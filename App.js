import 'react-native-gesture-handler';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'

import PlaceNavigator from './navigation/PlacesNavigator'

import reduxStore from './reduxStore/rdxStore.index'
import {init} from './helpers/db'

init()
  .then(()=>{
    console.log('Initialized database')
  })
  .catch( err => {
    console.log('Initializing db failed.')
    console.log(err)
  })

export default function App() {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <PlaceNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
