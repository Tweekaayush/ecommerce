import React from 'react'

const OrderItem = ({img, title, quantity, price, purchase_date, order_status}) => {
 
  return (
    <div className="order-item-container">
        <div>
            <div>
                <img src={img} alt={title} loading='lazy'/>
            </div>
            <p>{title}</p>
        </div>
        <p>
            {quantity}
        </p>
        <p>
            $ {price*quantity}
        </p>
        <p>
            {order_status}
        </p>
        <p>
            {String(purchase_date)}
        </p>
    </div>
  )
}

export default OrderItem