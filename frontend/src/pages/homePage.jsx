import React from 'react';
import { useNavigate } from 'react-router-dom';    
import Navbar from '../component/Navbarr';                
import { Button } from "flowbite-react";   
import Map from '../component/map';               

const HomePage = () => {
  // const navigate = useNavigate();  

  // const handleClick = () => {
  //   navigate('./page1');  
  // };

  return (
    <>
      <Navbar />  {/* Your Navbar component */}
      <Map />
      {/* <div style={{ margin: '20px' }}>
        <Button color="blue" pill onClick={handleClick}>  
          Go to Page 1
        </Button>
      </div> */}
    </>
  );
};

export default HomePage;
