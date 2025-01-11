import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbarr';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUrl(res.data.url); // This is the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <input type="file" onChange={uploadImage} />
        {url && <img src={url} alt="Uploaded" style={{ width: '300px' }} />}
      </div>
    </>
  );
};

export default ImageUpload;
