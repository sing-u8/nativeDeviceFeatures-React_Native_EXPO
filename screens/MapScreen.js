import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, {Marker} from 'react-native-maps'

const MapScreen = (props) => {

  const initialLocation = props.route.params.initialLocation
  const readOnly = props.route.params.readOnly

  const [selectedLocation, setSelectedLocation] = React.useState(initialLocation)
  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const savePickedLocationHandler = React.useCallback(() => {
    if( !selectedLocation ){
      // could show an alert!
      return
    }
    props.navigation.navigate({
      name:'NewPlace',
      params: {
        pickedLocation: selectedLocation
      }
    })
  },[selectedLocation])

  React.useEffect(() => {},[])

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {

        if(readOnly) return {}
        return (
          <TouchableOpacity style={styles.headerButton} onPress={savePickedLocationHandler}>
            <Text 
              style={styles.headerButtonText}
            >
              Save
            </Text>  
          </TouchableOpacity>
        )
      }
    })
  },[props.navigation, savePickedLocationHandler]) // **

  const selectLocationHandler = (event) => {
    if(readOnly) {
      return
    }
    setSelectedLocation({ 
      lat: event.nativeEvent.latitude,
      lng: event.nativeEvent.longitude
    })
  }

  let markerCoordinates = null

  if(selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView 
      style={styles.map} 
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && <Marker 
        title='Picked Location' 
        coordinate={markerCoordinates}>
        
      </Marker>}
    </MapView>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  }, 
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
})
