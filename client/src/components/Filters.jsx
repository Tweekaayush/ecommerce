import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { useSelector } from 'react-redux'

const Filters = ({category}) => {

    const {categories} = useSelector(state=>state.products.data)

    const navigate = useNavigate()

    const handleChangeCategory = (category) =>{
        if(category === ''){
            navigate('/browse')
        }else{
            navigate(`/browse/${category}`)
        }
    }

  return (
    <section id="filters">

    <div className="filters-container">
        <button className="back-btn" onClick={()=>navigate('/')}>
            <ArrowBack/>
            Home
        </button>
        <div className="filters">
            <div className="filter-header">
                <h1 className="section-heading">Categories</h1>
            </div>
            <ul className="filter-list">
                <li className={category === undefined? 'filter-list-item-active':''} onClick={()=>handleChangeCategory('')}>All</li>
                {
                    categories.map((cat, i)=>{
                        return <li key={i} className={category === cat? 'filter-list-item-active':''} onClick={()=>handleChangeCategory(cat)}>{cat}</li>
                    })
                }
            </ul>
        </div>
    </div>
    </section>
  )
}

export default Filters