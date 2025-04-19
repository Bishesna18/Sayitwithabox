import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import'./Admin.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Order from '../../Components/order/Order'
const Admin = ({token}) => {
  return (
    <div className='admin'>
      
      <Sidebar/>
      <div className="admin-content">
      <Routes>
     
      <Route path='/addproduct' element={<AddProduct token={token}/>}/>
      <Route path='/listproduct' element={<ListProduct token={token}/>}/>
      <Route path='/order/list' element={<Order token={token}/>} />
      </Routes>
    </div>
    </div>
  )
}

export default Admin
