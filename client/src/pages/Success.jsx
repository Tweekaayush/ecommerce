import React, { useEffect } from 'react'
import { CheckCircleOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../features/userSlice'

const Success = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {current_order} = useSelector(state=>state.user.data)
    
    useEffect(()=>{
      window.scrollTo(0, 0)
      document.title = 'Order Confirmed'
      if(current_order){
        dispatch(createOrder(current_order))
      }
  }, [])  
  return (
    <section id="success">
        <div className="success-container">
            <CheckCircleOutline style={{color: 'rgb(8, 184, 52)'}}/>
            <h1>Order Confirmed!</h1>
            <p className='body-text'>Your payment has been received and your order will be delivered shortly.</p>
            <button className='section-btn' onClick={()=>navigate('/')}>Back To Home</button>
        </div>
    </section>
  )
}

export default Success