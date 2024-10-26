import React, { useEffect, useState } from 'react'
import BrowseProducts from '../components/BrowseProducts'
import Filters from '../components/Filters'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getFilteredProducts, fetchProducts } from '../features/productSlice'

const Browse = () => {

    const {category} = useParams()
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)

    useEffect(()=>{
      dispatch(getFilteredProducts(category))
      setPage(1)
    }, [category])

    useEffect(()=>{
      window.scrollTo(0, 0)
      document.title ='Browse'
      dispatch(fetchProducts())
    }, [])

  return (
    <>
        <Filters category={category}/>
        <BrowseProducts page={page} setPage={setPage}/>
    </>
  )
}

export default Browse