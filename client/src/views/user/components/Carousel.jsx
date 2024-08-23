import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ images, productIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [currentIndex]);

  return (
    <div className="carousel">
      <button onClick={prevSlide}>&lt;</button>
      <div className='container'>
      <Link to={`/product/${productIds[currentIndex]}`}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </Link>
      </div>
      <button onClick={nextSlide}>&gt;</button>
    </div>
  );
};

export default Carousel;
