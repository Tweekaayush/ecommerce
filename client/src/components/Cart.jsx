import React, { useEffect } from 'react'
import img from '../assets/images/cart/empty-cart.png'
import { useLocation, useNavigate } from 'react-router-dom'
import CartItem from './CartItem'
import { Close } from '@mui/icons-material'
import {useSelector} from 'react-redux'

const Cart = ({cartStatus, setCartStatus}) => {

    const {cartItems, totalProducts, totalPrice} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const handleRedirect = () =>{
        setCartStatus(false)
        navigate('/checkout')
    }

    useEffect(()=>{
        setCartStatus(false)
    }, [pathname])

  return (
    <div id="cart" className={cartStatus?'cart-active':''}>
        <div className="cart-headers">
            <h2>Your Shopping Cart ({totalProducts})</h2>
            <Close onClick={()=>setCartStatus(false)}/>
        </div>
        <div className="cart-content">
            {
                totalProducts === 0?(
                    <div className="empty-cart">
                        <img src={img} alt="empty-cart" />
                        <p>Your cart is empty!</p>
                        <button className="section-btn" onClick={()=>setCartStatus(false)}>Keep Browsing</button>
                    </div>
                ):(
                    <div className="cart-with-items">
                        <div className="cart-item-list">
                            {
                                cartItems?.map((item)=>{
                                    return <CartItem
                                                key={item.id}
                                                {...item}
                                                setCartStatus={setCartStatus}
                                            />
                                })
                            }
                        </div>
                            <div className="cart-summary">
                                <div className="cart-subtotal">
                                    <h3>Subtotal: </h3>
                                    <p>$ {totalPrice}/-</p>
                                </div>
                                <button className="section-btn" onClick={handleRedirect}>Checkout</button>
                            </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Cart