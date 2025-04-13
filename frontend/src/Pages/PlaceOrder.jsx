import React , { useContext,useState }  from 'react'
import './CSS/PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import Stripelogo from "../Components/Assets/Stripelogo.png";
import CartitemTotal from '../Components/CartItems/CartitemTotal'
import { ShopContext } from '../Context/ShopContext'
const PlaceOrder = () => {
   const navigate = useNavigate();
  const [method,setMethod]=useState('cod');
  const { getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  return (
    <div className='outer-form-place-order'>
     <div className='layer-2-placeorder'>
      <div className='collective'>
      {/* <Title text1={'Delivery'} text2={'Information'}/> */}
  <h1>Delivery Information</h1>
      </div>
      <div className='name'>
        <input className='Field Name' type="text" placeholder='First Name' />
        <input className='Field Name' type="text" placeholder='Last Name' />
      </div>
      <input className='Field' type="Email" placeholder='Email' />
      <input className='Field' type="text" placeholder='Street' />
      <div className='name'>
        <input className='Field Name' type="text" placeholder='City' />
        <input className='Field Name' type="text" placeholder='State' />
      </div>
      <div className='name'>
        <input className='Field Name' type="Number" placeholder='Zip code' />
        <input className='Field Name' type="text" placeholder='Country' />
      </div>
      <input className='Field' type="Number" placeholder='Phone number' />
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
            <button onClick={()=>navigate('/orders')}className='placeorder'>Place order</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
