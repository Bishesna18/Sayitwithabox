import React from 'react'
import './Relatedproduct.css'
import data_product from '../Assets/all_product'
import Item from '../Items/Item'

const Relatedproduct = ({ currentCategories, currentProductId }) => {
    if (!currentCategories || currentCategories.length === 0) {
      console.error("No categories provided for related products.");
      return null; // Don't render if there's an issue
    }
  
    console.log("Filtering related products for categories:", currentCategories);
    console.log("Current Product ID (to exclude):", currentProductId);
  
    // Filter products: Check if at least one category matches & exclude current product
    const relatedProducts = data_product
      .filter(item => 
        item.id !== currentProductId && 
        item.category.some(cat => currentCategories.includes(cat)) // <-- Fix
      )
      .slice(0, 4); // Show max 4 related products
  
    return (
      <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <Item  
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <p>No related products found.</p>
          )}
        </div>
      </div>
    );
  };

export default Relatedproduct
