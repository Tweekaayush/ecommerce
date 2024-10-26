import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) || {
    totalProducts: 0,
    totalPrice: 0,
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        changeItemQuantity: (state, action)=>{

            let newArr = [...state.cartItems] 

            if(action.payload.quantity <= 0){

                newArr = newArr.filter((item)=>item.id !== action.payload.id)

            }else{

                newArr = newArr.map((item)=>{
                    if(item.id === action.payload.id){
                        return {...item, quantity: action.payload.quantity} 
                    }else{
                        return item
                    }
                })
            }

            const newState = {
                cartItems: newArr,
                totalPrice: newArr.reduce((acc, item) => acc + (item.quantity*item.price), 0),
                totalProducts: newArr.length
            }

            state.cartItems = newState.cartItems
            state.totalPrice = newState.totalPrice
            state.totalProducts = newState.totalProducts

            localStorage.setItem('cart', JSON.stringify(newState))
        },

        addToCart: (state, action)=>{

            let newArr = [...state.cartItems]
            let foundIndex = state.cartItems.findIndex(x => x.id === action.payload.id);

            if(foundIndex === -1){

                newArr = [...newArr, action.payload]

            }else{

                newArr = newArr.map((item)=>{
                    if(item.id === action.payload.id){
                       return {...item, quantity: item.quantity + action.payload.quantity} 
                    }else{
                        return item
                    }
                })
                
            } 
            const newState = {
                cartItems: newArr,
                totalPrice: newArr.reduce((acc, item) => acc + (item.quantity*item.price), 0),
                totalProducts: newArr.length
            }

            state.cartItems = newState.cartItems
            state.totalPrice = newState.totalPrice
            state.totalProducts = newState.totalProducts

            localStorage.setItem('cart', JSON.stringify(newState))
        },

        removeFromCart: (state, action)=>{

            const newArr = state.cartItems.filter((item)=>item.id !== action.payload)
        
            const newState = {
                cartItems: newArr,
                totalPrice: newArr.reduce((acc, item) => acc + (item.quantity*item.price), 0),
                totalProducts: newArr.length
            }

            state.cartItems = newState.cartItems
            state.totalPrice = newState.totalPrice
            state.totalProducts = newState.totalProducts

            localStorage.setItem('cart', JSON.stringify(newState))
        },
        clearCart: (state)=>{
            const cart = {
                totalProducts: 0,
                totalPrice: 0,
                cartItems: []
            }
            state.totalPrice = cart.totalPrice
            state.cartItems = cart.cartItems
            state.totalProducts = cart.totalProducts
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
})


export const {changeItemQuantity, addToCart, removeFromCart, clearCart} = cartSlice.actions

export default cartSlice.reducer