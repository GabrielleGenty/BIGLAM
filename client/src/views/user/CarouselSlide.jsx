import React from 'react';
import Carousel from './Carousel';

function CarouselSlide() {
    const images = [
        'path/to/image1.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
      ];
  return (
    <div className="App">
      <h1>My React App</h1>
      <Carousel images={images} />
    </div>
  );
}

export default CarouselSlide