import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Search, ShoppingCartOutlined, PersonOutlined, FavoriteBorder} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import UserOptions from './UserOptions'

const Navbar = ({cartStatus, setCartStatus}) => {
   
  const [scroll, setScroll] = useState(false)
  const navigate = useNavigate()
  const {totalProducts} = useSelector(state=>state.cart)
  const {uid} = useSelector(state=>state.user.data)

  useEffect(()=>{
    const handleScroll = () =>{
        if(window.scrollY > 0){
            setScroll(true)
        }else{
            setScroll(false)
        }
    }

    window.addEventListener('scroll', handleScroll)
    return ()=>{
        window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
        <div className={cartStatus?'page-overlay-active':''} id='page-overlay' onClick={()=>setCartStatus(false)}></div>
        <nav className={scroll?'navbar scrolled':'navbar'}>
            <div className='nav-container'>
                <Link to='/' className='nav-brand'>Ecommerce</Link>
                <ul className={scroll?'nav-links nav-active':'nav-links'}>
                    <li className="nav-item" onClick={()=>navigate('/browse')}>
                        <Search />
                        <p>Browse</p>
                    </li>
                    <li className="nav-item" onClick={()=>navigate('/wishlist')}>
                        <FavoriteBorder />
                        <p>Wishlist</p>
                    </li>
                    <li className="nav-item" onClick={()=>setCartStatus(true)}>
                        <ShoppingCartOutlined />
                        <p>
                            Cart
                        </p>
                        { totalProducts?<span className='cart-length-container'>{totalProducts}</span>:<></>}
                    </li>
                    {
                        uid?(
                            <li className="nav-item">
                                <UserOptions/>
                            </li>
                        ):(
                            <li className="nav-item" onClick={()=>navigate('/login')}>
                                <PersonOutlined />
                                <p>Login</p>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar