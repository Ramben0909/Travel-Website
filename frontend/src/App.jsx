import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import required routing components
import Homepage from '../src/pages/homePage';  // Import the Homepage component
// import Page1 from './pages/Page1';
import Services from './pages/Services';
import About from './pages/About';
import Travel from './pages/Travel';
import Wishlist from './pages/Wishlist';
import Profile from './component/Profile';
import Contact from './pages/Contact';
import TravelPlanner from './pages/TravelPlanner';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/page1" element={<Page1 />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About/>} />
        <Route path="/Travel" element={<Travel />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/TravelPlanner" element={<TravelPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;

