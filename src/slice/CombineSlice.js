import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from './ProductSlice'
import cartReducer from './CartSlice'
import todoReducer from './TodoSlice'

export const rootReducer = combineReducers({
    products: productsReducer,
    carts: cartReducer,
    todos: todoReducer
})