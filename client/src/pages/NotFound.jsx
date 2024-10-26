import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section id="not-found">
      <div className="not-found-container">
        <h1>404</h1>
        <h4>Oops... page not found!</h4>
        <p>The Page you are looking for doesn't exist or an error occurred.</p>
        <button className='section-btn' onClick={()=>navigate('/')}>Back To Homepage.</button>
      </div>
    </section>
  )
}

export default NotFound