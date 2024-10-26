import React from 'react'
import CartItem2 from './CartItem2'
import { useSelector } from 'react-redux'

const CheckoutCartList = () => {
    const {cartItems, totalProducts} = useSelector(state=>state.cart)
  return (
    <>
        <h1 className="heading-2">
            Cart items ({totalProducts} items):
        </h1>
        <div className="checkout-cart-headers">
            <h4>
                Product
            </h4>
            <h4>
                Price
            </h4>
            <h4>
                Quantity
            </h4>
            <h4>
                Sub Total
            </h4>
            <span></span>
        </div>
        <div className="cart-checkout-items">
            {
                cartItems?.map((item)=>{
                    return <CartItem2 key={item.id} {...item}/>
                })
            }
        </div>
    </>
  )
}

export default CheckoutCartList