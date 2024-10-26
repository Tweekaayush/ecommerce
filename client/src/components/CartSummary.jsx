import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const CartSummary = ({placeOrder, btn}) => {
    const {totalProducts, totalPrice} = useSelector(state=>state.cart)
    const [totalAmount, setTotalAmount] = useState(0)
    const discount = 0
    const platformFee = 0

    useEffect(()=>{
        setTotalAmount(totalPrice - discount + platformFee + 0)
    }, [totalPrice])
  return (
    <div className='cart-summary-container'>
            <h1 className="heading-2">
                price Details ({totalProducts} items)
            </h1>
            <div className="cart-checkout-details">
                <div>
                    <h4>
                        Total MRP
                    </h4>
                    <p>
                        $ {totalPrice}
                    </p>
                </div>
                <div>
                    <h4>
                        Discount on MRP
                    </h4>
                    <p>
                        - $ {discount}
                    </p>
                </div>
                <div>
                    <h4>
                        Platform Fee
                    </h4>
                    <p>
                        $ {platformFee}
                    </p>
                </div>
                <div>
                    <h4>
                        Shipping Fee
                    </h4>
                    <p style={{color: 'green'}}>
                        Free
                    </p>
                </div>
            </div>
            <div className="cart-checkout-summary">
                <div>
                    <h1>Total Amount</h1>
                    <p> $ {totalAmount}</p>
                </div>
                <button className="section-btn" onClick={()=>placeOrder(totalAmount)}>{btn}</button>
            </div>
    </div>
  )
}

export default CartSummary