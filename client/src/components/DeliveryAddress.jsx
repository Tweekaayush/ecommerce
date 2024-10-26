import React from 'react'
import { useSelector } from 'react-redux'

const DeliveryAddress = () => {

    const {username, address} = useSelector(state=>state.user.data)

  return (
    <>
        <h1 className="heading-2">
          Delivery Address
        </h1>
        {
          address?.pincode?(
            <div className='delivery-address-container'>
              <h2>{username}</h2>
              <p>
                {address?.address_line}, {address?.town}
                  <br/>
                {address?.city}, {address?.state} - {address?.pincode}
              </p>
            </div>
            ):(
            <></>
          )
        }
    </>
  )
}

export default DeliveryAddress