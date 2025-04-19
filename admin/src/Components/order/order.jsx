import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './order.css';
import parcel from '../../assets/parcel.png';
import { toast } from 'react-toastify';
const Order = ({ token }) => {
  const [orders, setOrder] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { Authorization: `Bearer ${token}` } })
      console.log(response.data)
      if (response.data.success) {
        setOrder(response.data.orders)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
 const statusHandler=async(event,orderId)=>{
  try {
    const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:event.target.value},{headers: { Authorization: `Bearer ${token}` }} )
    // console.log("Sending status:", event.target.value, "for order:", orderId);
    if (response.data.success) {
      await fetchAllOrders()
    } 
  } catch (error) {
    console.log(error)
    toast.error(response.data.message)
  }
 }
  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Order pages</h3>
      <div>
        {orders.map((order, index) => (
          <div className='outermost-part' key={index}>
            <img src={parcel} alt="" className="parcel-icon" />
            <div>
              <div>
                {order.items.map((item, index) => (
                  // if (index === order.items.length - 1) {
                  //   return <p key={index}>{item.name}x<span>{item.quantity}</span></p>
                  // } else {
                  //   return <p key={index}>{item.name}x<span>{item.quantity}</span></p>
                  // }
                  <p key={index}>{item.name} x <span>{item.quantity}</span></p>
                ))}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <p> {"phone number:   " + "  " + order.address.phone}</p>
              <p>{order.address.city + ", " + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
            </div>
            <div>
              <p>Items : {order.items.length}</p>
              <p>Method:{order.paymentMethod}</p>
              <p>Payment:{order.payment?'Done':'Pending'}</p>
              <p>Date:{new Date(order.date).toLocaleDateString()}</p>
              <p></p>
              </div>
              <p>Rs. {order.amount}</p>
              <select value={order.status} onChange={(event)=>statusHandler(event,order._id)}>
               <option value="OrderPlaced">OrderPlaced</option>
               <option value="Packing">Packing</option>
               <option value="Shipped">Shipped</option>
               <option value="Out for delivery">Out for delivery</option>
               <option value="Delivered">Delivered</option> 
              </select>
            </div>
            ))}
          </div>
          </div>
      );
  
    };

      export default Order
