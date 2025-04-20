import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate, useSearchParams  } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const Verify = () => {
    const navigate = useNavigate();
    const {token,setCartItem}=useContext(ShopContext)
    const [searchParams,setSearchParams,]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
     const backendUrl='http://localhost:4000'

    const verifyPayment=async()=>{
        try {
        if (!token) {
            return null
          }  
          const response=await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
        if(response.data.success){
            console.log("Verified successfully. Updating cart and navigating..."); 
           setCartItem({})
           setTimeout(() => {
           navigate('/cart/place-order/order')
        }, 100);
        }else{
            navigate('/cart')
        }
        } catch (error) {
          console.log(error)
          toast.error(error.message) 
        }
    }
    useEffect(()=>{
        console.log("Token is", token); 
    verifyPayment()

    },[token])
  return (
    <div>
     
    </div>
  )
}

export default Verify
