import React, { useState, useEffect } from "react";
import sicily from "/sicily.jpg"; // Update image path
import rome from "/rome.jpg"; // Update image path
import paris from "/paris.jpg"; // Update image path
import 'animate.css';

import Destinations from "./Destinations";
const Home = () => {
  const carouselItems = [
    {
      
      caption: "Relax by the sun-kissed shores of Rome. Experience a blend of rich history and pristine beaches.",
      image: rome,
    },
    {
      caption: "Venture into the rugged mountains of Sicily. Discover picturesque landscapes, ancient ruins, and breathtaking views.",
      image: sicily,
    },
    {
      caption: "Fall in love with Paris. A city of romance, iconic landmarks, and unforgettable experiences.",
      image: paris,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <>   <div className="relative w-full h-[94vh] overflow-hidden">
    {/* Carousel Item */}
    <div
      className="absolute inset-0 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${carouselItems[currentIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-40 flex flex-col items-center justify-center text-center">
        <h2 className="text-white text-4xl sm:text-5xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Discover Your Next Adventure
        </h2>
        <p className="text-white text-lg sm:text-xl mb-6 animate__animated animate__fadeIn animate__delay-3s">
          {carouselItems[currentIndex].caption}
        </p>
        <button className="bg-red-500 text-white py-3 px-8 rounded-lg text-lg transform transition-all duration-300 hover:bg-red-600 hover:scale-105">
          Read More
        </button>
      </div>
    </div>
  
    {/* Navigation Buttons - Hide on mobile */}
    <button
      onClick={prevSlide}
      className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white bg-red-600 bg-opacity-80 p-5 rounded-full shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-110 md:block hidden"
    >
      &#8592;
    </button>
    <button
      onClick={nextSlide}
      className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white bg-red-600 bg-opacity-80 p-5 rounded-full shadow-lg transition-all duration-300 hover:bg-red-700 hover:scale-110 md:block hidden"
    >
      &#8594;
    </button>
  </div>
  <Destinations/>
</>

  );
};

export default Home;
