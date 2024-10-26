import React, { useEffect, useState } from 'react'
import { auth, createUserWithEmailAndPassword, updateProfile } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from '../features/userSlice'
import { Link } from 'react-router-dom'
import { toast, Bounce } from 'react-toastify'

const SignUp = () => {

    const {uid} = useSelector(state=>state.user.data)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateForm = () =>{

        let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

        const obj = {
            firstName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        
        if(formData.firstName.trim() === ''){
            obj.firstName = 'Please enter your First Name.'
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
        if(formData.password.trim() !== formData.confirmPassword.trim()){
            obj.confirmPassword = 'Passwords do not match'
        }

        setFormErrors({...obj})

        return obj.firstName === '' && obj.email === '' && obj.password === '' && obj.confirmPassword === ''
        
    }

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const validate = validateForm()
        if(validate){
            createUserWithEmailAndPassword(auth, formData.email, formData.password).then((userCredential)=>{
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: formData.firstName + ' ' + formData.lastName,
                    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'
                });
                dispatch(getUserDetails({
                    uid: user.uid,
                    username: formData.firstName + ' ' + formData.lastName,
                    email: user.email,
                    profileImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png'
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
            }).catch(e=>alert(e.message))
        }
    } 

    useEffect(()=>{
        window.scrollTo(0, 0)
        document.title = 'Sign Up'
    }, [])

    useEffect(()=>{
        if(uid){
          navigate('/account')
        }
      }, [uid])  


  return (
    <section id="login">
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="firstName" className={formErrors.firstName === ''?'':'invalid-input'}>
                <input type="text" name='firstName' value={formData.firstName} onChange={handleChange}/>
                <span>First Name</span>
              </label>
              <label htmlFor="lastName" >
                <input type="text" name='lastName' value={formData.lastName} onChange={handleChange}/>
                <span>Last Name</span>
              </label>
              <label htmlFor="email" className={formErrors.email === ''?'':'invalid-input'}>
                <input type="email" name='email' value={formData.email} onChange={handleChange}/>
                <span>Email Address</span>
              </label>
              <label htmlFor="password" className={formErrors.password === ''?'':'invalid-input'}>
                <input type="password" name='password' value={formData.password} onChange={handleChange}/>
                <span>Password</span>
              </label>
              <label htmlFor="confirmPassword" className={formErrors.confirmPassword === ''?'':'invalid-input'}>
                <input type="password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
                <span>Confirm Password</span>
              </label>
              <input type="submit" value="Sign Up"/>
            </form>
            <p>Already have an Account? <Link to="/login">Login</Link> here.</p>
        </div>
    </section>
  )
}

export default SignUp