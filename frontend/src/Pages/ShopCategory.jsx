import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import Option from '../Components/option/Option';
import { useNavigate } from 'react-router-dom';

// Inside ShopCategory component

const mainCategories = {
    Occasion: [
      "Birthday",
      "Anniversary",
      "Love_Romance",
      "Congratulations",
      "Festivals_Special_Events"
    ],
    Flowers: [
      "Bouquets_by_Occasion",
      "Premium_Roses",
      "Exotic_Floral_Arrangements"
    ],
    ChocolateAndDrinks: [
      "Luxury_Chocolate_Boxes",
      "Artisan_Chocolate_Collections",
      "Premium_Wine_Hampers",
      "Chocolate_of_the_Month",
      "Wine_Club_Membership"
    ],
    Subscription: [
      "Flower_and_Chocolate",
      "Flower_and_Wine",
      "Chocolate_and_Wine"
    ],
    ByPerson: [
      "For_Him",
      "For_Her",
      "For_Couples",
      "For_Friends"
    ],
    ByPersonality: [
      "The_Sophisticate",
      "The_Romantic",
      "The_Trendsetter",
      "The_Homebody"
    ]
  };
const ShopCategory = ({ category }) => {
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);
  const subcategories = mainCategories[category];
  return (
    <div className='shop-category'>
      <Option category={category} />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
      </div>
      <div className="shopcategory-products">
      {all_product
          .filter(item => {
            // Check if any of the subcategories match the product's category array
            return item.category.some(subcategory => subcategories.includes(subcategory));
          })
          .map((item, i) => (
            <div key={i} onClick={() => navigate(`/product/${item.id}`, { state: { category } })}>
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
            </div>
          ))
        }
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
