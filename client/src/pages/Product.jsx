import React, { useEffect } from 'react'
import ProductDetails from '../components/ProductDetails'
import Trending from '../components/Trending'
import { useParams } from 'react-router-dom'
import ProductContent from '../components/ProductContent'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, fetchProducts } from '../features/productSlice'

const Product = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {productDetails} = useSelector(state=>state.products.data)
    
    useEffect(()=>{
      dispatch(fetchProducts())
      dispatch(getProductDetails(id))
      window.scrollTo(0, 0)
    }, [id])

    useEffect(()=>{
      document.title = `Buy ${productDetails.title}`
    }, [productDetails.title])
  return (
    <>
        <ProductContent />
        <ProductDetails />
        <Trending />
    </>
  )
}

export default Product