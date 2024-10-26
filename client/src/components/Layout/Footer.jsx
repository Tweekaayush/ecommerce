import React, { useEffect, useState } from 'react'
import { Instagram, Facebook, Pinterest, X } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  
    const [year, setYear] = useState(new Date().getUTCFullYear())
    const navigate = useNavigate()

    useEffect(()=>{

        const getYear = () =>{
            setYear(new Date().getUTCFullYear())
        }

        getYear()
    }, [])

  return (
    <footer>
        <div className="upper-footer">
            <p>
            Stay up to date! We send out a newsletter twice a week with our latest news.
            </p>
            <form>
                <input type="email" name="email" id="email" placeholder='Email'/>
                <input type="submit" value="SUBSCRIBE" />
            </form>
        </div>
        <div className="middle-footer">
            <div>
                <h1 className="footer-title">Ecommerce</h1>
                <p className='footer-text'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aspernatur nisi molestiae sapiente minus sunt cupiditate beatae sed maxime natus.
                </p>
            </div>
            <div>
                <h1 className="footer-title">Customer Service</h1>
                <ul className='footer-list-1'>
                    <li>Contact</li>
                    <li>FAQ</li>
                    <li>Returns</li>
                    <li>Policy</li>
                </ul>
            </div>
            <div>
                <h1 className="footer-title">Popular Categories</h1>
                <ul className='footer-list-1'>
                    <li>
                        <Link to='/browse/furniture'>
                            Furniture
                        </Link>
                    </li>
                    <li>
                        <Link to='/browse/electronic'>
                          Electronics
                        </Link>
                    </li>
                    <li>
                        <Link to='/browse/lamp'>
                            Lamps
                        </Link>
                    </li>
                    <li>
                        <Link to='/browse/chair'>
                            Chairs
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1 className="footer-title">Keep in touch!</h1>
                <ul className='footer-list-2'>
                    <li>
                        <a href="https://www.twitter.com">
                            <X/>
                        </a>
                    </li>
                    <li> 
                        <a href="https://www.facebook.com">
                            <Facebook/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com">
                            <Instagram/>
                        </a>
                    </li>
                    <li>
                        <a href="https://in.pinterest.com">
                            <Pinterest/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="lower-footer">
            <p className="copyright">
                Copyright {year} &copy; All Rights Reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer