import React, { Fragment, useEffect, Component, useState } from 'react'
import Slider from 'react-slick'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import "./Product.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons' 
import ReviewCard from "./ReviewCard.js"
import {Rating, Dialog, DialogActions, DialogTitle, DialogContent, Button} from "@mui/material"
import Loader from '../layout/Loader/Loader';
import Metadata from '../layout/Metadata';
import Header from "../layout/Header/Header"
import { addItemsToCart } from '../../actions/cartAction';
import { newReview, clearErrors } from '../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {

    const dev = process.env.REACT_APP_DISCOUNT
    const [scroll, setScroll] = useState(false)
    const {id} = useParams();
    const dispatch = useDispatch();
    const {product, loading, error} = useSelector((state)=>state.productDetails);
    const navigate= useNavigate();
    const {isAuthenticated, user} = useSelector((state)=>state.user)
    const [sys, setSys] = useState(false)
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const discount = process.env.REACT_APP_DISCOUNT_VAL;
    const newPrice = product.price - (product.price * discount / 100)

    let min,rec
    let desc = ""
    
      if(product.minimum){
        min = JSON.parse(product.minimum)
      }
      if(product.recommended){
        rec = JSON.parse(product.recommended)
      }
      if(product.description){
        desc = product.description
      }

      const ratings = (i) =>{
        switch(i){
            case 0: return "No Reviews "
            case 1: return "Mostly Negative "
            case 1.5:return "Mostly Negative "
            case 2: return "Negative "
            case 2.5:return "Negative "
            case 3: return "Mixed "
            case 3.5:return "Positive "
            case 4: return "Very Positive "
            case 4.5: return "Overwhelmingly Positive "
            case 5: return "Overwhelmingly Positive "
        }
    }

    const ratingsStyle = (i)=>{
        switch(i){
            case 0: return {color:"white"}
            case 1: return {color:"#FD5C00"}
            case 1.5:return {color:"#FD5C00"}
            case 2: return {color:"#FD5C00"}
            case 2.5:return {color:"#FD5C00"}
            case 3: return {color:"yellow"}
            case 3.5:return {color:"#009EFF"}
            case 4: return {color:"#009EFF"}
            case 4.5: return {color:"#009EFF"}
            case 5: return {color:"#009EFF"}
        }
    }


    useEffect(()=>{

      if (error) {
        toast.error(error)
        dispatch(clearErrors());
      }
  
      if (reviewError) {
        toast.error(reviewError)
        dispatch(clearErrors());
      }
      if (success) {
        toast.success("Review Added")
        dispatch({ type: NEW_REVIEW_RESET });
      }
        dispatch(getProductDetails(id));
      }, [dispatch, id, reviewError, success, error, toast])

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
      const myForm = new FormData();
  
      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId", id);
  
      dispatch(newReview(myForm));
  
      setOpen(false);
    };

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <FontAwesomeIcon
          className={className}
          style={{ ...style, color:"white"}}
          onClick={onClick}
          icon={faAngleRight}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <FontAwesomeIcon
          className={className}
          style={{ ...style, color:"white"}}
          onClick={onClick}
          icon={faAngleLeft}
        />
      );
    }

    const settings = {
      infinite:true,
      autoplay:true,
      autoplaySpeed:3000,
      slidesToShow:1,
      slidesToScroll:1,
      swipeToSlide:true,
      arrows:true,
      nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>
    }

    const settings2 = {
      slidesToShow: 4,
      slidesToScroll:1,
      arrows:true,
      swipeToSlide:true,
      focusOnSelect:true,
      nextArrow: <SampleNextArrow/>,
      prevArrow: <SamplePrevArrow/>
    }

    const options = {
      value: product.ratings,
      precision:0.5,
      max:5,
      readOnly:true
  }

  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 64) 
        setScroll(true);
    else{
        setScroll(false)
    } 
});

const addToCart = () =>{
  if(isAuthenticated){
    dispatch(addItemsToCart(id))
    toast.success("Added to Cart")
  }
  else{
    navigate(`/login?redirect=product/${id}`)
  }
}

