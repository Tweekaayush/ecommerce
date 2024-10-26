import React, { useState, useEffect, useCallback } from 'react'
import Stepper from '../components/Stepper'
import CartCheckout from '../components/CartCheckout'
import AddressCheckout from '../components/AddressCheckout'
import Payment from '../components/Payment'
import {ShoppingCart, Home, AccountBalance} from '@mui/icons-material';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSelector } from 'react-redux'
import img from '../assets/images/cart/empty-cart.png'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const [order, setOrder] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const {totalProducts} = useSelector(state => state.cart)
  const navigate = useNavigate()

  const checkoutSteps = [
    {
      name: 'Cart',  
      component: <CartCheckout setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>,
      icon: <ShoppingCart/>,
      title: 'Shopping Cart'
    },
    {
      name: 'Address',
      component: <AddressCheckout setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>,
      icon: <Home/>,
      title: 'Delivery Address'
    },
    {
      name: 'Payment',
      component: <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}>
                  <Payment setCurrentStep={setCurrentStep} order={order} setOrder={setOrder}/>
                </Elements>,
      icon: <AccountBalance/>,
      title: 'Payment'
    },
  ]

  const ActiveComponent = useCallback(() => { return checkoutSteps[currentStep-1]?.component}, [currentStep])

  useEffect(()=>{
    document.title = checkoutSteps[currentStep-1]?.title
  }, [currentStep, checkoutSteps])

  return (
    <>
      <section id='checkout'>
      {
        totalProducts !== 0?(
          <div className="checkout-pg-container">
            <Stepper checkoutSteps={checkoutSteps} currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            <ActiveComponent/>
          </div>
        ):(
          <div className='checkout-empty-card'>
            <img src={img} alt='empty-cart' />
            <p>Your Cart Is Empty!</p>
            <button className="section-btn" onClick={()=>navigate('/browse')}>Keep Browsing</button>
          </div>
        )
      }
      </section>
    </>
  )
}

export default Checkout