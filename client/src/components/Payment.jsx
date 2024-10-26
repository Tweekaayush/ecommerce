import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOrder } from '../features/userSlice'
import CheckoutCartList from './CheckoutCartList'
import CartSummary from './CartSummary'
import DeliveryAddress from './DeliveryAddress'
import { v4 as uuidv4 } from 'uuid';


const Payment = ({order}) => {

  const dispatch = useDispatch()
  const order_id = uuidv4();
  const {email, address} = useSelector(state=>state.user.data)
  const [updatedOrder, setUpdatedOrder] = useState([])

  const placeOrder = async() =>{
    try{
      const res = await fetch('http://localhost:8000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          email: email,
          address: address.state,
          items: [...updatedOrder]
        })
      })
      const data = await res.json()
      window.location = data?.url
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    const updateOrder = () =>{
      const date = new Date()
      const fullDate = String(date.getUTCDate()+'/'+date.getUTCMonth()+ '/' +date.getUTCFullYear())
  
      const newOrder = order.items.map((item)=>{
        let id = uuidv4();
        return {
          ...item,
          totalPrice: item.price*item.quantity,
          purchase_date: fullDate,
          order_status: 'Preparing to Dispatch',
          id: id,
          order_id: order_id
        }
      })
      
      setUpdatedOrder(newOrder)
      dispatch(setCurrentOrder(newOrder))
    }
    
    console.log('hi')
    updateOrder()
  }, [order])

 
  return (
      <div className="checkout-container">
        <div className="checkout-left-container">
          <DeliveryAddress/>
          <CheckoutCartList/>
        </div>
        <div className="checkout-right-container">
          <CartSummary btn={`Pay $${order?.totalPrice}`} placeOrder={placeOrder}/>
        </div>
      </div>
  )
}

export default Payment