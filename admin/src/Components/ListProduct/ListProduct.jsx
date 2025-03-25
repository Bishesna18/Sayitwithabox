import React,{useEffect, useState} from 'react'

import'./ListProduct.css'
import cross_icon from '../../assets/cross.svg'
const ListProduct = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [allproducts,setAllProducts]=useState([]);
  const fetchInfo=async()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product=async(id)=>{

    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (isConfirmed){
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
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
      
        {allproducts.map((product)=>{
          const isExpanded=expandedIndex===product.id;
         return (<div key={product.id} ><div className="listproduct-format-main listproduct-format">
       <img src={product.image} alt="" className="listproduct-product-icon" />
       <p>{product.name}</p>
       <p>${product.old_price}</p>
       <p>${product.new_price}</p>
      
       <p className={`listproduct-category ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleCategory(product.id)}>
                  {Array.isArray(product.category)
                    ? isExpanded
                      ? product.category.join(", ")
                      : product.category.slice(0, 2).join(", ") + (product.category.length > 2 ? " ..." : "")
                    : product.category}
                </p>
       <img onClick={()=>{remove_product(product.id)}}className='listproduct-remove-icon' src={cross_icon} alt="" />
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
