import React,{useContext, useEffect, useState} from 'react'
import './CartItems.css'

import remove_icon from '../Assets/close.png'
import {ShopContext} from '../../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import CartitemTotal from './CartitemTotal'
const CartItems = () => {
  
    const{all_product,getTotalCartAmount,cartItems,removeFromCart,updateCartQuantity }=useContext(ShopContext);
    const [cartData,setCartData]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
      
    if(all_product.length>0){
   
        const tempData=[];
        for(const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item]>0){
              tempData.push({
                _id:items,
                newQuantity:cartItems[items][item]
              })
            }
          }
        }
        setCartData(tempData);
      }
      },[cartItems,all_product])

    
  return (
    
    <div className='cartitems'>
      <div className='left-cart'>
      <div className='title-cart'>Your cart</div>

        
      <hr/>

      {Object.keys(cartItems).map((itemId) => {
    const quantity = cartItems[itemId];
    if (quantity > 0) {
      // Find the product in all_product based on itemId
      const product = all_product.find((p) => p.id === Number(itemId));
      if (product) {
        
            return( <div key={product.id}>
              
            <div className="cartitems-format-main cartitems-format">
           <img src={product.image[0]} alt="" className='carticon-product-icon'/>
           <div className="info-items">
           <p className='name-cart-item'>{product.name}</p>
           <p className='price-cart-item'>Per price: Rs.{product.new_price}</p>
          < div className="quantity-container">
                      
          <input
  type="number"
  className="cartitems-quantity"
  value={cartItems[product.id] === 0 || cartItems[product.id] === undefined ? 1 : cartItems[product.id]}  // Default to 1 if quantity is 0 or undefined
  min="1"
  max="10"
  placeholder="Please fill the field"
  onChange={(event) => {
    const value = event.target.value;

    // Allow empty input but don't update the quantity to 0
    if (value === "") {
      updateCartQuantity(product.id, 1);  // Keep the item but reset to 1
      return;
    }

    const newQuantity = Math.max(1, Math.min(10, Number(value)));  // Ensure quantity is between 1 and 10
    updateCartQuantity(product.id, newQuantity);
  }}
  onBlur={(event) => {
    if (event.target.value === "") {
      alert("Please fill the quantity field.");
      updateCartQuantity(product.id, 1);  // Reset to 1 if left empty
    }
  }}
/>

                     
                    </div></div>
                    <div className="updateprice">
           <p>{(product.new_price*cartItems[product.id]).toFixed(2)} </p></div>
           <div className="remove-container">
           <img src={remove_icon} onClick={()=>{removeFromCart(product.id)}} alt="" className="remove" />
           </div>
            </div>
            
            <hr className="second-hr"/>
            
          </div>
            )
        }
      }
        return null;
      })}
      </div>
      <div className='right-cart'>
      <div className="cartitems-down">
        <CartitemTotal  totalAmount={getTotalCartAmount()}/>
        {/* <div className="cartitems-totals">
        <div className='title-cart'>Cart total</div>
            <div>
                <div className="cartitems-total-items">
                    <p>Subtotal</p>
                    <p>Rs.{getTotalCartAmount()}</p>
                </div>
               
                <div className="cartitems-total-items">
                    <p>Estimated Shipping</p>
                    <p>Rs.100</p>
                </div>
                <hr />
               <div className="cartitems-total-items">
               <h3>Total</h3>
               <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
        </div>
       
      </div> */}
      <div className="cartitems-promocode">
        <p>If you have a promocode enter it here</p>
        <div className="cartitems-promobox">
            <input type="text"placeholder='promo code' />
            <button>Apply</button>
        </div>
      </div>
      <button onClick={()=>navigate('./place-order')}className='checkout'>Proceed To Checkout</button>
      </div>
    </div>
    </div>
  )

}

export default CartItems
