import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import ProductCard2 from './ProductCard2'
import { useSelector } from 'react-redux'

const BrowseProducts = ({page, setPage}) => {

  const paginate = 6
  const [totalPages, settotalPages] = useState(1)
  const {loading, data: {filteredProducts, productsLength}} = useSelector(state=>state.products)

  const handlePageChange = (e, p) =>{
    setPage(p)
  }

  useEffect(()=>{
    settotalPages(Math.ceil(productsLength/paginate))
  }, [productsLength])

  return (
    <section id="browseProducts">
        <div className="browse-products-container">
            <div className="browse-product-grid">
                {
                  loading?(
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, i)=>{
                      return <div key={i} className="skeleton-card-2"></div>
                    })
                  ):(
                    filteredProducts?.slice((page-1)*paginate, paginate * page).map((product)=>{
                      return <ProductCard2 key={product.id} {...product}/>
                    })
                  )
                }
            </div>
            <div className="pagination-container">
                <Pagination count={totalPages} onChange={handlePageChange} page={page} size='large'/>
            </div>
        </div>
    </section>
  )
}

export default BrowseProducts