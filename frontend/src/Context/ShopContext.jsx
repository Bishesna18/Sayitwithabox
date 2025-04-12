import React ,{createContext, useEffect}from "react";
import {useState} from  "react";
import axios from 'axios';
import { toast } from 'react-toastify';
// import all_product from "../Components/Assets/all_product";
export const ShopContext=createContext();

// const getDefaultCart=()=>{
//   let cart={};
//   for (let index = 0; index < all_product.length+1; index++) {
//    cart[index]=0;
    
//   }
//   return cart; 
// }
const ShopContextProvider=(props)=>{
  const [cartItems,setCartItems]=useState({});
  const [token,setToken]=useState('')
  const [all_product,setall_Product]=useState([])
  const [search,setSearch]=useState('');
  const [showsearch,setShowSearch]=useState(false)

  const backendUrl='http://localhost:4000'

  // useEffect(() => {
  //   if (all_product.length > 0) {
  //     const defaultCart = {};
  //     for (let index = 0; index < all_product.length; index++) {
  //       defaultCart[all_product[index].id] = 0;
  //     }
  //     setCartItems(defaultCart);
  //   }
  // }, [all_product]);
     console.log(cartItems);
     const addToCart=async(itemId)=>{
      setCartItems((prev)=>({...prev,[itemId]:(prev[itemId] || 0)+1,}))
      if(token){
        try {
          await axios.post(backendUrl+'/api/cart/add',{itemId},{headers:{token}})
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
     console.log(cartItems);

    }
    const updateCartQuantity = (itemId, newQuantity) => {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: newQuantity,
      }));
    };
     const removeFromCart=(itemId)=>{
     setCartItems((prev) => {
    const updatedCartItems = { ...prev };
    delete updatedCartItems[itemId]; // Remove the item entirely from the cart
    return updatedCartItems;
  });
}
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for (const item in cartItems)
    {
      if(cartItems[item]>0){
       
          let itemInfo=all_product.find((product)=>product.id===Number(item))
          if (itemInfo) {
            totalAmount += itemInfo.new_price * cartItems[item]+100;
          }
   
      }
      
    }
    return parseFloat(totalAmount.toFixed(2));
  }
const getProductData=async()=>{
  try {
    const response=await axios.get(backendUrl+'/api/product/list')
    // console.log('Product Data:', response.data); 
    console.log(response.data);
    
    if(response.data.success){
      setall_Product(response.data.products)
  }else{ toast.error(response.data.message)

  }
    }
    
    
    
  catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}
useEffect(()=>{
  getProductData()
},[])
      
 const getTotalCartItems=(()=>{
  let totalItem=0;
  for(const item in cartItems)
  {
    if(cartItems[item]>0)
    {
      totalItem+=cartItems[item];

    }
  
  }
  return totalItem;
 })
    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,updateCartQuantity,backendUrl,search,setSearch,showsearch,setShowSearch};
      return(
       
        <ShopContext.Provider value={contextValue}>
           {props.children} 
        </ShopContext.Provider>
      
      )
}
export default ShopContextProvider;