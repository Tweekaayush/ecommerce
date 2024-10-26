import React, { useEffect } from 'react'
import Profile from '../components/Profile'
import EditProfile from '../components/EditProfile'

const Account = () => {

  useEffect(()=>{
    window.scrollTo(0, 0)
    document.title='Profile'
  }, [])
  return (
    <>
        <Profile/>  
        <EditProfile/>
    </>
  )
}

export default Account