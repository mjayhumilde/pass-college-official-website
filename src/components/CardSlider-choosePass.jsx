import React, { useState, useEffect } from "react";

const ResponsiveCardSlider = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); //  3 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full px-3 py-0 mx-auto max-w-7xl">
      <div className="relative h-64 overflow-hidden sm:h-80 md:h-96">
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{
              display: index === activeIndex ? "block" : "none",
            }}
          >
            <div className="relative shadow-lg">
              <img
                src={card.image}
                alt={`Slide ${card.id}`}
                className="object-cover w-full h-64 sm:h-80 md:h-96"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-red-800 text-red-50">
                <p className="text-sm sm:text-base">{card.caption}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-r-lg cursor-pointer text-red-950 top-1/2 hover:bg-opacity-75"
          aria-label="Previous slide"
        >
          <span className="text-xl font-bold">‹</span>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-l-lg cursor-pointer text-red-950 top-1/2 hover:bg-opacity-75"
          aria-label="Next slide"
        >
          <span className="text-xl font-bold">›</span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div key={card.id} className="flex-shrink-0 w-1/3 px-2">
              <div className="relative overflow-hidden shadow-lg">
                <img
                  src={card.image}
                  alt={`Slide ${card.id}`}
                  className="object-cover w-full transition-transform duration-500 hover:scale-105 h-96"
                />
                <div className="absolute bottom-0 left-0 right-0 block p-4 text-center bg-red-800 lg:hidden text-red-50">
                  <p>{card.caption}</p>
                </div>
                <div className="absolute inset-0 items-center justify-center hidden p-5 text-xl font-semibold text-white transition-opacity duration-500 opacity-0 bg-red-800/70 bg-opacity-60 lg:flex hover:opacity-100">
                  {card.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 p-2 ml-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-r-lg cursor-pointer text-red-950 top-1/2 hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        <span className="text-2xl font-bold">‹</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 p-2 mr-2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-l-lg cursor-pointer text-red-950 top-1/2 hover:bg-opacity-75"
        aria-label="Next slide"
      >
        <span className="text-2xl font-bold">›</span>
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer h-4 w-4 rounded-full ${
              activeIndex === index ? "bg-gray-700" : "bg-gray-300"
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
