import React, { useEffect, useState } from 'react'
import ProductCard3 from '../components/ProductCard3'
import { useSelector } from 'react-redux'
import emptyWishlist from '../assets/images/cart/wishlist.png'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {

    const {uid, wishlist} = useSelector(state => state.user.data)
    const [wishlistLength, setWishlistLength] = useState(0)
    const navigate = useNavigate()

    const handleRedirect = () =>{
        navigate( '/login',
            {
              state: {
                previousURL: '/wishlist'
              }
            }
        )
    }

    useEffect(()=>{
        setWishlistLength(wishlist?.length || 0)
    },[wishlist])

    useEffect(()=>{
        window.scrollTo(0, 0)
        document.title = 'Wishlist'
    },[])

  return (
    <section id="wishlist">
        <div className="wishlist-container">
            <div className="wishlist-header">
                <h1 className="section-heading">
                    My Wishlist
                    <p>
                        ( {wishlistLength} items )
                    </p>
                </h1>
            </div>
            {
                wishlist.length?(            
                    <div className="wishlist-grid">
                        {
                            wishlist?.map((product)=>{
                                return <ProductCard3 key={product.id} product={product}/>
                            })
                        }
                    </div>
                ):(
                    <div className='empty-wishlist'>
                        <img src={emptyWishlist} alt="empty-wishlist" />
                        {
                            !uid && (
                                <button className="section-btn" onClick={handleRedirect}>
                                    Sign in to View your Wishlist!
                                </button>
                            )
                        }
                    </div>
                )
            }
        </div>
    </section>
  )
}

export default Wishlist