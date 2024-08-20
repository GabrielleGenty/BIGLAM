// import React, { useState, useEffect } from 'react';

// const Carousel = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 3000); // Change slide every 3 seconds

//     return () => {
//       clearInterval(interval); // Clear the interval on component unmount
//     };
//   }, [currentIndex]); // Only re-run the effect when currentIndex changes

//   return (
//     <div className="carousel">
//       <button onClick={prevSlide}>&lt;</button>
//       <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
//       <button onClick={nextSlide}>&gt;</button>
//     </div>
//   );
// };

// export default Carousel;
