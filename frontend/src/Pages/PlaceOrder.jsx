import React , { useContext,useState }  from 'react'
import './CSS/PlaceOrder.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Stripelogo from "../Components/Assets/Stripelogo.png";
import CartitemTotal from '../Components/CartItems/CartitemTotal'
import { ShopContext } from '../Context/ShopContext'
const PlaceOrder = () => {
   const backendUrl='http://localhost:4000'
   const navigate = useNavigate();
   const { getTotalCartAmount } = useContext(ShopContext);
   const {token,cartItems,setCartItems,delivery_fee,all_product}=useContext(ShopContext)
  const [method,setMethod]=useState('cod');
  const [formData,setFormData]=useState({
  firstName:'',
  lastName:'',
  email:'',
  street:'',
  city:'',
  state:'',
  zipcode:'',
  country:'',
  phone:''
  })
  const onChangeHandler=(event)=>{
   const name=event.target.name;
   const value=event.target.value

   setFormData(data=>({...data,[name]:value}))

  }
  const onSubmitHandler=async(event)=>{
   event.preventDefault()
   try{
    console.log("cartItems:", cartItems);
    console.log("all_product:", all_product);

   let orderItems=[]
   
    for (const productId in cartItems) {
      const quantity = cartItems[productId];

      if (quantity > 0) {
        if (!all_product || all_product.length === 0) {
          console.error("No all_product available in context");
          continue;
        }
        const productIdNum = Number(productId);
        console.log(`Comparing cart item ID: ${productIdNum}} (type: ${typeof  productIdNum}})`);
        console.log(`With all_product ID: ${all_product[0]?.id} (type: ${typeof all_product[0]?.id})`);
        
        console.log("First product id type:", typeof all_product[0]?.id);
        const itemInfo = structuredClone(all_product.find(product => product.id ===  productIdNum));
        if (itemInfo) {
          itemInfo.quantity = quantity;
          orderItems.push(itemInfo);
        }
      }
   }

   console.log(orderItems);
   let orderData={
    address:formData,
    items:orderItems,
    amount: getTotalCartAmount()
   }
   switch(method){
    //
    case 'cod':
    const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
    if (response.data.success){
      setCartItems({})
      navigate('./order')
    }
    else{
      toast.error(response.data.message)
    }
    break;
    case 'stripe':
      const responseStripe=await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
      if(responseStripe.data.success){
        const {session_url}=responseStripe.data
        window.location.replace(session_url)
      }else{
        toast.error(responseStripe.data.message)
      }
      break;
    default:
      break;
   }
   }catch(error){
    console.error("Order creation failed:", error);
   }
  }
 
  const totalAmount = getTotalCartAmount();
  return (
    <form onSubmit={onSubmitHandler}className='outer-form-place-order'>
     <div className='layer-2-placeorder'>
      <div className='collective'>
      {/* <Title text1={'Delivery'} text2={'Information'}/> */}
  <h1>Delivery Information</h1>
      </div>
      <div className='name'>
        <input required onChange={onChangeHandler} name='firstName'value={formData.firstName} className='Field Name' type="text" placeholder='First Name' />
        <input required onChange={onChangeHandler} name='lastName'value={formData.lastName}  className='Field Name' type="text" placeholder='Last Name' />
      </div>
      <input required onChange={onChangeHandler} name='email'value={formData.email}  className='Field' type="Email" placeholder='Email' />
      <input required onChange={onChangeHandler} name='street'value={formData.street} className='Field' type="text" placeholder='Street' />
      <div className='name'>
        <input required onChange={onChangeHandler} name='city'value={formData.city}   className='Field Name' type="text" placeholder='City' />
        <input required onChange={onChangeHandler} name='state'value={formData.state}  className='Field Name' type="text" placeholder='State' />
      </div>
      <div className='name'>
        <input required onChange={onChangeHandler} name='zipcode'value={formData.zipcode}  className='Field Name' type="Number" placeholder='Zip code' />
        <input required onChange={onChangeHandler} name='country'value={formData.country}  className='Field Name' type="text" placeholder='Country' />
      </div>
      <input required onChange={onChangeHandler} name='phone'value={formData.phone}  className='Field' type="Number" placeholder='Phone number' />
      </div> 
      {/*---rightside */}
      <div className="rightside-outer">
      <div className="rightside-inner">
        <CartitemTotal  totalAmount={totalAmount}/>
        </div>
        <div className="paymentplace">
          <h2>Payment Method</h2>
          <div className="payment-option">
            <div onClick={()=>setMethod('stripe')}className="paymentholder">
              <p className={`boxes ${method === 'stripe' ? 'selected' : ''}`}></p>
              <img className='payment-logos' src={Stripelogo} alt=""/>
            </div>
            <div onClick={()=>setMethod('cod')}className="paymentholder m">
              <p className={`boxes ${method === 'cod' ? 'selected' : ''}`}></p>
              <p className='payment-text'>CASH ON DELIVERY </p>
            </div>
           
          </div>
          <div className="orderplacement">
            <button type='submit' className='placeorder'>Place order</button>
            </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
