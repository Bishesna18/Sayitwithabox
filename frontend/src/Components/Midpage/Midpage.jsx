import React from 'react';
import './Midpage.css';
import abus1 from "../Assets/abus1.jpg";
import abus2 from "../Assets/abus2.jpg";
const Midpage = () => {
  return (
    <div className='Midpage'>

      <div className="quotation">
        <p>
          "A gift is not just an object; it’s a piece of your heart wrapped in love, a silent way of saying,<br></br>
          ‘You matter to me more than words can express."
        </p>
      </div>

      <div className="options">
        <div className="heading">
          <p>Find the perfect gift</p>
        
        </div>
      
<div className="optbox">
        {/* <div className="row"> */}
          <div className="box-container">
            <div className="first-left">
            <p className="box-text">"Some moments deserve more than just words—make them unforgettable with the perfect gift."</p>
            </div>
            <p className="box-name">Occasion &gt;</p>
          </div>

          <div className="box-container">
            <div className="first-right">
            <p className="box-text">"Every bond is unique. Find a gift that speaks their love language."</p>
            </div>
            <p className="box-name">By person &gt;</p>
          </div>
        {/* </div> */}

        {/* <div className="row"> */}
          <div className="box-container">
            <div className="second-left">
            <p className="box-text">"Gifts should match the soul—thoughtful, bold, or full of charm, just like them."</p>
            </div>
            <p className="box-name">By personality &gt;</p>
          </div>

          <div className="box-container">
            <div className="second-right">
            <p className="box-text">"Sweeten their day with chocolates or raise a toast to love and laughter."v</p>
            </div>
            <p className="box-name">Chocolate&Drinks &gt;</p>
          </div>
        {/* </div> */}
      </div>
      </div>
      <div className="heading2">
          <p>A touch of timeless elegance, just for you.</p>
        
        </div>
       <div className="flowers">
        <div className="flowertextarea">
         <h1>Get the damn flowers</h1>
         <p> Reflection of luxury, designed to capture emotions that words alone cannot express. Whether celebrating a special occasion or sharing a moment of appreciation,we believe in making every gift meaningful, personal, and unforgettable. </p>
         <button>View</button>
        </div>
      
        <div className="imageflower">

        </div>
     
       </div>
       <div className="heading3">
          <p>More for you...</p>
        
        </div>
       <div className="Subscription">
        
        <div className="imagesub">

        </div>
        <div className="subtextarea">
         <h1>Get the Subscription</h1>
         <p>Surprise your loved ones with the sweetest gesture—because nothing says love like a box of decadent chocolates and a bouquet of fresh blooms, delivered straight to their heart, month after month.</p>
         <button>View</button>
        </div>
       </div>
       <div className="aboutus">
        <div className="heading">
       <p>About us</p> 
        </div>
        <div className="info">
          <div className="left-pic">
          <img src={abus1} alt="hand" />
          </div>
          <div className="middle-info">
         <p>
         At Say It With a Box, we offer more than just gifts; we craft<br></br> unforgettable experiences. Our thoughtfully curated selection of<br></br> flowers, chocolates, and premium items exudes elegance and <br></br>sophistication. Every box is a reflection of luxury, designed to <br></br>capture emotions that words alone cannot express. Whether<br></br> celebrating a special occasion or sharing a moment of appreciation,<br></br> we believe in making every gift meaningful, personal, and <br></br>unforgettable.<br></br><br></br>

Choose Say It With a Box to turn every gesture into a timeless<br></br> memory. Our passion for quality and attention to detail ensures<br></br> that each product is as extraordinary as the feelings it represents.
         </p>
         <div className="about-button">
         <button className="btn">want to know backstory?</button>
         </div>
          </div> 
          <div className="right-pic">
          <img src={abus2} alt="hand" />
          </div>
        </div>
       </div>
       
       
       
    </div>
  );
};

export default Midpage;
