import React from 'react'
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import ProductSlider from './ProductSlider';
import { useSelector } from 'react-redux';

const Trending = () => {

    const {loading, data:{trendingProducts}} = useSelector(state=>state.products)
    const slideLeft = () => {
        let slider = document.getElementById('trendingSlider');
        slider.scrollLeft = slider.scrollLeft - 235;
      };
    
      const slideRight = () => {
        let slider = document.getElementById('trendingSlider');
        slider.scrollLeft = slider.scrollLeft + 235;
      };

  return (
    <section id="trending">
        <div className="trending-container">
            <div className="trending-upper-container">
                <h1 className="section-heading">Trending Now</h1>
                <div className="trending-navigator">
                    <ArrowBack onClick={slideLeft}/>
                    <ArrowForward onClick={slideRight}/>
                </div>
            </div>
            <div className="trending-lower-container">
                <ProductSlider products={trendingProducts} loading={loading}/>
            </div>
        </div>
    </section>
  )
}

export default Trending