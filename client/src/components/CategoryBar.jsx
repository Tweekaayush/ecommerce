import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryBar = () => {

  const navigate = useNavigate()
  const {categories} = useSelector(state=>state.products.data)

  return (
    <section id="category-bar">
        <ul className="category-bar-container">
            {categories && categories.map((category, i)=>{
                return  <li key={i} onClick={()=>navigate(`browse/${category}`)}>
                            <p>{category}</p>
                            <KeyboardArrowRightIcon/>
                        </li>
            })}
        </ul>
    </section>
  )
}

export default CategoryBar