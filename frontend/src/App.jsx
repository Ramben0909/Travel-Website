import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import required routing components
import Homepage from './pages/Homepage';
// import Page1 from './pages/Page1';
import Services from './pages/Services';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/page1" element={<Page1 />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;

