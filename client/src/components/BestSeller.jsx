import React from 'react'
import ProductCard2 from './ProductCard2'
import { useSelector } from 'react-redux'

const BestSeller = () => {

    const {loading, data: {bestSellingProducts}} = useSelector(state=>state.products)
    
  return (
    <section id="bestseller">
        <div className="bestseller-container">
            <h1 className="section-heading">
                Best Sellers
            </h1>
            <div className="bestseller-list">
                {

                    loading?(
                        [1, 2, 3, 4 ,5 ,6].map((_, i)=>{
                            return <div key={i} className="skeleton-card-2"></div>
                        })
                    ):(

                        bestSellingProducts?.map((product)=>{
                            return <ProductCard2 key={product.id} {...product}/>
                        })
                    )
                }
            </div>
        </div>
    </section>
  )
}

export default BestSeller