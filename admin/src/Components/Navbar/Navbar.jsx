import React from 'react'
import './Navbar.css'
import navProfile from '../../assets/navProfile.svg';

import navlogo from '../../assets/logoadmin.png'
const Navbar = ({setToken}) => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} onClick={()=>setToken('')} className='nav-profile'/>
    </div>
  )
}

export default Navbar
