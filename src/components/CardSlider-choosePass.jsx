import React, { useState, useEffect, useRef } from "react";

const ResponsiveCardSlider = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Function to start/restart the auto-slide timer
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  // Manual navigation with timer reset
  const handleNextSlide = () => {
    nextSlide();
    startAutoSlide();
  };

  const handlePrevSlide = () => {
    prevSlide();
    startAutoSlide();
  };

  const handleGoToSlide = (index) => {
    goToSlide(index);
    startAutoSlide();
  };

  // Auto-slide setup
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full px-3 py-0 mx-auto max-w-7xl">
      <div className="relative h-64 overflow-hidden sm:h-80 md:h-96">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div key={card.id} className="flex-shrink-0 w-full">
              <div className="relative shadow-lg">
                <img
                  src={card.image}
                  alt={`Slide ${card.id}`}
                  className="object-cover w-full h-64 rounded-lg sm:h-80 md:h-96 "
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-red-primary rounded-b-lg text-red-50 ">
                  <p className="text-sm sm:text-base">{card.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-0 z-10 p-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-r-lg cursor-pointer text-red-primary top-1/2 hover:bg-opacity-75"
          aria-label="Previous slide"
        >
          <span className="text-xl font-bold text-red-primary">‹</span>
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-0 z-10 p-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-l-lg cursor-pointer text-red-primary top-1/2 hover:bg-opacity-75"
          aria-label="Next slide"
        >
          <span className="text-xl font-bold text-red-primary">›</span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToSlide(index)}
            className={`h-3 w-3 rounded-full ${
              activeIndex === index ? "bg-gray-700" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

//  desktop view
const DesktopCardSlider = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const visibleCards = 3; // Number of cards visible
  const maxIndex = Math.max(0, cards.length - visibleCards);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const goToSlide = (index) => {
    if (index > maxIndex) {
      index = maxIndex;
    }
    setActiveIndex(index);
  };

  // Function to start/restart the auto-slide timer
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  // Manual navigation with timer reset
  const handleNextSlide = () => {
    nextSlide();
    startAutoSlide(); // Reset the timer
  };

  const handlePrevSlide = () => {
    prevSlide();
    startAutoSlide(); // Reset the timer
  };

  const handleGoToSlide = (index) => {
    goToSlide(index);
    startAutoSlide(); // Reset the timer
  };

  // Auto-slide setup
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * (100 / visibleCards)}%)`,
          }}
        >
          {cards.map((card) => (
            <div key={card.id} className="flex-shrink-0 w-1/3 px-2 ">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={card.image}
                  alt={`Slide ${card.id}`}
                  className="object-cover w-full transition-transform duration-500 hover:scale-105 h-96"
                />
                <div className="absolute bottom-0 left-0 right-0 block p-4 text-center bg-red-primary lg:hidden text-red-50">
                  <p>{card.caption}</p>
                </div>
                <div className="absolute inset-0 items-center justify-center hidden p-5 text-xl font-semibold text-white transition-opacity duration-500 opacity-0 bg-red-primary/60 bg-opacity-60 lg:flex hover:opacity-100">
                  {card.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-0 p-2 ml-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-r-lg cursor-pointer text-red-primary top-1/2 hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        <span className="text-2xl font-bold text-red-primary">‹</span>
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-0 p-2 mr-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-l-lg cursor-pointer text-red-primary top-1/2 hover:bg-opacity-75"
        aria-label="Next slide"
      >
        <span className="text-2xl font-bold text-red-primary">›</span>
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToSlide(index)}
            className={`cursor-pointer h-4 w-4 rounded-full ${
              activeIndex === index ? "bg-red-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Responsive wrapper component
const CardSlider = ({ cards }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Make sure least 3 cards for desktop view
  const safeCards =
    cards.length < 3 ? [...cards, ...cards, ...cards].slice(0, 3) : cards;

  return isMobile ? (
    <ResponsiveCardSlider cards={cards} />
  ) : (
    <DesktopCardSlider cards={safeCards} />
  );
};

export default CardSlider;
