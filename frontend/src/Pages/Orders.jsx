import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CSS/Orders.css'
const Orders = () => {
    const {all_product,currency}=useContext(ShopContext);
  return (
    <div className='outer-order-layer'>
      <div className="title">
        <h1>My orders</h1>
      </div>
      <div className='overall-dis'>
        {
        all_product.slice(1,4).map((item,index)=>(
         <div className='orderdisplay'key={index}> 
         <div className="insideDisplay">
          <img  src={item.image[0]} alt="" />
          <div className="all-description-order">
            <p className='item-name-order'>{item.name}</p>
            <div className="description-item-order">
              <p>Rs.{item.new_price}</p>
              <p>Quantity:1</p>  
            </div>
            <p className='Date'> <span className="datelabel">Date:</span><span className='datevalue'>25,April,2025</span></p>
          </div>
          </div> 
          <div ClassName='StateOrder'>
      <div className="inner-info">
        <p className='Boxes'></p>
        <p className='state'>Ready to ship</p>
      </div>
     
          </div>
          <button className="track-btn">Track order</button>
         </div> 

        ))
        }
      </div>
    </div>
  )
}

export default Orders
