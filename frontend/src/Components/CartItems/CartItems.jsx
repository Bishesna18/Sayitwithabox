import React,{useContext} from 'react'
import './CartItems.css'

import remove_icon from '../Assets/close.png'
import {ShopContext} from '../../Context/ShopContext'
const CartItems = () => {
    const{all_product,getTotalCartAmount,cartItems,removeFromCart,updateCartQuantity }=useContext(ShopContext);

  return (
    
    <div className='cartitems'>
      <div className='left-cart'>
      <div className='title-cart'>Your cart</div>

        
      <hr/>
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
            return <div>
            <div className="cartitems-format-main cartitems-format">
           <img src={e.image} alt="" className='carticon-product-icon'/>
           <div className="info-items">
           <p className='name-cart-item'>{e.name}</p>
           <p className='price-cart-item'>Per price: Rs.{e.new_price}</p>
          < div className="quantity-container">
                      
          <input
  type="number"
  className="cartitems-quantity"
  value={cartItems[e.id] === 0 || cartItems[e.id] === undefined ? 1 : cartItems[e.id]}  // Default to 1 if quantity is 0 or undefined
  min="1"
  max="10"
  placeholder="Please fill the field"
  onChange={(event) => {
    const value = event.target.value;

    // Allow empty input but don't update the quantity to 0
    if (value === "") {
      updateCartQuantity(e.id, 1);  // Keep the item but reset to 1
      return;
    }

    const newQuantity = Math.max(1, Math.min(10, Number(value)));  // Ensure quantity is between 1 and 10
    updateCartQuantity(e.id, newQuantity);
  }}
  onBlur={(event) => {
    if (event.target.value === "") {
      alert("Please fill the quantity field.");
      updateCartQuantity(e.id, 1);  // Reset to 1 if left empty
    }
  }}
/>

                     
                    </div></div>
                    <div className="updateprice">
           <p>{(e.new_price*cartItems[e.id]).toFixed(2)} </p></div>
           <div className="remove-container">
           <img src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" className="remove" />
           </div>
            </div>
            
            <hr className="second-hr"/>
            
          </div>
        }
        return null;
      })}
      </div>
      <div className='right-cart'>
      <div className="cartitems-down">
        <div className="cartitems-totals">
        <div className='title-cart'>Cart total</div>
            <div>
                <div className="cartitems-total-items">
                    <p>Subtotal</p>
                    <p>Rs.{getTotalCartAmount()}</p>
                </div>
               
                <div className="cartitems-total-items">
                    <p>Estimated Shipping</p>
                    <p>Rs.</p>
                </div>
                <hr />
               <div className="cartitems-total-items">
               <h3>Total</h3>
               <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
        </div>
       
      </div>
      <div className="cartitems-promocode">
        <p>If you have a promocode enter it here</p>
        <div className="cartitems-promobox">
            <input type="text"placeholder='promo code' />
            <button>Apply</button>
        </div>
      </div>
      <button className='checkout'>Proceed To Checkout</button>
      </div>
    </div>
    </div>
  )

}

export default CartItems
