import React from 'react'
import ProductCard from './ProductCard'

const ProductSlider = ({products, loading}) => {
  return (
    <div className="slider-container" id="trendingSlider">
        {
            
            loading?(
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i)=>{
                return <div className="skeleton-card-1" key={i}>
                </div>
              })
            ):(
              products?.map((product)=>{
                  return <ProductCard key={product.id} {...product}/>
              })
            )
        }
    </div>
  )
}

export default ProductSlider