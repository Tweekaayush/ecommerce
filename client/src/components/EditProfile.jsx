import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Create} from '@mui/icons-material'
import { updateUser } from '../features/userSlice'
import { toast, Bounce } from 'react-toastify'
const EditProfile = () => {

  const {username, address} = useSelector(state=>state.user.data)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: username,
    address_town: address.town,
    address_city: address.city,
    address_line: address.address_line,
    address_pincode: address.pincode,
    address_state: address.state
  })

  const handleChange = (e) =>{

    setFormData({...formData, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) =>{

    e.preventDefault()

    if(!(
      formData.address_city !== '' &&
      formData.address_town !== '' &&
      formData.address_line !== '' &&
      formData.address_pincode !== '' &&
      formData.address_state !== '' &&
      formData.username !== ''
    )){
      toast.error('You cannot leave the profile fields empty!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return
    }

    dispatch(updateUser({
      username: formData.username,
      address: {
        pincode: formData.address_pincode,
        city: formData.address_city,
        state: formData.address_state,
        address_line: formData.address_line,
        town: formData.address_town
    }
    }))
    toast.success('Profile Updated!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  return (
    <section id="profile-form-section" onSubmit={handleSubmit}>
      <div className="profile-form-container">
        <div className="profile-headings">
          <h1>Edit Profile</h1>
          <Create/>
        </div>
        <form className="profile-form">
          <div>
            <h4>Name: </h4>
            <label htmlFor="username">
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder='username'/>
              <span>Username</span>
            </label>
          </div>
          <div>
            <h4 >Address:</h4>
            <div className="address-form-container">
              <label htmlFor="">
                <input type="text" name="address_line" value={formData.address_line} onChange={handleChange}/>
                <span>House No. / Apartment / Street</span>
              </label>
              <label htmlFor="">
                <input type="text" name="address_state" value={formData.address_state} onChange={handleChange}/>
                <span>State</span>
              </label>
              <label htmlFor="">
                <input type="text" name="address_town" value={formData.address_town} onChange={handleChange}/>
                <span>Locality / Town</span>
              </label>
              <label htmlFor="">
                <input type="text" name="address_city" value={formData.address_city} onChange={handleChange}/>
                <span>City</span>
              </label>
              <label htmlFor="">
                <input type="text" name="address_pincode" value={formData.address_pincode} onChange={handleChange}/>
                <span>Pincode</span>
              </label>
            </div>
          </div>
          <input type="submit" value="Save Changes"/>
        </form>
      </div>
    </section>
  )
}

export default EditProfile