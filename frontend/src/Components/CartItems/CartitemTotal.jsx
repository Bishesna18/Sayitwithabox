import React from 'react'
import './CartItems.css'
const CartitemTotal = ({ totalAmount }) => {
  return (
    <div className="cartitems-totals">
    <div className='title-cart'>Cart total</div>
        <div>
            <div className="cartitems-total-items">
                <p>Subtotal</p>
                <p>Rs.{ totalAmount }</p>
            </div>
           
            <div className="cartitems-total-items">
                <p>Estimated Shipping</p>
                <p>Rs.100</p>
            </div>
            <hr />
           <div className="cartitems-total-items">
           <h3>Total</h3>
           <h3>Rs.{ totalAmount }</h3>
        </div>
    </div>
   
  </div>
  )
}

export default CartitemTotal
