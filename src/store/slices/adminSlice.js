import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//fetched all users
export const fetchedAllUsers = createAsyncThunk(
    "admin/users",
    async (_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/admin/get-users`,
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

//admin added
export const addAdmin = createAsyncThunk(
    "admin/add",
    async(userData, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/admin/add-admin`,
                userData,
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

//change user role
export const changeRole = createAsyncThunk(
    'admin/change-role',
    async (userData, {rejectWithValue})=>{
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/admin/change-role`,
                userData,
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

//delete user
export const deleteUser = createAsyncThunk(
    'admin/delete-user',
    async (userData, {rejectWithValue})=>{
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/admin/delete-user`,
                {
                    data: userData,
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
    users:[],
    error: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        //fetched all user
        builder
            .addCase(fetchedAllUsers.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(fetchedAllUsers.fulfilled, (state, action)=>{
                state.loading = false
                state.users = action.payload.data
            })
            .addCase(fetchedAllUsers.rejected, (state, action)=>{
                state.loading = false
                state.error = action.error.message
            })
        //add admin
        builder
            .addCase(addAdmin.pending, (state)=>{
                state.loading = true
                state.error = null
            })
            .addCase(addAdmin.fulfilled, (state, action)=>{
                state.loading = false
                state.users.push(action.payload.data)
            })
            .addCase(addAdmin.rejected, (state, action)=>{
                state.loading = false
                state.error = action.payload.error
            })
        //change role
            builder
                .addCase(changeRole.pending, (state)=>{
                    state.loading = true
                    state.error = null
                })
                .addCase(changeRole.fulfilled, (state, action)=>{
                    state.loading = false
                    const updateIdx = state.users.findIndex((user)=>user._id === action.payload.data._id)
                    if (updateIdx > -1) {
                        state.users[updateIdx] = action.payload.data
                    }
                })
                .addCase(changeRole.rejected, (state, action)=>{
                    state.loading = false
                    state.error = action.error.message
                })
            //delete user
            builder
                .addCase(deleteUser.pending, (state)=>{
                    state.loading = false
                    state.error = null
                })
                .addCase(deleteUser.fulfilled, (state, action)=>{
                    state.loading = false
                    state.users = state.users.filter((user)=>user._id !== action.payload.data)
                })
                .addCase(deleteUser.rejected, (state, action)=>{
                    state.loading = false
                    state.error = action.error.message
                })
    }
})

export default adminSlice.reducer