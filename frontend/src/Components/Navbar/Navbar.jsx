import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo2.png";
import logos from "../Assets/search1.png"
import cart_icon from "../Assets/cart.png";
import location from "../Assets/location.png";
import login_icon from "../Assets/user.png"
import {ShopContext} from '../../Context/ShopContext'
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState("Gifts");
  const {getTotalCartItems}=useContext(ShopContext)
  return (
    <header className="navbar">
      {/* Top Line */}
      <div className="nav-top">
      <div className="search-container">
        {/* <input type="text" className="nav-search" placeholder="Search..." /> */}
        <img src={logos} alt="Search" className="search-icon" />
        <img src={location} alt="Search" className="location-icon" />
       
        </div>
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav-login-cart">
          <Link to="/login">
          <img src={login_icon} alt="Cart" />
          
          </Link>
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
