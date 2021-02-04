import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import ENV from '../env'

const MapPreview = (props) => {
  const {location, style, onPress} = props
  // imagePreviewUrl --> "Google Maps Platform의 overview - A Quick Example 참고"
  // url의 'center=' 에 경도 위도 넣기 --> ㄹ ${props.location.lat}, ${props.location.lng}
  let  imagePreviewUrl = null
  if(location){
    imagePreviewUrl = 'You need to insert Google Maps platform URL in it! + ENV'
  }
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={{...styles.mapPreview, ...style}}
    >
      {props.location 
      ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/> 
      : props.children}
    </TouchableOpacity>
  )
}

export default MapPreview

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%',
  }
})

/* lecture version
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;

*/