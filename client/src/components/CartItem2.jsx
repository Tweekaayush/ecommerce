import React, { useEffect, useState } from 'react'
import {Delete} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeItemQuantity, removeFromCart } from '../features/cartSlice';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CartItem2 = ({img, title, price, quantity, id}) => {

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
    <div className="cart-checkout-item" onClick={()=>navigate(`/product/${id}`)}>
        <div className="cart-checkout-item-details">
            <div>
                <img src={img} alt={title} loading='lazy'/>
            </div>
            <h3>{title}</h3>
        </div>
        <div className="cart-checkout-item-price">
            <p>
                <span>$ </span>
                {price}
            </p>
        </div>
        <div className="cart-quantity-container">
            <button onClick={(e)=>[e.stopPropagation(), setItemQuantity(prev=> prev-1)]}>-</button>
                <p>{itemQuantity}</p>
            <button onClick={(e)=>[e.stopPropagation(),setItemQuantity(prev => prev+1)]}>+</button>
        </div>
        <div className="cart-checkout-item-subtotal">
            <p>
                $ {price * quantity}
            </p>
        </div>
        <div>
            <Delete onClick={handleRemoveFromCart} />
        </div>
    </div>
  )
}

export default CartItem2