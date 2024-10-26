import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productReducer from '../features/productSlice'
import cartReducer from '../features/cartSlice'
import userReducer from '../features/userSlice'
 
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
                getDefaultMiddleware({
                    serializableCheck: false
                })
})

export default store