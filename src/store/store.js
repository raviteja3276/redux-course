import { configureStore } from "@reduxjs/toolkit";
// import { rootReducer } from "../slice/CombineSlice";
import productsReducer from '../slice/ProductSlice'
import { rootReducer } from "../slice/CombineSlice";

// const loggerMiddleware = storeAPI => next => action => {
//     console.log('dispatching', action);
//     let result = next(action);
//     console.log('next state', storeAPI.getState());
//     return result;
//   };
  
  
const store = configureStore({
    reducer: rootReducer,
    // middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddleware)
})

export default store;