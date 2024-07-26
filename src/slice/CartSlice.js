import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartList : JSON.parse(localStorage.getItem('cartList')) || []
    },
    reducers:{
        addToCart(state,action){
        const existingProduct = state.cartList.find(data=> data.id === action.payload.id)
        if(existingProduct){
            existingProduct.quantity += 1
        } else{
            state.cartList.push({...action.payload,quantity:1})
        }
        localStorage.setItem('cartList',JSON.stringify(state.cartList))
        },
        removeCart(state,action){
            state.cartList = state.cartList.filter(data=>data.id !== action.payload.id)
            localStorage.setItem('cartList',JSON.stringify(state.cartList))
        },
        removeAllCartItems(state,action){
            state.cartList = action.payload
        localStorage.removeItem('cartList')
        },
        increaseQuantity(state,action){
        const existingProduct = state.cartList.find(data=> data.id === action.payload.id)
            if(existingProduct){
                existingProduct.quantity += 1
            }
            localStorage.setItem('cartList',JSON.stringify(state.cartList))

        },
        decreaseQuantity(state,action){
            const existingProduct = state.cartList.find(data=> data.id === action.payload.id)
                if(existingProduct){
                    existingProduct.quantity -= 1
                    if(existingProduct.quantity ===0){
                        state.cartList = state.cartList.filter(data=> data.quantity > 0)
                    }
                }
            localStorage.setItem('cartList',JSON.stringify(state.cartList))

            }
    }
})

export const {addToCart,removeCart,removeAllCartItems,increaseQuantity, decreaseQuantity} = cartSlice.actions

export default cartSlice.reducer