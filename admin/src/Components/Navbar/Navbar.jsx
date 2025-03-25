import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/navProfile.svg';

import navlogo from '../../assets/logo1.png'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} className='nav-profile'/>
    </div>
  )
}

export default Navbar
