import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderHistoryPrev from './OrderHistoryPrev'
import { Delete } from '@mui/icons-material';
import { deleteUserAccount } from '../features/userSlice';
import { auth, deleteUser } from '../config/firebase';

const Profile = () => {

  const { profileImg, username, email, address } = useSelector(state=>state.user.data) 
  const dispatch = useDispatch()

  const deleteAccount = () =>{

    const user = auth.currentUser;

    deleteUser(user).then(() => {
      dispatch(deleteUserAccount())
    }).catch((error) => {
      console.log(error.message)
    });
  }

  return (
    <section id="profile">
        <div className="profile-container">
            <div className="profile-left-container">
              <div className="profile-header">
                <img src={profileImg} alt={username} loading='lazy' />
              </div>
              <div className="profile-details">
                <div>
                  <h4>Name:</h4>
                  <p>{username}</p>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p>{email}</p>
                </div>
                <div>
                  <h4>Address:</h4>
                  {address?.pincode?
                    <p>
                      {address?.address_line}, {address?.town}
                      <br/>
                      {address?.city}, {address?.state} - {address?.pincode}
                    </p>
                  :
                    <p className='address-placeholder'>
                      Address Line 1
                    </p>}
                </div>
              </div>
              <button onClick={deleteAccount}>Delete My Account <Delete/></button>
            </div>
            <div className="profile-right-container">
              <OrderHistoryPrev />
            </div>
        </div>
    </section>
  )
}

export default Profile