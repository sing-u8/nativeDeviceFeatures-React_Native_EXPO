import React from 'react'
import { StyleSheet,Button, Text, View, TextInput, ScrollView } from 'react-native'
import {useDispatch} from 'react-redux'

import Colors from '../constants/Colors'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

import {asyncAddPlace} from '../reduxStore/Slices/placesSlice'

// 복잡한 validation 과정은 제외하고 필요한 부분만
const NewPlaceScreen = (props) => {

  const reduxDispatch = useDispatch()
  const [titleValue, setTitleValue] =React.useState('')
  const [selectedImage, setSelectedImage] = React.useState()
  const [selectedLocation, setSelectedLocation] = React.useState()

  const titleChangeHandler = text => {
    //you could add validation
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    reduxDispatch(asyncAddPlace({title: titleValue, image:selectedImage, location: {...selectedLocation}}))
    props.navigation.goBack()
  }

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath)
  }

  const locationPickedHandler = React.useCallback((location) => {
    setSelectedLocation(location)
  },[setSelectedLocation]) // *****

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.textInput}         
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler}/>
        <LocationPicker 
          navigation={props.navigation} 
          route={props.route}
          onLocationPicked = {locationPickedHandler}
        />
        <Button 
          title="Save Place"
          color={Colors.primary} 
          onPress={savePlaceHandler} 
          value={titleValue}/>
      </View>
    </ScrollView>
  )
}

export default NewPlaceScreen

const styles = StyleSheet.create({
  form: {
    margin:30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical:4,
    paddingHorizontal: 2
  }
})
