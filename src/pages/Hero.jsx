
import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1920&q=80', // Waterfall in a lush forest
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?fit=crop&w=1920&q=80', // Mountain range with sunset
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?fit=crop&w=1920&q=80', // Calm ocean with a rocky shore
  ];

  useEffect(() => {
    if (!isPopupOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images.length, isPopupOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative w-full h-screen rounded-lg overflow-hidden">
      {images.length > 0 && (
        <img
          src={images[currentImageIndex]}
          alt="Slider Image"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={prevImage}
          className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl bg-opacity-50 focus:outline-none transition duration-300 ease-in-out"
        >
          <FiChevronLeft className="text-gray-800 text-xl" />
        </button>
        <button
          onClick={nextImage}
          className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl bg-opacity-50 focus:outline-none transition duration-300 ease-in-out"
        >
          <FiChevronRight className="text-gray-800 text-xl" />
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
      <div className="absolute bottom-8 right-1 p-4 flex">
        <button className="text-black text-ml bg-gray-100 bg-opacity-50 p-4 rounded-full" onClick={openPopup}>View</button>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-1 rounded-lg shadow-lg w-full h-full relative">
            <button onClick={closePopup} className="absolute top-4 right-4 text-gray-500 text-2xl">
              ✕
            </button>
            <img
              src={images[currentImageIndex]}
              alt="Current View"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const HeroPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ImageSlider />
      <div className="absolute w-full left-1/8 top-4 text-center max-w-lg bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-500 mb-4">Welcome to Wanco Agent</h1>
        <p className="text-xl text-gray-500 mb-8">"All time we are Ready"</p>
        <div>
          <a href="/login" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
            Apply
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
