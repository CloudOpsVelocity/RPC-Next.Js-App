/* eslint-disable react/no-array-index-key */
import { useMediaQuery } from '@mantine/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  slidesToShow?: number;
  gap?: number;
  isMobile?: boolean;
  className?:string;
}

export default function NewCarousel<T>({
  data,
  renderItem,
  slidesToShow = 3,
  gap = 24,
}: CarouselProps<T>) {
  const isMobile = useMediaQuery("(max-width: 768px)");
   slidesToShow = isMobile ? 1 : slidesToShow;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, data.length - Math.floor(slidesToShow));

  const next = () => setCurrentIndex((curr) => Math.min(curr + 1, maxIndex));
  const prev = () => setCurrentIndex((curr) => Math.max(curr - 1, 0));

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;


  return (
    <div className="relative group mt-2">
      <div
        ref={containerRef}
        className={`relative overflow-x-auto  scrollbar-hide`}
        style={{ margin: isMobile ? 0 : `0 ${gap / 2}px` }}
      >
        <div
          className={`flex ${isMobile ? '' : 'transition-transform duration-500 ease-out'}`}
          style={
            isMobile
              ? { gap: `${gap}px` }
              : {
                  transform: `translateX(calc(-${currentIndex * (100 / slidesToShow)}% - ${
                    currentIndex * gap
                  }px))`,
                  gap: `${gap}px`,
                }
          }
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex-none ${isMobile ? 'snap-center' : ''}`}
              style={{
                width: `calc(${100 / slidesToShow}% - ${
                  (gap * (slidesToShow - 1)) / slidesToShow
                }px)`,
              }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {!isMobile && (
        <>
          {canGoPrev && (
            <button
              onClick={prev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            >
              <IoChevronBackOutline className="w-6 h-6" />
            </button>
          )}

          {canGoNext && (
            <button
              onClick={next}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            >
              <IoChevronForwardOutline className="w-6 h-6" />
            </button>
          )}

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gray-800 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}