'use client';

import React, { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useThrottledCallback } from '@mantine/hooks';
import { CarouseSelArrowIcon } from '@/app/images/HomePageIcons';

interface Slide {
  content: React.ReactNode;
  width?: number;
  height?: number;
}

interface CarouselProps {
  slides: Slide[];
  renderItem: (slide: Slide) => React.ReactNode;
  itemHeight: number;
  slidesToShow?: number;
  fullWidth?: boolean;
  gap?: number;
  slideWidth?: number;
}

export default function OptimizedCarousel({
  slides,
  renderItem,
  itemHeight,
  slidesToShow = 1,
  fullWidth = true,
  gap = 0,
  slideWidth = 500,
}: CarouselProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;

  const moveToSlide = useThrottledCallback((index: number) => {
    if (parentRef.current) {
      const scrollLeft = index * (slideWidth + gap);
      parentRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - slidesToShow)));
    }
  }, 100);

  const prev = () => moveToSlide(currentIndex - 1);
  const next = () => moveToSlide(currentIndex + 1);

  const bind = useDrag(
    ({ movement: [mx], memo = parentRef.current?.scrollLeft ?? 0 }) => {
      if (parentRef.current) {
        parentRef.current.scrollLeft = memo - mx;
      }
      return memo;
    },
    { axis: 'x', pointer: { touch: true } }
  );

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={parentRef}
      style={{
        width: '100%',
        height: `${itemHeight}px`,
        overflowX: 'auto',
        cursor: 'grab',
        userSelect: 'none',
      }}
      {...bind()}
    >
      <div
        className="flex transition-transform duration-300 ease-out gap-x-[gap] scrollbar-hide"
        style={{ width: `calc(${totalSlides * (slideWidth + gap)}px)`, height: '100%' }}
      >
        {/* {slides.map((slide, index) => (
          <div
            // key={index}
            className="flex-shrink-0"
            style={{
              width: `${slideWidth}px`,
              height: '100%',
            }}
          >
            {renderItem(slide)}
          </div>
        ))} */}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-50 min-h-[200px">
        <button
          onClick={prev}
          className={`transition-opacity duration-300 absolute left-0 -translate-x-full ${
            currentIndex <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <CarouseSelArrowIcon className="rotate-180" />
        </button>
        
        <button
          onClick={next}
          className={`transition-opacity duration-300 absolute right-0 translate-x-full ${
            currentIndex >= totalSlides - slidesToShow ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <CarouseSelArrowIcon />
        </button>
      </div>
    </div>
  );
}
