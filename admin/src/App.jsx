import React,{useEffect, useState} from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import Login from './Components/login/login'
import {Routes,Route} from 'react-router-dom'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'
import Order from './Components/order/Order';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer} from 'react-toastify';
const App = () => {
  const [token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div>
      <ToastContainer />
      {token===""?  <Login setToken={setToken}/>:<>
    
      <Navbar setToken={setToken}/>
      <Admin  token={token}/>

     {/* <Routes>
      
      <Route path='/addproduct' element= {<AddProduct token={token}/>}/>
      <Route path='/listproduct' element= {<ListProduct token={token}/>}/>
      <Route path='/order/list' element={<Order token={token}/>}/>
     </Routes> */}
     </>
}
    </div>
  )
}

export default App
