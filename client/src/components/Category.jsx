import React from 'react'
import furniture from '../assets/images/category/img1.jpg'
import skincare from '../assets/images/category/img2.jpg'
import kitchen from '../assets/images/category/img3.jpg'
import electronic from '../assets/images/category/img4.jpg'
import { useNavigate } from 'react-router-dom'

const Category = () => {

    const navigate= useNavigate()

  return (
    <section id="category">
        <div className="category-container">
            <div className="category" onClick={()=>navigate('/browse/furniture')}>
                <div className="img-overlay"></div>
                <h2>Furniture</h2>
                <img src={furniture} alt="furniture" loading='lazy'/>
            </div>
            <div className="category" onClick={()=>navigate('/browse/skin-care')}>
                <div className="img-overlay"></div>
                <h2>Skin-Care</h2>
                <img src={skincare} alt="skincare" loading='lazy'/>
            </div>
            <div className="category" onClick={()=>navigate('/browse/kitchen')}>
                <div className="img-overlay"></div>
                <h2>Kitchen</h2>
                <img src={kitchen} alt="kitchen" loading='lazy'/>
            </div>
            <div className="category" onClick={()=>navigate('/browse/electronic')}>
                <div className="img-overlay"></div>
                <h2>Electronics</h2>
                <img src={electronic} alt="electronics" loading='lazy'/>
            </div>
        </div>
    </section>
  )
}

export default Category