import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageSlideshow.css';

const ImageSlideshow = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const placeholderImages = Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          path: `https://via.placeholder.com/400x300?text=Image+${i + 1}`
        }));
        
        try {
          const response = await axios.get('/api/images');
          if (response.data && response.data.length) {
            setImages(response.data);
          } else {
            setImages(placeholderImages);
          }
        } catch (error) {
          console.log('Error fetching from API, using placeholders', error);
          setImages(placeholderImages);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (isLoading) {
    return <div className="loading">Loading images...</div>;
  }

  return (
    <div className="image-slideshow">
      <h2>Image Slideshow</h2>
      <p>Click on the image to cycle through the slideshow</p>
      
      {images.length > 0 && (
        <div className="image-container" onClick={handleImageClick}>
          <img 
            src={images[currentIndex].path} 
            alt={`Image ${images[currentIndex].id}`} 
          />
          <div className="image-counter">
            Image {currentIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlideshow; 