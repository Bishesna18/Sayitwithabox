import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import'./ListProduct.css'
import axios from 'axios'
import cross_icon from '../../assets/cross.svg'
const ListProduct = ({token}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [list,setList]=useState([]);
  
  const fetchInfo=async()=>{
    try{
    const response=await axios.get('http://localhost:4000/api/product/list')
    if (response.data.success){
      console.log(response.data.products)
      setList(response.data.products);
    }
    else{
      toast.error(response.data.message)
    }
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product=async(id)=>{

    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed){
   try {
    const response=await axios.post("http://localhost:4000/api/product/remove",{id},{headers:{token}})
    if(response.data.success){
      
      toast.success(response.data.message)
      await fetchInfo();
    }
    else{
      toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
  }
};
  const toggleCategory = (productID) => {
    setExpandedIndex(expandedIndex === productID ? null : productID);
  };
  return (
    <div className='list-product'>
      <h1>All product list</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
      
        {list.map((product)=>{
          const isExpanded=expandedIndex===product.id;
         return (<div key={product.id} ><div className="listproduct-format-main listproduct-format">
       <img src={product.image[0]} alt="" className="listproduct-product-icon" />
       <p>{product.name}</p>
       <p>Rs{product.old_price}</p>
       <p>Rs{product.new_price}</p>
      
       <p className={`listproduct-category ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleCategory(product.id)}>
                  {Array.isArray(product.category)
                    ? isExpanded
                      ? product.category.join(", ")
                      : product.category.slice(0, 2).join(", ") + (product.category.length > 2 ? " ..." : "")
                    : product.category}
                </p>
       <img onClick={()=>{remove_product(product._id)}}className='listproduct-remove-icon' src={cross_icon} alt="" />
       </div>
       <hr/>
      </div>
      );
       })}
      </div>
    </div>
  )
}

export default ListProduct;
