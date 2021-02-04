import { configureStore } from '@reduxjs/toolkit'

import placesReducer from './Slices/placesSlice'

const reduxStore = configureStore({
  reducer:{
    places: placesReducer
  },

});

export default reduxStore;