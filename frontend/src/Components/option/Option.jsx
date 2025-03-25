import React, { useState } from 'react';
import './Option.css'
import cross_icon from '../Assets/cross.svg'
import birthdayImg from '../Assets/birthday1.jpg';
import Annivarsary from '../Assets/annivarsary2.jpg';
import Love from '../Assets/love.jpg';
import congratulation from '../Assets/cong2.jpg';
import festival from '../Assets/festival.jpg';
import him from '../Assets/him.jpg';
import her from '../Assets/her1.jpg';
import couple from '../Assets/couple.jpg';
import friends from '../Assets/friends2.jpg';
import sophesticated from '../Assets/sophesticated.jpg';
import trend from '../Assets/Trendsetter2.jpg';
import homebody from '../Assets/Homebody.jpg';
import theromantic from '../Assets/Theromantic.jpg';
import bouquet1 from '../Assets/bouquet1.jpg';
import bouquet2 from '../Assets/bouquet2.jpg';
import bouquet3 from '../Assets/bouquet3.jpg';
import cd from '../Assets/cd1.jpg';
import cd2 from '../Assets/cd2.jpg';
import cd3 from '../Assets/cd3.jpg';
import cd4 from '../Assets/cd4.jpg';
import cd5 from '../Assets/cd5.jpg';
import cd6 from '../Assets/cd6.jpg';
import fl1 from '../Assets/fl1.jpg';
import fl2 from '../Assets/fl2.jpg';
const categoryData = {
  Occasion: {
    label: "Occasion",
    subcategories: [
      { value: "Birthday", label: "Birthday",imgSrc: birthdayImg },
      { value: "Anniversary", label: "Anniversary",imgSrc:Annivarsary},
      { value: "Love_Romance", label: "Love & Romance" ,imgSrc:Love },
      { value: "Congratulations", label: "Congratulations", imgSrc:congratulation},
   
      { value: "Festivals_Special_Events", label: "Festivals & Special Events" , imgSrc:festival }
    ]
  },
  Flowers: {
    label: "Flowers",
    subcategories: [
      { value: "Bouquets_by_Occasion", label: "Bouquets by Occasion",imgSrc:bouquet2  },
      { value: "Premium_Roses", label: "Premium Roses",imgSrc:bouquet1},
      { value: "Exotic_Floral_Arrangements", label: "Exotic Floral Arrangements" ,imgSrc:bouquet3}
    ]
  },
  ChocolateAndDrinks: {
    label: "Chocolate & Drinks",
    subcategories: [
      { value: "Luxury_Chocolate_Boxes", label: "Luxury Chocolate Boxes",imgSrc:cd },
      { value: "Artisan_Chocolate_Collections", label: "Artisan Chocolate Collections" ,imgSrc:cd6},
      { value: "Premium_Wine_Hampers", label: "Premium Wine Hampers" ,imgSrc:cd3},
      { value: "Chocolate_of_the_Month", label: "Chocolate of the Month",imgSrc:cd4 },
      { value: "Wine_Club_Membership", label: "Wine Club Membership",imgSrc:cd5 }
    ]
  },
  Subscription: {
    label: "Subscription",
    subcategories: [
      { value: "Flower_and_Chocolate", label: "Flower and Chocolate",imgSrc:fl2 },
      { value: "Flower_and_Wine", label: "Flower and Wine",imgSrc:fl1 },
      { value: "Chocolate_and_Wine", label: "Chocolate and Wine" ,imgSrc:cd2}
    ]
  },
  ByPerson: {
    label: "By Person",
    subcategories: [
      { value: "For_Him", label: "For Him" ,imgSrc:him},
      { value: "For_Her", label: "For Her" , imgSrc:her },
      { value: "For_Couples", label: "For Couples",imgSrc:couple },
      { value: "For_Friends", label: "For Friends",imgSrc:friends }
    ]
  },
  ByPersonality: {
    label: "By Personality",
    subcategories: [
      { value: "The_Sophisticate", label: "The Sophisticate", imgSrc:sophesticated},
      { value: "The_Romantic", label: "The Romantic",imgSrc: theromantic },
      { value: "The_Trendsetter", label: "The Trendsetter",imgSrc:trend },
      { value: "The_Homebody", label: "The Homebody",imgSrc: homebody }
    ]
  }
};

const Option = ({ category }) => {
  const categoryDetails = categoryData[category];
  const [selectedSubcategories,setSelectedSubcategories]=useState([]);
  if (!categoryDetails) {
    return <div>Category not found</div>; 
  }
   const handleSelectSubcategory=(sub)=>{
    if (!selectedSubcategories.some((item)=>item.value===sub.value)){
      setSelectedSubcategories([...selectedSubcategories,sub]);
    }
   };
   const handleRemoveSubcategory=(subValue)=>{
    setSelectedSubcategories(selectedSubcategories.filter((item)=>item.value!==subValue));
   };
   const handleClearAll = () => {
    setSelectedSubcategories([]); // Clears the entire selection
  };

  return (
    <div className='Option'>
      <div className="opt-title-category">
        <h1>{categoryDetails.label}</h1>
        <p>Make a perfect box</p>
      </div>
      <div className="circle-opt-whole">
        {categoryDetails.subcategories.map((sub, index) => (
          <div className="opt-box" key={index} onClick={()=>handleSelectSubcategory(sub)}>
            <div className="first-layer-circle">
              <div className="second-layer-circle"> <img src={sub.imgSrc} alt={sub.label} className="opt-box-image" /></div>
            </div>
            <div className="opt-box-title">{sub.label}</div>
          </div>
        ))}
      </div>
      {selectedSubcategories.length>0&&(
      <div className="record-opt">
        {selectedSubcategories.map((sub, index) => (
          <div className="records" key={index}>
            <p>{sub.label} </p>
            <img className='listrecord-remove-icon' src={cross_icon} alt="" onClick={() => handleRemoveSubcategory(sub.value)}/>
          </div>
        ))}
         <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
      </div>
      
      )}

    </div>
  );
};

export default Option;
