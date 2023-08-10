import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product'
import authReducer from './slices/auth'

export default configureStore({
  reducer: {
    product : productReducer,
    auth: authReducer
  },
})