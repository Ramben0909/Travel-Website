import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Homepage from '../src/pages/homePage';  
import Services from './pages/Services';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Profile from './component/Profile';
import Contact from './pages/Contact';
import TravelPlanner from './pages/TravelPlanner';

import { WishlistProvider } from './context/WishListContext'

function App() {
  return (
     <WishlistProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/page1" element={<Page1 />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About/>} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/TravelPlanner" element={<TravelPlanner />} />
      </Routes>
    </Router>
    </WishlistProvider>
  );
}

export default App;

