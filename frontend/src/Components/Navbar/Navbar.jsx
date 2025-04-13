import React, { useState,useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo2.png";
import logos from "../Assets/search1.png"
import cart_icon from "../Assets/cart.png";
import location from "../Assets/location.png";
import login_icon from "../Assets/user.png"
import {ShopContext} from '../../Context/ShopContext'
import "./Navbar.css";

const Navbar = () => {
  const authToken = localStorage.getItem("auth-token");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to toggle dropdown visibility
 
  const handleDropdownToggle = () => {
    setIsDropdownVisible((prevState) => !prevState); // Toggle dropdown visibility
  };
  useEffect(() => {
    // Fetch the auth token from localStorage when the component mounts
    const authToken = localStorage.getItem("auth-token");

    // Display the auth token in the console
    if (authToken) {
      console.log("Auth Token:", authToken);
    } else {
      console.log("No auth token found.");
    }
  }, []); 
  const handleLogout = () => {
    // Clear auth token from local storage
    localStorage.removeItem("authToken");
    // Optionally, redirect to login page after logout
    window.location.href = "/login";
  };
  const [menu, setMenu] = useState("Gifts");
  const [visible,setVisible]=useState(false)
  const{setShowSearch}=useContext(ShopContext)
  const {getTotalCartItems}=useContext(ShopContext)
  return (
    <header className="navbar">
      {/* Top Line */}
      <div className="nav-top">
      <div className="search-container">
        {/* <input type="text" className="nav-search" placeholder="Search..." /> */}
        <img onClick={()=>{ setShowSearch(true); console.log('Search icon clicked!'); }} src={logos} alt="Search" className="search-icon" />
        <img src={location} alt="Search" className="location-icon" />
       
        </div>
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-login-cart">
        {authToken ? (
            <div>
              <img
                src={login_icon}
                alt="User Menu"
                onClick={handleDropdownToggle} // Show dropdown when clicked
              />
              {isDropdownVisible && (
                <div className="dropdown">
                  <ul>
                    <li><Link to="/profile">My Profile</Link></li>
                    <li><Link to="/orders">My Orders</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <img src={login_icon} alt="Login" />
            </Link>
          )}
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>

      {/* Bottom Line */}
      <nav className="nav-bottom">
        <ul className="nav-menu">
          <li onClick={() => setMenu("Gifts")}>
            <Link to="/">Gifts</Link>
            {menu === "Gifts" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("Occasion")}>
            <Link to="/Occasion">Occasion</Link>
            {menu === "Occasion" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("By person")}>
            <Link to="/Byperson">By person</Link>
            {menu === "By person" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("By personality")}>
            <Link to="/Bypersonality">By personality</Link>
            {menu === "By personality" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("Flowers")}>
            <Link to="/Flowers">Flowers</Link>
            {menu === "Flowers" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("Chocolate & Drinks")}>
            <Link to="/Chocolates">Chocolate & Drinks</Link>
            {menu === "Chocolate & Drinks" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("Subscription")}>
            <Link to="/Subscription">Subscription</Link>
            {menu === "Subscription" ? <hr /> : null}
          </li>
          <li onClick={() => setMenu("Aboutus")}>
            <Link to="/Aboutus">About us</Link>
            {menu === "Aboutus" ? <hr /> : null}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
