import React from 'react';
import { Button, Text, TouchableOpacity, Platform } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'

import Colors from '../constants/Colors'
import HeaderButton from '../components/HeaderButton'

const defaultScreenOptions = {
  headerStyle:{
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  // headerTitleStyle: {
  //     fontFamily: 'open-sans-bold'
  // },
  // headerBackTitleStyle: {
  //     fontFamily: 'open-sans'
  // }
}

const placeStack = createStackNavigator()
const PlacesNavigator = (props) => {
  return (
    <placeStack.Navigator 
      screenOptions={defaultScreenOptions}
    >
      <placeStack.Screen name={"Places"} component={PlacesListScreen} 
        options={({route, navigation}) => {
          return (
            {
              headerTitle: 'All Places',
              headerRight: () => (
                <HeaderButtons 
                    HeaderButtonComponent={HeaderButton}
                >
                    <Item 
                        title='Add Place' 
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={()=>{
                          navigation.navigate({
                              name:'NewPlace'
                          })
                        }}
                    />
                </HeaderButtons>
            ),
            }
          )
        }
      }/>
      <placeStack.Screen name={"placeDetail"} component={PlaceDetailScreen}
        options={({route, navigation}) => {
          return (
            {
              headerTitle: route.params.placeTitle,
            }
          )}
        }            
      />
      <placeStack.Screen name={"NewPlace"} component={NewPlaceScreen}
        options={({route, navigation}) => {
          return (
            {
              headerTitle: 'Add Places',
              headerRight: () => (
                <HeaderButtons 
                    HeaderButtonComponent={HeaderButton}
                >
                    <Item 
                        title='Add Place' 
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={()=>{
                          navigation.navigate({
                              name:'NewPlace'
                          })
                        }}
                    />
                </HeaderButtons>
            ),
            }
          )}
        }      
      />
      <placeStack.Screen name={"Map"} component={MapScreen}
        options={({route, navigation}) => {
          return (
            {
              headerTitle: 'Map',
            }
          )}
        }            
      />
    </placeStack.Navigator>
  )
}

export default PlacesNavigator

