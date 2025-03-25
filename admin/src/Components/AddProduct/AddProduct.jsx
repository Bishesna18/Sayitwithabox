import React, { useState } from 'react';
import Select from 'react-select';
import './AddProduct.css';
import upload_area from '../../assets/upload/photo.svg'



const categoryOptions = [
  { value:"Birthday",label:"Birthday"},
  { value:"Anniversary",label:"Anniversary"},
  { value:"Love_Romance",label:"Love & Romance"},
  { value:"Congratulations",label:"Congratulations"},
  { value:"GetWell_Sympathy",label:"Get Well & Sympathy"},
  { value:"Festivals_Special Events",label:"Festivals & Special Events"},
  { value: "For_Him", label: "For Him" },
  { value: "For_Her", label: "For Her" },
  { value: "For_Couples", label: "For Couples" },
  { value: "For_Friends", label: "For Friends" },
  { value: "The_Sophisticate", label: "The Sophisticate" },
  { value: "The_Romantic", label: "The Romantic" },
  { value: "The_Trendsetter", label: "The Trendsetter" },
  { value: "The_Homebody", label: "The Homebody" },
  { value: "Bouquets_by_Occasion", label: "Bouquets by Occasion" },
  { value: "Premium_Roses", label: "Premium Roses" },
  { value: "Exotic_Floral_Arrangements", label: "Exotic Floral Arrangements" },
  { value: "Luxury_Chocolate_Boxes", label: "Luxury Chocolate Boxes" },
  { value: "Artisan_Chocolate_Collections", label: "Artisan Chocolate Collections" },
  { value: "Premium_Wine_Hampers", label: "Premium Wine Hampers" },
  { value: "Chocolate_of_the_Month", label: "Chocolate of the Month" },
  { value: "Wine_Club_Membership", label: "Wine Club Membership" },
  { value: "Flower_and_Chocolate", label: "Flower and Chocolate" },
  { value: "Flower_and_Wine", label: "Flower and Wine" },
  { value: "Chocolate_and_Wine", label: "Chocolate and Wine" },
];

const AddProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:[],
    new_price:"",
    old_price:""
  })
  const[image,setImage]=useState(false);
  const imageHandler=(e)=>{
      setImage(e.target.files[0]);
  
  }
  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_product=async()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});

    if(responseData.success)
    {
      product.image=responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })
    }
  }
  
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here"/>
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Original Price</p>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here"/>
      </div>
      <div className="addproduct-itemfield">
        <p>Discounted Price</p>
        <input value={productDetails.new_price} onChange={changeHandler}  type="text" name="new_price" placeholder="Type here"/>
      </div>

     </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <Select
  name="category"
  options={categoryOptions}
  isMulti
  value={selectedCategories}
  onChange={(options) => {
    setSelectedCategories(options); // Update state with selected options
    setProductDetails((prev) => ({
      ...prev,
      category: options ? options.map((opt) => opt.value) : [], // Store selected values in productDetails
    }));
  }}
  className="add-product-selector"
  classNamePrefix="select"
/>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
<img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-image'alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
    </div>
  );
};

export default AddProduct;
