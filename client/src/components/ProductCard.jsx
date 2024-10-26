import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'

const ProductCard = ({img, title, price, ratings, id}) => {
    const navigate = useNavigate()
  return (
    <div className="product-card" onClick={()=>navigate(`/product/${id}`)}>
        <div className="product-card-head">
            <img src={img} alt={title} className='product-card-img' loading='lazy'/>
        </div>
        <div className="product-card-content">
            <h3>{title}</h3>
            <p>
                {ratings}
                <Rating name='half-rating-read' value={ratings} precision={0.1} readOnly/>
            </p>
            <p>$ {price}</p>
        </div>

    </div>
  )
}

export default ProductCard