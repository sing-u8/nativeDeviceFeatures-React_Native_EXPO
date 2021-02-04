import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as FileSystem from 'expo-file-system'

import {insertPlace, fetchPlaces} from '../../helpers/db'
import Place from '../../model/place'
import ENV from '../../env'

// google maps platform Geocoding 필요 - addr 부분에
// 참고 https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests - reverse geocodding

export const asyncAddPlace = createAsyncThunk('places/ASYNC_ADD_PLACE',
  async (imgObj, thunkApi) => {
    const {image, title, location} = imgObj

    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)
    if(!res.ok) {
      throw new Error('google geoCodding request went wrong!')
    }

    const resData = await res.json()
    if(!resData.results) {
      throw new Error('There is no geo results!')
    }

    const address = resData.results[0].formatted_address
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName

    try{
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng)
      console.log("dbResult: ", dbResult)
      thunkApi.dispatch(
        placesActions.ADD_PLACE(
          dbResult.insertId, 
          title, 
          newPath, 
          address, 
          {lat: location.lat, lng: location.lng}
        )
      )
    } catch (err) {
      throw err
    }
  
  }
)

export const asyncFetchPlaces = createAsyncThunk('places/ASYNC_FETCH_PLACES',
  async () => {
    try{
      const dbRes = await fetchPlaces();
      console.log("dbRes.rows._array: ", dbRes.rows._array)
      return {places: dbRes.rows._array}
    } catch (err) {
      throw err
    }

  }
)

const slice = createSlice({
  name:"places",
  initialState:{
    places:[],
  },
  reducers: {
    ADD_PLACE:{
      reducer:(state, action)=>{
        const {placeData} = action.payload
        console.log(placeData)
        const newPlace = Place(
          placeData.id.toString(), 
          placeData.title,  
          placeData.image,
          placeData.address,
          placeData.coords.lat, 
          placeData.coords.lng
        )
        state.places.push(newPlace)
        console.log("state.places: ", state.places)
      },
      prepare(id, title, image, address, coords){
        return {
          payload:{
            placeData:{
              id: id,
              title:title,
              image: image,
              address: address,
              coords: {lat: coords.lat , lng: coords.lng}
            }
          }
        }
      }
    }

  },
  extraReducers:{
    [asyncAddPlace.rejected]:( state,action ) => {
      throw action.error
    },
    [asyncFetchPlaces.rejected]:(state, action) => {
      throw action.error
    },
    [asyncFetchPlaces.fulfilled]:(state, action) => {
      console.log("action.place: ", action.payload.places)
      state.places = action.payload.places.map(
        pl => Place(pl.id.toString(), pl.title, pl.image, pl.address, pl.lat, pl.lng)
      )
    }
  }
})

export const placesActions = slice.actions

export default slice.reducer