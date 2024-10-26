import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoutes = () => {
    const {uid} = useSelector(state => state.user.data)
    const location = useLocation()
  return (
    <>
        {
            uid?(
                <Outlet/>
            ):(
                <Navigate to ='/login' replace={true} state={{previousURL: location.pathname}}/>
            )   
        }
    </>
  )
}

export default PrivateRoutes