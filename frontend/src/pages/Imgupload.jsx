import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    setImage(file);
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUrl(res.data.url); // Update the URL of the uploaded image
      setUploading(false);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload the image. Please try again.');
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Image Upload</h2>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {uploading && <p className="text-blue-500">Uploading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {url && (
            <div>
              <p className="text-green-500">Image uploaded successfully!</p>
              <img
                src={url}
                alt="Uploaded"
                className="mt-4 rounded-lg shadow-md"
                style={{ width: '300px', height: 'auto' }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
