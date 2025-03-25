import React,{useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams,useLocation} from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
// import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProduct/Relatedproduct';
const Product = () => {
  const {all_product}=useContext(ShopContext);
  const {productId}=useParams();
  const location = useLocation();
  const product=all_product.find((e)=>e.id===Number(productId));
  const openedCategory = location.state?.category || "Unknown"; // Get category from state or fallback
  return (
    <div>
      <Breadcrum product={product} openedCategory={openedCategory}/>
      <ProductDisplay product={product}/>
     <RelatedProducts currentCategories={product.category} currentProductId={product.id}/>
    </div>
  )
}

export default Product
