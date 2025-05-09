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
    <div className="relative w-full max-w-7xl mx-auto px-3 py-0">
      <div className="relative overflow-hidden h-64 sm:h-80 md:h-96">
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
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-red-800 text-red-50 p-3 text-center">
                <p className="text-sm sm:text-base">{card.caption}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="text-red-950 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-r-lg hover:bg-opacity-75 z-10"
          aria-label="Previous slide"
        >
          <span className="text-xl font-bold">‹</span>
        </button>
        <button
          onClick={nextSlide}
          className="text-red-950 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-1 rounded-l-lg hover:bg-opacity-75 z-10"
          aria-label="Next slide"
        >
          <span className="text-xl font-bold">›</span>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
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
            <div key={card.id} className="w-1/3 flex-shrink-0 px-2">
              <div className="relative overflow-hidden shadow-lg">
                <img
                  src={card.image}
                  alt={`Slide ${card.id}`}
                  className="hover:scale-105 transition-transform duration-500 w-full h-96 object-cover"
                />
                <div className="block lg:hidden absolute bottom-0 left-0 right-0 bg-red-800 text-red-50 p-4 text-center">
                  <p>{card.caption}</p>
                </div>
                <div className="hidden p-5 absolute inset-0 bg-red-800/70 bg-opacity-60 text-white lg:flex items-center justify-center text-xl font-semibold opacity-0 transition-opacity duration-500 hover:opacity-100">
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
        className="text-red-950 cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-r-lg ml-2 hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        <span className="text-2xl font-bold">‹</span>
      </button>
      <button
        onClick={nextSlide}
        className="text-red-950 cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-l-lg mr-2 hover:bg-opacity-75"
        aria-label="Next slide"
      >
        <span className="text-2xl font-bold">›</span>
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 gap-2">
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
