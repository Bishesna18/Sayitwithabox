import React, { useState } from 'react';
import Select from 'react-select';
import './AddProduct.css';
import upload_area from '../../assets/upload/addpic2.png'
import axios from 'axios'
import { backendUrl } from '../../App';
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
const tagOptions = [
  { value: "Romantic", label: "Romantic" },
  { value: "Luxury", label: "Luxury" },
  { value: "Minimalist", label: "Minimalist" },
  { value: "Elegant", label: "Elegant" },
  { value: "Personalized", label: "Personalized" },
  { value: "Surprise", label: "Surprise" },
];
const AddProduct = () => {
  
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const [description,setDescription]=useState("");
  const [productDetails,setProductDetails]=useState({
    name:"",
    image:"",
    category:[],
    tags: [],
    new_price:"",
    old_price:""
  })
 
  const changeHandler=(e)=>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_product=async()=>{
   
  console.log(productDetails);
  let product = { ...productDetails }; // Clone product details
try{
  // Step 1: Upload images along with product details
  let formData = new FormData();
  if (image1) formData.append("image1", image1);
  if (image2) formData.append("image2", image2);
  if (image3) formData.append("image3", image3);
  if (image4) formData.append("image4", image4);
  
  formData.append("name", productDetails.name);
  formData.append("new_price", productDetails.new_price);
  formData.append("old_price", productDetails.old_price);
  formData.append("category",productDetails.category); // Convert array to JSON string
  formData.append("tags", productDetails.tags);
  formData.append("description", productDetails.description); 
 const response=await axios.post("http://localhost:4000/api/product/add",formData)
 console.log(response.data)

  } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
  }
  }
  
  return (
    <form className='add'>
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
    console.log("Selected Categories: ", options);


    setSelectedCategories(options); // Update state with selected options
    setProductDetails((prev) => ({
      ...prev,
      category: options ? options.map((opt) => opt.value) : [], // Store selected values in productDetails
      
    }));
  }}
  className="add-product-selector"
  classNamePrefix="select"
/>
<p>Tags</p>
  <Select
    name="tags"
    options={tagOptions}
    isMulti
    value={selectedTags}
    onChange={(options) => {
      console.log('Tags:', productDetails.tags); // Log tags
      setSelectedTags(options);
      setProductDetails((prev) => ({
        ...prev,
        tags: options ? options.map((opt) => opt.value) : [],
      }));
    }}
    className="add-product-selector"
    classNamePrefix="select"
  />
      </div>
      <div className="addproduct-itemfield">
        <p>Description</p>
        <textarea value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="content here"/>

      </div>
      <p>Upload image</p>
      <div className="image-upload">
      <div className="addproduct-itemfield">
        <label htmlFor="file-input1">
<img src={image1?URL.createObjectURL(image1):upload_area} className='addproduct-thumbnail-image'alt="" />
        </label>
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name='image' id='file-input1' hidden/>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input2">
<img src={image2?URL.createObjectURL(image2):upload_area} className='addproduct-thumbnail-image'alt="" />
        </label>
        <input onChange ={(e)=>setImage2(e.target.files[0])} type="file" name='image' id='file-input2' hidden/>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input3">
<img src={image3?URL.createObjectURL(image3):upload_area} className='addproduct-thumbnail-image'alt="" />
        </label>
        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name='image' id='file-input3' hidden/>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input4">
<img src={image4?URL.createObjectURL(image4):upload_area} className='addproduct-thumbnail-image'alt="" />
        </label>
        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name='image' id='file-input4' hidden/>
      </div>
      </div>
      <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
    </div>
    </form>
  );
};

export default AddProduct;
