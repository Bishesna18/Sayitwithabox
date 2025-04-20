import React from 'react'
import logo from "../Assets/logo1.png";
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
  <div className="footer-content">
    <div className="footer-logo">
      <img src={logo} alt="logo" />
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
    </div>
    <div className="footer-links">
      <p>COMPANY</p>
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
      </ul>
    </div>
    <div className="footer-contact">
      <p>GET IN TOUCH</p>
      <ul>
        <li>+977-984-7342884</li>
        <li>sayitwithboxContact@gmail.com</li> 
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <hr />
    <p>Copyright 2025@ sayitwithabox.com - All rights reserved.</p>
  </div>
</div>

  )
}

export default Footer
