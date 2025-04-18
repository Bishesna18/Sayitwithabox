import React ,{createContext, useEffect}from "react";
import {useState} from  "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; 
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
  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");  // Get token from cookie
    if (storedToken) {
      setToken(storedToken);  // If token exists, set it to state
      getUserCart(storedToken);  // Fetch the user's cart if the token exists
    }
  }, []);
  

  
  useEffect(() => {
    if (all_product.length > 0) {
      const defaultCart = {};
      for (let index = 0; index < all_product.length; index++) {
        defaultCart[all_product[index].id] = 0;
      }
      setCartItems(defaultCart);
    }
  }, [all_product]);
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
     console.log(cartItems);


     const addToCart=async(itemId)=>{
      console.log("Before updating cart:", cartItems);
      console.log("itemId:", itemId);
console.log("token:", token);
      setCartItems((prev)=>({...prev,[itemId]:(prev[itemId] || 0)+1,}))
      console.log("Updated Cart Inside setCartItems");
      if(token){
        try {
          console.log("Sending to backend:", itemId, token);
          await axios.post(backendUrl+'/api/cart/add',{itemId},{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
     console.log(cartItems);
     console.log("After updating cart:", cartItems); 

    }
    const updateCartQuantity =async (itemId, newQuantity) => {
      // setCartItems((prev) => ({
      //   ...prev,
      //   [itemId]: newQuantity,
      // }));
      let cartData=structuredClone(cartItems);
      cartData[itemId]=newQuantity
      setCartItems(cartData)
      if(token){
        try{
          await axios.post(backendUrl+'/api/cart/update',{itemId,newQuantity},{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
        }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
      }
    
    };
     const removeFromCart=async(itemId)=>{
     setCartItems((prev) => {
    const updatedCartItems = { ...prev };
    delete updatedCartItems[itemId]; // Remove the item entirely from the cart
    return updatedCartItems;
  });
  if (token) {
    try {
      await axios.post(backendUrl + '/api/cart/update', { itemId, newQuantity: 0 }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
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
const getUserCart=async(token)=>{
  try {
    const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{Authorization: `Bearer ${token}`,}, withCredentials: true,})
    if(response.data.success){
      setCartItems(response.data.cartData)
    }
  } catch (error) {
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
    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,setCartItems,addToCart,removeFromCart,updateCartQuantity,backendUrl,search,setSearch,showsearch,setShowSearch,setToken,token};
      return(
       
        <ShopContext.Provider value={contextValue}>
           {props.children} 
        </ShopContext.Provider>
      
      )
}
export default ShopContextProvider;