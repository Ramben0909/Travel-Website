import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import required routing components
import Homepage from './pages/Homepage';
// import Page1 from './pages/Page1';
import Services from './pages/Services';
import About from './pages/About';
import ImageUpload from './pages/Imgupload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/page1" element={<Page1 />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About/>} />
        <Route path="/Imgupload" element={<ImageUpload />} />

      </Routes>
    </Router>
  );
}

export default App;

