import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch cart
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/cart/get`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )

            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//add item to cart
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/add`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//update cart item quantity
export const updateItemQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/update-quantity`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

//remove item from cart
export const deleteItemFromCart = createAsyncThunk(
    'cart/deleteItem',
    async (productData) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/cart/delete`,
                {
                    data: productData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong")
        }
    }
)

const initialState = {
    cart: [],
    loading: false,
    error: null
}

const cartSlide = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = []
        }
    },
    extraReducers: (builder) => {
        //fetch cart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = Array.isArray(action.payload) ? action.payload : []
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //add items
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.cart = [...state.cart, action.payload]
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //update quantity
        builder
            .addCase(updateItemQuantity.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateItemQuantity.fulfilled, (state, action) => {
                state.loading = false
                const updatedItem = action.payload
                const index = state.cart.findIndex(item => item._id === updatedItem._id)
                if (index > -1) {
                    state.cart[index] = updatedItem
                }
            })
            .addCase(updateItemQuantity.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //delete item
        builder
            .addCase(deleteItemFromCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteItemFromCart.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload?.deletedId) {
                    state.cart = state.cart.filter(
                        (item) => item._id !== action.payload.deletedId
                    );
                }
            })
            .addCase(deleteItemFromCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { clearCart } = cartSlide.actions
export default cartSlide.reducer