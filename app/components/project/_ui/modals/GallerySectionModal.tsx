'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FiX, FiShare2, FiDownload, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { GrPowerReset } from 'react-icons/gr'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface MediaGalleryModalProps {
  items: GalleryItem[]
  title: string
}

export default function MediaGalleryModal({ items = [], title = 'Media Gallery' }: MediaGalleryModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const openModal = () => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
    setIsPlaying(false)
  }

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setIsPlaying(false)
  }

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleShare = () => {
    // Implement share functionality
    console.log('Share functionality to be implemented')
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download functionality to be implemented')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return
      if (event.key === 'ArrowRight') nextItem()
      if (event.key === 'ArrowLeft') prevItem()
      if (event.key === 'Escape') closeModal()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const currentItem = items[currentIndex]

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Open Gallery
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* Header */}
          <div className="absolute top-0 left-0 z-[100] right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black to-transparent text-white">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Share"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Download"
              >
                <FiDownload className="w-5 h-5" />
              </button>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Media Preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            {currentItem.type === 'image' ? (
           <TransformWrapper
           initialScale={1}
           initialPositionX={0}
           initialPositionY={0}
         >
           {({ zoomIn, zoomOut, resetTransform ,setTransform}) => (
             <>
               <div className="absolute top-16 left-4 md:top-16 md:left-6 z-10 flex space-x-2 md:space-x-4">
                 <button
                   onClick={() => zoomIn()}
                   className="p-2 md:p-3 bg-[#0073C6] text-white rounded-full shadow-lg hover:bg-[#005bb5] transition-colors duration-300"
                   aria-label="Zoom in"
                 >
                   <FiZoomIn className="w-5 h-5" />
                 </button>
                 <button
                   onClick={() => zoomOut()}
                   className="p-2 md:p-3 bg-[#0073C6] text-white rounded-full shadow-lg hover:bg-[#005bb5] transition-colors duration-300"
                   aria-label="Zoom out"
                 >
                   <FiZoomOut className="w-5 h-5" />
                 </button>
                 <button
                   onClick={() => resetTransform()}
                   className="p-2 md:p-3 bg-[#0073C6] text-white rounded-full shadow-lg hover:bg-[#005bb5] transition-colors duration-300"
                   aria-label="Reset zoom"
                 >
                   <GrPowerReset className="w-5 h-5" />
                 </button>
               </div>
               <TransformComponent wrapperStyle={{
                 width: '100%',
                 height: '100%',
                 position: 'relative',
               }}
               contentStyle={{
                 width: '100%',
                 height: '100%',
                 position: 'relative',
               }}
               >
                <Image
                src={currentItem.src}
                alt={currentItem.alt}
                layout="fill"
                objectFit="contain"
              />
               </TransformComponent>
             </>
           )}
         </TransformWrapper>
          
            ) : (
              <div className="relative w-full h-full">
          <div className="w-full h-full max-h-[calc(100vh-100px)]">
                <ReactPlayer
                  url={currentItem.src}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls
                />
              </div>
              </div>
            )}
            <button
              onClick={prevItem}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
              aria-label="Previous item"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextItem}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
              aria-label="Next item"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
            <div className="flex justify-center">
              <div className="flex overflow-x-auto space-x-2 py-2 max-w-full">
                {items.map((item, index) => (
                  <div
                    key={item.src}
                    className={`relative w-16 h-12 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                      index === currentIndex ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsPlaying(false)
                    }}
                  >
                    {item.type === 'image' ? (
                        
                      <Image
                        src={item.src}
                        alt={item.alt}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <FiPlay className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}