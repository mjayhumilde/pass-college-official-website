import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

const ImageCarousel = ({ images = [], isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  // Reset scale and position when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images?.length]);

  // Lock body scroll when carousel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const goToNext = () => {
    if (images && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (images && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      // Reset zoom
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      // Zoom in
      setScale(2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 bg-opacity-90">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white bg-red-primary bg-opacity-80 rounded-full hover:bg-opacity-100"
      >
        <X size={24} />
      </button>

      {/* Image count indicator */}
      {images && images.length > 0 && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-red-primary bg-opacity-80 text-white rounded-md">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button
          onClick={zoomOut}
          disabled={scale <= 0.5}
          className={`p-2 rounded-full text-white ${
            scale <= 0.5
              ? "bg-gray-500"
              : "bg-red-primary bg-opacity-80 hover:bg-opacity-100"
          }`}
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={zoomIn}
          disabled={scale >= 3}
          className={`p-2 rounded-full text-white ${
            scale >= 3
              ? "bg-gray-500"
              : "bg-red-primary bg-opacity-80 hover:bg-opacity-100"
          }`}
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Navigation arrows */}
      {images && images.length > 0 && currentIndex > 0 && (
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white bg-red-primary bg-opacity-80 rounded-full hover:bg-opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {images && images.length > 0 && currentIndex < images.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white bg-red-primary bg-opacity-80 rounded-full hover:bg-opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Image container */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images && images.length > 0 && images[currentIndex] && (
          <img
            ref={imageRef}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || `Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain select-none cursor-move"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${
                position.y / scale
              }px)`,
              transition: isDragging ? "none" : "transform 0.2s",
            }}
            onDoubleClick={handleDoubleClick}
            draggable="false"
          />
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;
