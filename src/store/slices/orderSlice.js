import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//fetch orders
export const fetchedOrders = createAsyncThunk(
    "order/my-order",
    async (_, {rejectWithValue}) =>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders/my-orders`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

//fetch order details
export const fetchedOrderDetails = createAsyncThunk(
    "order/order-details",
    async (orderId, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/orders/order-details/${orderId}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    orders: [],
    orderDetails: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        //get all orders
        builder
            .addCase(fetchedOrders.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchedOrders.fulfilled, (state, action)=>{
                state.loading = false,
                state.orders = action.payload
            })
            .addCase(fetchedOrders.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.error.message
            })
        
        //get orders details
        builder
            .addCase(fetchedOrderDetails.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchedOrderDetails.fulfilled, (state, action)=>{
                state.loading = false,
                state.orderDetails = action.payload
            })
            .addCase(fetchedOrderDetails.rejected, (state, action)=>{
                state.loading = false,
                state.error = action.error.message
            })
    }
})

export default orderSlice.reducer