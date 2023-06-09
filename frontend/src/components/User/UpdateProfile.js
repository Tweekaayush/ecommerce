import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { clearErrors,loadUser, updateProfile } from '../../actions/userAction';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEnvelope, faLockOpen} from "@fortawesome/free-solid-svg-icons"
import PersonIcon from '@mui/icons-material/Person';
import "./UpdateProfile.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = ({clsname, boolVal}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.user)
    const {error, isUpdated, loading} = useSelector((state)=>state.profile)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState()

    const updateProfileSubmit = (e) =>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm))
      }

    const updateProfileDataChange = (e)=>{
        
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = () =>{
              if(reader.readyState === 2){            
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
              }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
      }

      useEffect(()=>{

        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
          }

        if(isUpdated){
            toast.success("Profile updated")
            dispatch(loadUser());
            navigate("/account")
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
      },[dispatch, user, isUpdated, navigate, toast, error])

  return (
            <div className={`updateProfileBox ${clsname}`}>
              <div className="updateProfileHead">
                <h1>Update Details</h1>
                <hr className='profileHeadingUnderlines'/>
              </div>
                <form
                className='updateProfileForm'
                encType='multipart/form-data'
                onSubmit={updateProfileSubmit}
                >
                <div className="updateProfileName">
                  <PersonIcon/>
                <input type="text" placeholder='Name' required name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="updateProfileEmail">
                <FontAwesomeIcon icon={faEnvelope} />
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="123@gmail.com" required/>
                </div>
                <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file" name="avatar" accept='image/' onChange={updateProfileDataChange} />
                </div>
                <input type="submit" value="Update Profile" className='updateProfileBtn'/>
            </form>
        </div>

  )
}

export default UpdateProfile