import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product'

export default configureStore({
  reducer: {
    product : productReducer
  },
})