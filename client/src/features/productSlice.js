import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import db, { getDocs, collection } from "../config/firebase"

const initialState = {
    loading: false,
    data: {
        allProducts: [],
        filteredProducts: [],
        trendingProducts: [],
        bestSellingProducts: [],
        categories: [],
        productsLength: 0,
        productDetails: {}
    },
    error: ''
}

export const fetchProducts = createAsyncThunk('fetchProducts', async() =>{

    const snapshot = await getDocs(collection(db, 'products'))
    let items = []
    snapshot.forEach((doc)=>{
        items = [...items, {id: doc.id, ...doc.data()}]
    })

    const categories = new Set(items.map((product)=>product.category))
    const length = items.length
    const bestSellingProducts = items.filter((product)=>product.ratings >= 4.5)
    const trendingProducts = items.slice(0, 8)

    return {
        allProducts: items,
        categories: [...categories],
        productsLength: length,
        bestSellingProducts: bestSellingProducts,
        trendingProducts: trendingProducts
    }
})

export const getProductDetails = createAsyncThunk('getProductDetails', async (id)=>{

    const snapshot = await getDocs(collection(db, 'products'))
    let items = []

    snapshot.forEach((doc)=>{
        items = [...items, {id: doc.id, ...doc.data()}]
    })
    
    return items.find((product)=>product.id === id)
})

export const getFilteredProducts = createAsyncThunk('getFilteredProducts', async (category)=>{

    const snapshot = await getDocs(collection(db, 'products'))
    let items = []

    snapshot.forEach((doc)=>{
        items = [...items, {id: doc.id, ...doc.data()}]
    })

    const products = category === undefined ? items: items.filter((product)=>product.category === category)
    return products
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        
    },  
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(fetchProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data = {...state.data, ...action.payload}
        })

        builder.addCase(fetchProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(getProductDetails.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getProductDetails.fulfilled, (state, action)=>{
            state.loading = false
            state.data = {...state.data, productDetails: action.payload}
        })

        builder.addCase(getProductDetails.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })

        builder.addCase(getFilteredProducts.pending, (state)=>{
            state.loading = true
        })

        builder.addCase(getFilteredProducts.fulfilled, (state, action)=>{
            state.loading = false
            state.data = {...state.data, filteredProducts: action.payload, productsLength: action.payload.length}
        })

        builder.addCase(getFilteredProducts.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})


export default productSlice.reducer