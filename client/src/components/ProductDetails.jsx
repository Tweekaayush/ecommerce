import React from 'react'
import { useSelector } from 'react-redux'

const ProductDetails = () => {
    const {loading, data: {productDetails: {size, weight, texture}}} = useSelector(state=>state.products)
  return (
    <section id="product-details">
        <div className="product-detail-container">
            <h1 className="section-heading">Product Details</h1>
            <ul className="product-details-content">
                {
                    loading?(
                        <>
                            {
                                [1, 2, 3].map((_, i)=>{
                                    return <li key={i}>
                                        <div className="skeleton-product-quantity"></div>
                                        <div className="skeleton-product-price"></div>
                                    </li>
                                })
                            }
                        </>
                    ):(
                        <>
                            <li>
                                <h2>Dimension(cm):</h2>
                                <p>{size}</p>
                            </li>
                            <li>
                                <h2>Weight:</h2>
                                <p>{weight}</p>
                            </li>
                            <li>
                                <h2>Texture:</h2>
                                <p>{texture}</p>
                            </li>
                    </>
                    )
                }
            </ul>
        </div>
    </section>
  )
}

export default ProductDetails