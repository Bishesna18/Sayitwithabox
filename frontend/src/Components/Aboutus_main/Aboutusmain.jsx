import React from 'react'
import WatchImg from "../Assets/watch.jpg";
import braceletImg from "../Assets/bracelet2.jpg";
import NecklaceImg from "../Assets/necklace.jpg";
import './Aboutus_main.css'
const Aboutusmain = () => {
  return (
    <div className='Aboutus'>
     <section className="our-story">
      <h1 className="title">Our story</h1>
      <div className="grid-container">
      <div className="intro-text">
        <h2>How our time began?</h2>
        <p className="highlighted-text">
        The idea for Say It With a Box was born out of a simple realization: finding the perfect gift can be overwhelming. We wanted to create a seamless and thoughtful way for people to express their emotions through personalized gifting. Whether it’s a birthday, anniversary, or a simple gesture of kindness, our platform helps you craft meaningful gifts effortlessly.
        </p>
      </div>

      {/* Grid Layout */}
     
        {/* Image 1 */}
        <div className="image-box watchimg">
          <img className='watch' src={WatchImg} alt="Luxury Watch" />
          </div>
          <div className="image-box bracelet">
          <img className='bracelet-img' src={braceletImg} alt="Gold Bracelet" />
        </div>
          <div className="overlay-text dark">
            <br>
            </br><br></br><br></br>
            <h3>What a gift is to us?</h3>
            <p>
            At Say It With a Box, we believe that gifts should be more than just objects – they should carry emotions, memories, and a personal touch. That’s why we offer customizable gift boxes tailored to each recipient’s unique personality and preferences
            </p>
        
        </div>

        {/* Image 2 */}
      

        {/* Quote Box */}
        <div className="quote-box">
          <h2>Say it with a Box</h2>
          <p>Beyond Words</p>
        </div>

        {/* Image 3 */}
       
          <div className="overlay-text light">
            <h3>What do we stand for?</h3>
            <p>
            Our mission is to help people express their love and appreciation through thoughtfully curated gifts. We value quality, creativity, and ethical sourcing, ensuring every box is crafted with care and consideration.
            </p>
          </div>
          <div className="image-box necklace">
          <img src={NecklaceImg} alt="Necklace" />
          </div>
      </div>

      {/* Footer Text */}
      <div className="footer-text">
        <p>
          A gift is not just an object; it’s a piece of your heart wrapped in
          love, a silent way of saying, "You matter to me more than words can
          express."
        </p>
      </div>
    </section>
    </div>
  )
}

export default Aboutusmain
