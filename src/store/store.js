import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import checkOutReducer from './slices/checkOutSlice'
import ordersReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    checkOut: checkOutReducer,
    orders: ordersReducer,
    admin: adminReducer
  }
})

export default store