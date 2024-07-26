import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('products/fetchProducts', async()=>{
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    return data
})

const productsSlice = createSlice({
    name:'product',
    initialState:{
        status: "idel",
        productList : []
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchData.pending,(state)=>{
            state.status = "loading"
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            state.status = "succeeded"
            state.productList = action.payload
        })
        .addCase(fetchData.rejected,(state)=>{
            state.status = "rejected"

        })

    }
})

export default productsSlice.reducer