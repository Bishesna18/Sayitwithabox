import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Gift from './Pages/Gift';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import ShopCategory from './Pages/ShopCategory';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Aboutus from './Pages/Aboutus';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login']; // Add routes where navbar should be hidden

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Gift />} />
        <Route path='/Byperson' element={<ShopCategory category="ByPerson" />} />
        <Route path='/Bypersonality' element={<ShopCategory category="ByPersonality" />} />
        <Route path='/Occasion' element={<ShopCategory category="Occasion" />} />
        <Route path='/Flowers' element={<ShopCategory category="Flowers" />} />
        <Route path='/Chocolates' element={<ShopCategory category="ChocolateAndDrinks" />} />
        <Route path='/Subscription' element={<ShopCategory category="Subscription" />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/Aboutus' element={<Aboutus/>} />
        <Route path='/forgot-Password' element={<ForgotPassword/>} />
        <Route path='/reset-password/:token' element={<ResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