function NewlineText(props) {
  const text = String(props.text);  
  let newText = text.split('\n').map((item, i) => {
    return <p key={i}>{item}</p>;
  });
}

  return (
    <Fragment>
      {loading? <Loader/>: (
      <Fragment>
        <Metadata title={product.name}></Metadata>
        <div className={scroll?'productContainer productContainer-active':"productContainer"}>
          <Header/>
          <div className="productContainerHeading">
            <h1>{product.name}</h1>
            <Rating 
            {...options}
            emptyIcon={<StarBorderIcon style={{color:"white"}}/>}
            />
          </div>
          <div className="productBox-1">
            <div className="productBox-1-1">
              <Slider className='productCarousel-1' asNavFor={nav2} ref={(slider1)=>setNav1(slider1)} {...settings}>
                  {
                      product.images && product.images.slice(1, product.images.length).map((item)=>(
                        <img key={item.id} src={item.url} alt="" />  
                      ))
                  }
              </Slider>
              <Slider className='productCarousel-2' asNavFor={nav1} ref={(slider2)=>setNav2(slider2)} {...settings2}>
                  {
                      product.images && product.images.slice(1, product.images.length).map((item)=>(
                        <div className='carouselNavItem'>
                          <img key={item.id} src={item.url} alt="" />  
                        </div>
                      ))
                  }
              </Slider>
          </div>
            <div className="productBox-1-2">
                <img src={product.background_image} alt="" />
                {dev !== product.developer && (
                  <p className="productPrice">₹ {product.price}</p>
                  )}
                {dev === product.developer && (
                  <>
                    <p className="productPrice-d">₹ {product.price}</p>
                    <p className='discountedPrice'>₹ {newPrice}</p>
                  </>
                )}
                <button className="productBtn" onClick={addToCart}>Add to Cart</button>
                <div className='productDevDetails'>
                  <div>
                    <p>Release Date:</p>
                    <p>
                       {String(product.released).substring(0,10)}
                    </p>
                  </div>
                  <div>
                    <p>Platform:</p>
                    <p>{product.platform}</p>
                  </div>
                </div>
            </div>
        </div>
        <div className="productBox-2">
            <div className="productBox-2-1">
              <h1>About this Game</h1>
              <hr className='productDetailsUnderline'/>
              <p>{product.description}</p>
            </div>
            <div className="productBox-2-2">
              <h1>System Requirements</h1>
              <hr className='productDetailsUnderline'/>
              <div className="productBox-2-2-1">
                  <div className="productBox-2-2-1-1">
                    <h2>Minimum:</h2>
                    <p><span>OS: </span> {min && min.OS}</p>
                    <p><span>Processor: </span> {min && min.Processor}</p>
                    <p><span>Memory: </span> {min && min.Memory}</p>
                    <p><span>Graphics: </span> {min && min.Graphics}</p>
                    <p><span>Storage: </span> {min && min.Storage}</p>
                  </div>
                  <div className="productBox-2-2-1-2">
                    <h2>Recommended:</h2>
                    <p><span>OS: </span> {rec && rec.OS}</p>
                    <p><span>Processor: </span> {rec && rec.Processor}</p>
                    <p><span>Memory: </span> {rec && rec.Memory}</p>
                    <p><span>Graphics: </span> {rec && rec.Graphics}</p>
                    <p><span>Storage: </span> {rec && rec.Storage}</p>
                  </div>
              </div>
            </div>
            <div className="productBox-2-3">
              <h1 className="reviewsHeading">Reviews</h1>
              <hr className='productDetailsUnderline'/>
              <div className="productReviewsBox">
                <div className="productBox-2-3-1">
                    <h1>Overall Reviews</h1>
                    <p style={ratingsStyle(product.ratings)}>{ratings(product.ratings)} <span style={{color:"white"}}>({product.numOfReviews})</span></p>
                    <p>
                      <Rating 
                        {...options}
                        emptyIcon={<StarBorderIcon style={{color:"white", fontSize:"1.15rem"}}/>}
                        size="small"
                        />
                    </p>
                    <button onClick={submitReviewToggle} className='reviewBtn'>Write a Review</button>
                </div>
                <div className="productBox-2-3-2">
                  <Dialog
                  aria-labelledby='simple-dialog-title'
                  open ={open}
                  onClose={submitReviewToggle}
                  >
                    <DialogTitle className='submitDialogHeading'>Submit Review</DialogTitle>
                    <DialogContent className='submitDialog'>
                      <Rating
                        onChange={(e)=>setRating(e.target.value)}
                        value = {rating}
                        size='large'
                        />
                        <textarea 
                        cols="30"
                        rows="5"
                        className='submitDialogTextArea'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        >

                        </textarea>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                          Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                          Submit
                        </Button>
                      </DialogActions>
                  </Dialog>
                  {product.reviews && product.reviews[0] ?(
                    <div className="reviews">
                      {product.reviews && product.reviews.map((review)=> <ReviewCard review={review}/>)}
                    </div>
                  ): (
                    <p className="noReviews">No Reviews Yet</p>
                  )}
                </div>
              </div>
            </div>
        </div>
    </div>
      </Fragment>)}
      <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      rtl={false}
      theme="colored"
      />
    </Fragment>
  )
}

export default Product