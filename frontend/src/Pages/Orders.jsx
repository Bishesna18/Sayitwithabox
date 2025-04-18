import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import './CSS/Orders.css'
import axios from 'axios';
const Orders = () => {
    const {all_product,token,currency}=useContext(ShopContext);
    console.log('Token in context:', token);
     const backendUrl='http://localhost:4000'
     const [orderData,setOrderData]=useState([])
    const loadOrderData=async()=>{
      try{
      if(!token){
        return null
       
      }
    
      const response=await axios.post(backendUrl+'/api/order/userorders',{},{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
      console.log("Response data:", response.data);
      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
           item['status']=order.status
           item['payment']=order.payment
           item['paymentMethod']=order.paymentMethod
           item['date']=order.date
           allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
      }
      // setOrderData(response.data.orders);
      }catch(error){

      } 
    }
    useEffect(()=>{
    loadOrderData()
    },[token])
  return (
    <div className='outer-order-layer'>
      <div className="title">
        <h1>My orders</h1>
      </div>
     
      <div className='overall-dis'>
        {
           orderData.length === 0 ? (
            <p>No orders found.</p>
          ) :
       orderData.map((item,index)=>(
         <div className='orderdisplay'key={index}> 
         <div className="insideDisplay">
          <img  src={item.image[0]} alt="" />
          <div className="all-description-order">
            <p className='item-name-order'>{item.name}</p>
            <div className="description-item-order">
              <p>Rs.{item.new_price}</p>
              <br></br><br></br>
              <p>Quantity: {item.quantity||1}</p>  
            </div>
            <p className='Date'> <span className="datelabel">Date: </span>    <span className='datevalue'>{new Date(item.date).toDateString()}</span></p>
            <p className='payment'> <span className="paymentlabel">Payment Metod:  </span>    <span className='datevalue'>{item.paymentMethod}</span></p>
          </div>
          </div> 
          <div className='StateOrder'>
      <div className="inner-info">
        <p className='Boxes'></p>
        <p className='state'>{item.status}</p>
      </div>
     
          </div>
          <button onClick={loadOrderData} className="track-btn">Track order</button>
         </div> 

        ))
        }
      </div>
    </div>
  )
}

export default Orders
