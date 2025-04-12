import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import logos from "../Assets/search2.png"
import remove_icon from '../Assets/close.png'
import './SearchBar.css'
const SearchBar = () => {
    const{search,setSearch,showsearch,setShowSearch}=useContext(ShopContext);
    // return <div style={{ background: "red", padding: "20px" }}>I AM SEARCH BAR</div>;
    console.log("Show Search:", showsearch);
  return showsearch?(
    <div className='search-display-box'>
    <div className="put-together">
      <input className='input-place' type='text' value={search} onChange={(e)=>setSearch(e.target.value)}placeholder='Search'/>
      <img className='img-search'src={logos} alt=""/>
    </div>
    <img onClick={()=>setShowSearch(false)}src={remove_icon}alt=""/>
   
    </div>
  ):null
 
}

export default SearchBar
