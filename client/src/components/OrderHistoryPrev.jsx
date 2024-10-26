import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import OrderItem from './OrderItem'

const OrderHistoryPrev = () => {
  
  const {orders} = useSelector(state => state.user.data)

  const paginate = 3
  const [page, setPage] = useState(1)

  const handlePageChange = (e, p) =>{
    setPage(p)
  }

  console.log(orders)

  return (
    <div className="order-history-container">
      <div className="profile-headings">
        <h1>Order History</h1>
      </div>
      <div className="order-history-table">
      {
        orders.length?(
        <div className="order-history-table-headers">
          <h4>
            Order Item
          </h4>
          <h4>
            Quantity
          </h4>
          <h4>
            Price
          </h4>
          <h4>
            Order Status
          </h4>
          <h4>
            Payed On
          </h4>
        </div>
        ):<></>
      }
        <div className="order-history-list">
          {
          orders && orders?.slice((page-1)* paginate, page * paginate).map((order)=> {
            return <OrderItem key={order.id} {...order} />
          })
          }
        </div>
      </div>
      {
        orders && <Pagination 
                    count={Math.ceil(orders?.length/paginate)} 
                    onChange={handlePageChange} 
                    page={page} 
                    defaultPage={1}
                    siblingCount={1}
                    boundaryCount={1}
                  />
      }
    </div>
  )
}

export default OrderHistoryPrev