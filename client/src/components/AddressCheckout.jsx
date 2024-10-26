import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartSummary from './CartSummary'
import { updateUser } from '../features/userSlice'
import DeliveryAddress from './DeliveryAddress'
import {KeyboardArrowDown} from '@mui/icons-material';
import { toast, Bounce } from 'react-toastify'

const AddressCheckout = ({setCurrentStep, order, setOrder}) => {

  const {address, username, email} = useSelector(state=>state.user.data)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    address_town: address.town,
    address_city: address.city,
    address_line: address.address_line,
    address_pincode: address.pincode,
    address_state: address.state
  })
  const [open, setOpen] = useState(address?.pincode === '')

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
      formData.address_state !== ''
    )){
      toast.error('You cannot leave the address fields empty!', {
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

    dispatch(updateUser({address: {
      pincode: formData.address_pincode,
      city: formData.address_city,
      state: formData.address_state,
      address_line: formData.address_line,
      town: formData.address_town
  }}))
  toast.success('Address Updated!', {
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

  const placeOrder = () =>{
    if(address.pincode){
      setOrder({...order, address: address, username: username, email:email})
      setCurrentStep(3)
    }else{
      toast.error('Please enter your address!', {
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
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left-container">
        <DeliveryAddress/>
        <div className="checkout-address-form">
          <h4 onClick={()=>setOpen(!open)}>
            {
              address?.pincode?<>Edit </>:<>Add </>
            }
            Address <KeyboardArrowDown style={open?{transform: 'rotate(-180deg)'}:{}}/></h4>
          <form onSubmit={handleSubmit} className={open?'address-form-active':''}>
            <div className='form-grid'>
            <label htmlFor="">
                <input type="text" name="address_line" value={formData.address_line} onChange={handleChange}/>
                <span>Address Line 1</span>
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
            <input type="submit" value="Save Address"/>
          </form>
        </div>
      </div>
      <div className="checkout-right-container">
        <CartSummary placeOrder={placeOrder} btn={'Continue'}/>
      </div>
    </div>
  )
}

export default AddressCheckout