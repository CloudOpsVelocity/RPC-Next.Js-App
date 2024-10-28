import React, { useState, useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

interface CarouselProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  itemWidth?: number
  itemHeight?: number
  gap?: number
  overscan?: number
}

export default function VirtualCarousel<T>({ 
  items, 
  renderItem,
  itemWidth = 250, 
  itemHeight = 250, 
  gap = 16,
  overscan = 5 
}: CarouselProps<T>) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => itemWidth + gap,
    horizontal: true,
    overscan,
  })

  const totalSize = virtualizer.getTotalSize()
  const visibleItems = virtualizer.getVirtualItems()

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: itemWidth + gap,
        behavior: 'smooth',
      })
    }
  }

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -(itemWidth + gap),
        behavior: 'smooth',
      })
    }
  }

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX('touches' in e ? e.touches[0].pageX : e.pageX)
    setScrollLeft(containerRef.current?.scrollLeft || 0)
  }

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
    const currentX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const diff = startX - currentX
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft + diff
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }



  // Adding a `mousedown` event listener to reset `isDragging` when mouse is released
  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false)
    }
   
    window.addEventListener('mousedown', ()=> handleMouseUp)
    return () => window.removeEventListener('mousedown', handleMouseUp)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          width: '100%',
          height: `${itemHeight}px`,
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          style={{
            width: `${totalSize}px`,
            height: '100%',
            position: 'relative',
          }}
        >
          {visibleItems.map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                transform: `translateX(${virtualItem.start}px)`,
                marginRight: `${gap}px`,
              }}
            >
              {renderItem(items[virtualItem.index], virtualItem.index)}
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
