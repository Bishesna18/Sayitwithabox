import React,{ useState }  from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
    const [activeTab, setActiveTab] = useState("description");
  return (
    
    <div className='descriptionbox'>
     <div className="descriptionbox-navigator">
     <div
          className={`description-nav-box ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}>
          Description
        </div>
        <div
          className={`description-nav-box ${activeTab === "Why us" ? "active" : ""}`}
          onClick={() => setActiveTab("Why us")}
        >
          Why us?
        </div>
        <div className="indicator" style={{ left: activeTab === "description" ? "0%" : "50%" }}></div>
      </div>
        <div className="static-line"></div>
        <div className="descriptionbox-description">
        {activeTab === "description" ? (
            <p>
            Indulge in the rich, velvety goodness of our Heavenly Delight Cake, crafted to perfection with premium ingredients. This moist and fluffy cake melts in your mouth with every bite, offering a delightful blend of flavors. Topped with a luscious layer of smooth frosting and garnished with elegant decorations, it’s the perfect treat for birthdays, anniversaries, or any special moment.
            </p>
             ) : (
            <p>
            Available in a variety of flavors, including classic chocolate, creamy vanilla, red velvet, and more. Order now and make your celebrations extra sweet!
            </p>
             )}
        </div>
    </div>
  )
}

export default DescriptionBox
