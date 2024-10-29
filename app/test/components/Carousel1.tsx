'use client'

import { useMediaQuery } from '@mantine/hooks';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

interface Slide {
  content: React.ReactNode;
}

interface CarouselProps {
  slides: Slide[];
  renderItem: (slide: Slide, index: number) => React.ReactNode; // Added index as a second argument
  slidesToShow?: number;
  gap?: number;
  itemWidth?: number;
  hideControlsOnMobile?: boolean;
}

const CustomCarousel = ({
  slides,
  renderItem,
  slidesToShow = 1,
  gap = 0,
  itemWidth = 300,
  hideControlsOnMobile = false
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const dragThreshold = 50; // Minimum drag distance to trigger slide change
  const isMobile = useMediaQuery('(max-width: 768px)');

  const moveToSlide = useCallback((index: number) => {
    const maxIndex = Math.max(0, totalSlides - slidesToShow);
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(newIndex);
  }, [totalSlides, slidesToShow]);

  const handlePrev = useCallback(() => {
    moveToSlide(currentIndex - 1);
  }, [currentIndex, moveToSlide]);

  const handleNext = useCallback(() => {
    moveToSlide(currentIndex + 1);
  }, [currentIndex, moveToSlide]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isMobile && carouselRef.current) { // Prevent dragging on mobile
      setIsDragging(true);
      setStartX('touches' in e ? e.touches[0].pageX : e.pageX);
      setScrollLeft(carouselRef.current.scrollLeft);
      setAutoScrollEnabled(false);
    }
  }, [isMobile]);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const walk = (x - startX) * 2; // Adjust the multiplication factor for scroll sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
    carouselRef.current.style.transition = 'none'; // No transition during drag
  }, [isDragging, startX, scrollLeft]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !carouselRef.current) return;
    setIsDragging(false);
    setAutoScrollEnabled(true);

    const slideWidth = itemWidth + gap;
    const dragDistance = carouselRef.current.scrollLeft - scrollLeft;

    carouselRef.current.style.transition = 'scroll-left 0.3s ease-out';

    if (Math.abs(dragDistance) > dragThreshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = currentIndex + direction;
      moveToSlide(newIndex);
    } else {
      carouselRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth',
      });
    }
  }, [isDragging, scrollLeft, itemWidth, gap, currentIndex, moveToSlide]);

  useEffect(() => {
    if (carouselRef.current && autoScrollEnabled) {
      carouselRef.current.scrollTo({
        left: currentIndex * (itemWidth + gap),
        behavior: 'smooth',
      });
    }
  }, [currentIndex, itemWidth, gap, autoScrollEnabled]);

  useEffect(() => {
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    return () => {
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDragEnd]);

  const showNavigation = totalSlides > slidesToShow;

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
        ref={carouselRef}
        style={{
          scrollBehavior: autoScrollEnabled ? 'smooth' : 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={'f'}
            className="flex-shrink-0 snap-center"
            style={{
              width: `${itemWidth}px`,
              marginRight: `${index < totalSlides - 1 ? gap : 0}px`,
            }}
          >
            {renderItem(slide, index)} {/* Pass index to renderItem */}
          </div>
        ))}
      </div>

      {showNavigation && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={handlePrev}
            className={`transition-opacity duration-300 bg-white/80 rounded-full p-2 shadow-md hover:bg-white ${
              currentIndex <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            disabled={currentIndex <= 0}
            aria-label="Previous slide"
          >
            <FaChevronCircleLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className={`transition-opacity duration-300 bg-white/80 rounded-full p-2 shadow-md hover:bg-white ${
              currentIndex >= totalSlides - slidesToShow ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            disabled={currentIndex >= totalSlides - slidesToShow}
            aria-label="Next slide"
          >
            <FaChevronCircleRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
export default CustomCarousel
export  function CarouselExample() {
  const slides = [
    { content: <div className="bg-red-200 flex items-center justify-center text-2xl h-[400px]">Slide 1</div> },
    { content: <div className="bg-blue-200 flex items-center justify-center text-2xl h-[400px]">Slide 2</div> },
    { content: <div className="bg-green-200 flex items-center justify-center text-2xl h-[400px]">Slide 3</div> },
    { content: <div className="bg-yellow-200 flex items-center justify-center text-2xl h-[400px]">Slide 4</div> },
    { content: <div className="bg-purple-200 flex items-center justify-center text-2xl h-[400px]">Slide 5</div> },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Improved Custom Carousel Example</h1>
      <CustomCarousel
        slides={slides}
        renderItem={(slide, index) => (
          <div>
            {/* You can add custom logic based on the slide index or content */}
            {slide.content}
            {/* Example: Adding an index number below the slide */}
            <p className="text-center mt-2">Slide {index + 1}</p>
          </div>
        )}
        slidesToShow={3}
        gap={16}
        itemWidth={300}
      />
    </div>
  );
}
