import React from 'react'
import './CSS/PlaceOrder.css'
const PlaceOrder = () => {
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
    </div>
  )
}

export default PlaceOrder
