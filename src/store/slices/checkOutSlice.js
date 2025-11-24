import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";


//add checkOut
export const createCheckOut = createAsyncThunk(
    "checkOut/create",
    async (checkOutData, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/check-out/add`,
                checkOutData,
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

//pament checkout
export const payCheckOut = createAsyncThunk(
    "checkOut/pay",
    async ({checkOutId, paymentDetails}, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/check-out/${checkOutId}/pay`,
                paymentDetails,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

//finalize payment
export const finalizeCheckOut = createAsyncThunk(
    "checkOut/finalize",
    async (checkOutId, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/check-out/${checkOutId}/finalize`,
                {},
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

const initialState ={
    checkOut: null,
    loading: false,
    error: null
}

const checkOutSlice = createSlice({
    name:"checkOut",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        //add checkOut
        builder
            .addCase(createCheckOut.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(createCheckOut.fulfilled, (state, action)=>{
                state.loading = false
                state.checkOut = action.payload?.data || null;
            })
            .addCase(createCheckOut.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload || action.error.message
            })
        
        //payment CheckOut
        builder
            .addCase(payCheckOut.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(payCheckOut.fulfilled, (state)=>{
                state.loading = false
            })
            .addCase(payCheckOut.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload || action.error.message
            })
        
        //payment finalize
        builder
            .addCase(finalizeCheckOut.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(finalizeCheckOut.fulfilled, (state)=>{
                state.loading = false
            })
            .addCase(finalizeCheckOut.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload || action.error.message
            })
    }
})

export default checkOutSlice.reducer