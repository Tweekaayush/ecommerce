import React, { useEffect, useState } from 'react'
import {Close} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeItemQuantity, removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

const CartItem = ({img, title, price, quantity, id}) => {

    const dispatch = useDispatch()
    const [itemQuantity, setItemQuantity] = useState(quantity)
    const navigate = useNavigate()

    const handleRemoveFromCart = (e) =>{
        e.stopPropagation()
        dispatch(removeFromCart(id))
        toast.success('Removed From Cart!', {
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

    useEffect(()=>{
        dispatch(changeItemQuantity({quantity: itemQuantity, id: id}))
    }, [itemQuantity])

    useEffect(()=>{
        setItemQuantity(quantity)
    }, [quantity])

  return (
    <div className="cart-item" onClick={()=>navigate(`/product/${id}`)}>
        <div className="cart-item-img">
            <img src={img} alt={title} loading='lazy' />
        </div>
        <div className="cart-middle">
            <h3>{title}</h3>
            <p>
                <span>$ </span>
                {price}
            </p>
            <div className="cart-quantity-container">
                <button onClick={(e)=>[e.stopPropagation(), setItemQuantity(prev=> prev-1)]}>-</button>
                <p>{itemQuantity}</p>
                <button onClick={(e)=>[e.stopPropagation(), setItemQuantity(prev => prev+1)]}>+</button>
            </div>
        </div>
        <Close onClick={handleRemoveFromCart} />
    </div>
  )
}

export default CartItem