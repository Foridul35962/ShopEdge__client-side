import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: 0,
        maxPrice: 100,
        sortBy: "",
        search: "",
        meterial: "",
        collection: ""
    }
}

export const fetchedProductByFilter = createAsyncThunk(
    "products/fetchedByFilter",
    async (productData) => {
        const query = new URLSearchParams()
        if (productData.collection) {
            query.append('collection', productData.collection)
        }
        if (productData.size) {
            query.append('size', productData.size)
        }
        if (productData.color) {
            query.append('color', productData.color)
        }
        if (productData.gender) {
            query.append('gender', productData.gender)
        }
        if (productData.minPrice) {
            query.append('minPrice', productData.minPrice)
        }
        if (productData.category) {
            query.append('category', productData.category)
        }
        if (productData.maxPrice) {
            query.append('maxPrice', productData.maxPrice)
        }
        if (productData.sortBy) {
            query.append('sortBy', productData.sortBy)
        }
        if (productData.search) {
            query.append('search', productData.search)
        }
        if (productData.meterial) {
            query.append('meterial', productData.meterial)
        }
        if (productData.brand) {
            query.append('brand', productData.brand)
        }
        if (productData.limit) {
            query.append('limit', productData.limit)
        }

        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/all?${query.toString()}`)
        return res.data
    }
)

export const fetchedProductDetails = createAsyncThunk(
    "product/details",
    async (productId) => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/id/${productId}`)
        return res.data
    }
)

export const updatedProduct = createAsyncThunk(
    "product/update",
    async ({ productId, productData }) => {
        try {
            const res = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/update-product/${productId}`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                }
            )
            return res.data
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const similarProducts = createAsyncThunk(
    'product/similarProducts',
    async (productId) => {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/similar-product/${productId}`)
        return res.data
    }
)

export const fetchedAllProduct = createAsyncThunk(
    "product/all-product",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/all-product`,
                {
                    headers: {
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

export const addProduct = createAsyncThunk(
    "product/add-product",
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/add-product`,
                productData,
                {
                    headers: {
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

export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (productData, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/products/delete-product`,
                {
                    data: productData,
                    headers: {
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

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: 0,
                maxPrice: 100,
                sortBy: "",
                search: "",
                meterial: "",
                collection: ""
            }
        }
    },
    extraReducers: (builder) => {
        //handle fetching products with filter
        builder
            .addCase(fetchedProductByFilter.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchedProductByFilter.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data
            })
            .addCase(fetchedProductByFilter.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //handle fetching products with Id
        builder
            .addCase(fetchedProductDetails.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchedProductDetails.fulfilled, (state, action) => {
                state.loading = false
                state.selectedProduct = action.payload.data
            })
            .addCase(fetchedProductDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //handle update products with Id
        builder
            .addCase(updatedProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updatedProduct.fulfilled, (state, action) => {
                state.loading = false
                const updatedProduct = action.payload
                const index = state.products.findIndex(product =>
                    product._id === updatedProduct._id
                )
                if (index !== -1) {
                    state.products[index] = updatedProduct
                }
            })
            .addCase(updatedProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //handle similar products with Id
        builder
            .addCase(similarProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(similarProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data

            })
            .addCase(similarProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //fetch all product
        builder
            .addCase(fetchedAllProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchedAllProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data
            })
            .addCase(fetchedAllProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //add product
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //delete product
        builder
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products.filter((product) => product._id !== action.payload.data)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { setFilters, clearFilters } = productSlice.actions
export default productSlice.reducer