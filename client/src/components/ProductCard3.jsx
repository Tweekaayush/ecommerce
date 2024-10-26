import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Close } from '@mui/icons-material'
import { moveToCart, removeFromWishlist } from '../features/userSlice'
import { toast, Bounce } from 'react-toastify'

const ProductCard3 = ({product}) => {
    const {img, title, price, ratings, id} = product
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleRemoveFromWishlist = (e) => {
        e.stopPropagation()
        dispatch(removeFromWishlist(id))
        toast.success('Removed From Wishlist!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const handleMoveToCart = (e) =>{
        e.stopPropagation()
        dispatch(moveToCart({...product, quantity: 1}))
        toast.success('Moved To Cart!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

  return (
    <div className="product-card" onClick={()=>navigate(`/product/${id}`)}>
        <Close className='product-class-close' onClick={handleRemoveFromWishlist}/>
        <div className="product-card-head">
            <img src={img} alt={title} className='product-card-img2' loading='lazy'/>
        </div>
        <div className="product-card-content">
            <h3>{title}</h3>
            <p>
                {ratings}
                <Rating name='half-rating-read' value={ratings} precision={0.1} readOnly/>
            </p>
            <p>$ {price}</p>
            <button 
                className="section-btn"
                onClick={handleMoveToCart}
            >
                Move To Cart
            </button>
        </div>

    </div>
  )
}

export default ProductCard3