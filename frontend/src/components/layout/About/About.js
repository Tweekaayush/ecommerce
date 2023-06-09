import React from 'react'
import "./About.css"
import Metadata from "../Metadata"
import Slider from "react-slick"
import {img} from "../../../doodles.js"

const About = () => {

  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 3000,
    autoplay:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false
  };

  return (
    <div className="aboutContainer">
      <Metadata title="About Us" />
      <div className="aboutBox">
        <div className="upperAboutContainer">
          <div className="aboutImage">
            <Slider {...settings}>
              {img.map((item, i)=>(
                  <div>
                    <img src={item.url} key={i} alt="" />
                  </div>
              ))}
            </Slider>
          </div>
          <div className="upperAboutContent">
            <h1 className='slideLeftIn'>About Us</h1>
            <h3 className='slideLeftIn2'>Play to the beat.</h3>   
            <p className='slideLeftIn3'>
                Step into a world where gaming dreams come to life and embark on an unforgettable journey through a vast collection of digital adventures.
            </p>
          </div>
        </div>
        <div className="lowerAboutContainer slideUpIn">
          <p>
          `At GameOn, we are passionate about delivering the ultimate gaming experience to enthusiasts like you. Whether you're a casual gamer seeking the latest releases or a seasoned player in search of nostalgic classics, we have something to cater to every gaming taste.'
          </p>
        </div>
      </div>
    </div>
  )
}

export default About