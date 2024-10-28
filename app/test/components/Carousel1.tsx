'use client';

import React, { useState, useRef } from 'react';
import { useDrag } from '@use-gesture/react';
import { useVirtualizer } from '@tanstack/react-virtual';
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
  overscan?: number;
  gap?: number;
  slideWidth?: number;
}

export default function OptimizedCarousel({
  slides,
  renderItem,
  itemHeight,
  slidesToShow = 1,
  fullWidth = true,
  overscan = 5,
  gap = 0,
  slideWidth = 500,
}: CarouselProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = slides.length;
  const effectiveSlideWidth = slideWidth;

  const virtualizer = useVirtualizer({
    count: totalSlides,
    getScrollElement: () => parentRef.current,
    horizontal: true,
    estimateSize: () => slideWidth,
    overscan,
  });

  // Throttled navigation with edge cases handling
  const moveToSlide = useThrottledCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - slidesToShow)));
  }, 100);

  const prev = () => moveToSlide(currentIndex - 1);
  const next = () => moveToSlide(currentIndex + 1);

  const bind = useDrag(
    ({ movement: [mx], direction: [dx], memo = mx }) => {
      if (dx === 1) prev();
      else if (dx === -1) next();
      return memo;
    },
    { axis: 'x', pointer: { touch: true } }
  );

  return (
    <div className="relative w-full overflow-hidden" ref={parentRef}>
      <div
        className="flex transition-transform duration-300 ease-out h-[500px]"
        style={{
          width: `100%`,
          transform: `translateX(-${currentIndex * effectiveSlideWidth}px)`,
          gap: `${gap}px`,
        }}
        {...bind()}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className="flex-shrink-0 sm:p-4"
            style={{
              width: `${slideWidth}px`,
              height: itemHeight,
              touchAction: 'pan-y',
            }}
          >
            {renderItem(slides[virtualRow.index])}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <button
          onClick={prev}
          className={`transition-opacity duration-300 ${
            currentIndex <= 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <CarouseSelArrowIcon className="rotate-180" />
        </button>
        
        <button
          onClick={next}
          className={`transition-opacity duration-300 ${
            currentIndex >= totalSlides - slidesToShow ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <CarouseSelArrowIcon />
        </button>
      </div>
    </div>
  );
}

