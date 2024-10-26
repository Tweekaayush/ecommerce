import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup, auth, provider, signInWithEmailAndPassword } from '../config/firebase'
import { getUserDetails } from '../features/userSlice'
import google from '../assets/svg/google.png'
import { toast, Bounce } from 'react-toastify'

const Login = () => {

    const {uid} = useSelector(state=>state.user.data)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {state} = useLocation()

    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })

    const [formErrors, setFormErrors] = useState({
      email: '',
      password: ''
  })

    const validateForm = () =>{

      let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

      const obj = {
          email: '',
          password: '',
      }
      
      if(formData.email.trim() === ''){
          obj.email = 'Please enter an email address'
      }
      if(!(emailRegex.test(formData.email.trim()))){
          obj.email = 'Please enter a valid email address.'
      }
      if(formData.password.trim().length < 6){
          obj.password = 'Your password must have more than 6 characters'
      }

      setFormErrors({...obj})

      return obj.email === '' && obj.password === ''
      
  }

    const handleChange = (e) =>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleGoogleAuth = () =>{
        signInWithPopup(auth, provider).then((user)=>{
            dispatch(getUserDetails({
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
              }))
              toast.success('Logged In Successfully!', {
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
        }).catch((e)=>console.log(e.message))
    }

    const handleSubmit = (e) =>{

      e.preventDefault();

      const validate = validateForm()
      
      if(validate){    
        signInWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
          const user = userCredential.user
          dispatch(getUserDetails({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            profileImg: user.photoURL,
          }))
          toast.success('Logged In Successfully!', {
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
        }).catch((e)=>{
          toast.error('Invalid User!', {
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
        })
      }

    }

    useEffect(()=>{
      if(uid){
        if(state) navigate(state.previousURL)
        else navigate('/account')
      }
    }, [uid])

    useEffect(()=>{
      window.scrollTo(0, 0)
      document.title = 'Log In'
    }, [])

  return (
    <section id="login">
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email" className={formErrors.email ===''?'':'invalid-input'}>
                <input type="email" name='email' value={formData.email} onChange={handleChange}/>
                <span>Email Address</span>
              </label>
              <label htmlFor="password" className={formErrors.password ===''?'':'invalid-input'}>
                <input type="password" name='password' value={formData.password} onChange={handleChange}/>
                <span>Password</span>
              </label>
              <input type="submit" value="Login"/>
            </form>
            <hr />
            <button onClick={handleGoogleAuth}>
              <img src={google} alt="google" />
              Google
            </button>
            <p>Don't have and Account? <Link to="/signup">Sign Up</Link> here.</p>
        </div>
    </section>
  )
}

export default Login