import React from 'react'
import './Breadcrum.css'
import arrow_icon from'../Assets/Breadcrum_arrow.png';
import { useNavigate } from "react-router-dom";
// Function to find the main category based on product category


const Breadcrum = ({product,openedCategory}) => {
  const navigate = useNavigate();
  return (
    <div className='breadcrum'>
      <span 
        className="breadcrumb-link" 
        onClick={() => navigate("/")}
      >
        Gift
      </span>
      <img src={arrow_icon} alt=""/> 

      <span 
        className="breadcrumb-link" 
        onClick={() => navigate(`/${openedCategory.toLowerCase().replace(/ /g, "-")}`)}
      >
        {openedCategory}
      </span>

      <img src={arrow_icon} alt=""/> 
      {product.name}
    </div>
    
  )
}

export default Breadcrum
