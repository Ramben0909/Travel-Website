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
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Image Upload</h2>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
          />
          {uploading && (
            <p className="text-blue-500 font-semibold animate-pulse">
              Uploading...
            </p>
          )}
          {error && <p className="text-red-500 font-medium">{error}</p>}
          {url && (
            <div className="text-center">
              <p className="text-green-500 font-semibold">
                Image uploaded successfully!
              </p>
              <img
                src={url}
                alt="Uploaded"
                className="mt-4 rounded-lg shadow-md border-2 border-gray-200"
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
