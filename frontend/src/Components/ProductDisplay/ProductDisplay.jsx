import React,{useContext} from 'react'
import './ProductDisplay.css'
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import {ShopContext} from '../../Context/ShopContext';
const ProductDisplay = (props) => {
  const {addToCart}=useContext(ShopContext);
  const {product}=props
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
      <div className="productdisplay-img">
        <img  alt="" className="productdisplay-main-img" src={product.image[0]} />  
        </div>
      <div className="productdisplay-image-list">
        <img src={product.image[0]} alt=''/>
        <img src={product.image[1]} alt=''/>
        <img src={product.image[2]} alt=''/>
        <img src={product.image[3]} alt=''/>
      </div>
 
      
    </div>
      <div className="productdisplay-right">
      <h1>{product.name}</h1>

      
      
        <div className="productdisplay-right-price">
        <div className="productdisplay-right-price-old">
          Rs.{product.old_price}
        </div>
        <div className="productdisplay-right-price-new">
          Rs.{product.new_price}
        </div>
        </div>
        <div className="productdisplay-right-description">
      " {product.description}"
        </div>
       
        <button onClick={()=>{addToCart(product.id)}}>Add to cart</button>
        <p className='productdisplay-right-category'><span>Category: </span>{product.category.join(", ")}</p>
        <p className='productdisplay-right-category tag'><span>Tag: </span>{product.tags.join(", ")}</p>
        <div className="static-line"></div>
        <DescriptionBox/>
        </div>
       
        </div>
         
  )
}

export default ProductDisplay
