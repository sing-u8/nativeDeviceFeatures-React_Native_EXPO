import React from 'react'
import { StyleSheet, Text, View, platform, FlatList } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import PlaceItem from '../components/PlaceItem'
import {asyncFetchPlaces} from '../reduxStore/Slices/placesSlice'

const PlacesListScreen = (props) => {
  const reduxDispatch = useDispatch()
  const places = useSelector(state => state.places.places)

  React.useEffect(() => {
    reduxDispatch(asyncFetchPlaces())
  },[reduxDispatch])

  return (
    <FlatList 
      data={places} 
      keyExtractor={item => item.id}
      renderItem={itemData => (

        <PlaceItem 
          image={itemData.item.image} 
          title={itemData.item.title}
          address={itemData.item.address}

          onSelect={()=> {
            props.navigation.navigate({
              name:'placeDetail',
              params: {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id
              }
            })
          }}

        />

      )}  
    />
  )
}

export default PlacesListScreen

const styles = StyleSheet.create({})
