import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors, deleteProduct, getAdminProducts} from "../../actions/productAction"
import ReactPaginate from 'react-paginate'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import "./ProductList.css"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "react-js-pagination"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const ProductList = ({opt}) => {


    const dispatch = useDispatch()
    const {error, products} = useSelector((state)=>state.products)
    const {loading, error:deleteError, isDeleted} = useSelector((state)=>state.product)
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1)
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const items = []
    products&&products.forEach((item,i)=>{
    items.push(item)
    })
    const currentItems = items.slice(itemOffset, endOffset)
    const pageCount =  Math.ceil(items.length / itemsPerPage)

    const handlePageClick = (event) => {
      const newOffset = ((event-1) * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      setCurrentPage(event)
    };

    const deleteProductHandler = (id) =>{
      if(loading) return
        dispatch(deleteProduct(id))
    }

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
        }
        if(deleteError){
            dispatch(clearErrors())
        }
        if(isDeleted){
          toast.success("Product has been deleted!");
          dispatch({type: DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProducts())
    }, [dispatch, alert, deleteError, isDeleted, toast])

  return (
        <div className={`listContent ${opt}`}>
          <div className="listItemList">
            <div className="listContentHeadings">
              <div>
                <p>ID:</p>
              </div>
              <div>
                <p>Date(Created)</p>
              </div>
              <div>
                <p>Amount:</p>
              </div>
              <div>
                <p>Actions</p>
              </div>
            </div>  
            {currentItems.length !== 0 ? (
              currentItems.map(product=>(
                <div key = {product._id} className="listItems">
                    <div> 
                        <p>{product.name}</p>
                    </div>    
                    <div>
                        <p>{String(product.createdAt).substring(0, 10)}</p>
                    </div>
                    <div>
                        <p>{product.price}</p>
                    </div>
                    <div>
                      <DeleteIcon onClick={()=>deleteProductHandler(product._id)}/>
                    </div>
                </div> 
              )))
            :(
              <div className='emptylistDiv'>
                <h1> No Products have been added to the Site! </h1>
              </div>
            )
            }
          </div>

          {
            products && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={items.length}
                  onChange={handlePageClick}
                  nextPageText={<KeyboardArrowRightIcon/>}
                  prevPageText={<KeyboardArrowLeftIcon/>}
                  firstPageText={<KeyboardDoubleArrowLeftIcon/>}
                  lastPageText={<KeyboardDoubleArrowRightIcon/>}
                  itemClass='page-item'
                  linkClass='page-link'
                  activeClass='pageItemActive'
                  activeLinkClass='pageLinkActive'
                />
              </div>
            )
          }
        </div>
  )
}

export default ProductList