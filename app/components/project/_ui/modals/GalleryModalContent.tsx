

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FiX, FiShare2, FiDownload, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { GrPowerReset } from 'react-icons/gr'
import { useAtom, useSetAtom } from 'jotai'
import { galleryStateAtom } from '@/app/store/project/gallery'
import { searchShareAtom } from '@/app/(dashboard)/search/components/SharePopup'
import { imageUrlParser } from '@/app/utils/image'

type Props = {}

export default function GalleryModalContent({}: Props) {
    const [state,dispatch] = useAtom(galleryStateAtom)
    const isOpen = state.opened
const items = state.items;
const title = state.title
  const [currentIndex, setCurrentIndex] = useState(state.activeIndex)
  const [isPlaying, setIsPlaying] = useState(false)
const openSharePopup = useSetAtom(searchShareAtom)
  const closeModal = () => {
    dispatch({
        type:'CLOSE'
    })
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

  const currentItem = items[state.activeIndex]
  const handleShare = () => {
    openSharePopup({
        opened: true,
        title: state.mediaType === 'image' ? 'Share Image' : 'Share Video',
        url: imageUrlParser(currentItem),
    })
  }
  function getYouTubeThumbnailUrl(watchUrl: any) {
    // Match both /watch?v= and /embed/ formats
    const match = watchUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
    );

    const videoId = match ? match[1] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
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
  return (
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
        {/* <button
          onClick={handleDownload}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Download"
        >
          <FiDownload className="w-5 h-5" />
        </button> */}
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
      {state.mediaType === 'image' ? (
     <TransformWrapper
     initialScale={1}
     initialPositionX={0}
     initialPositionY={0}
   >
     {({ zoomIn, zoomOut, resetTransform }) => (
       <>
         <div className="absolute top-16 left-4 md:top-16  z-10 flex space-x-2 md:space-x-4">
           <button
             onClick={() => zoomIn()}
             className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
             aria-label="Zoom in"
           >
             <FiZoomIn className="w-5 h-5" color='white' />
           </button>
           <button
             onClick={() => zoomOut()}
             className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
             aria-label="Zoom out"
           >
             <FiZoomOut className="w-5 h-5" color='white' />
           </button>
           <button
             onClick={() => resetTransform()}
             className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors bg-black"
             aria-label="Reset zoom"
           >
             <GrPowerReset className="w-5 h-5" color='white' />
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
          src={currentItem}
          alt={'ALT TEXT'}
          layout="fill"
          objectFit="contain"
        />
         </TransformComponent>
       </>
     )}
   </TransformWrapper>
    
      ) : (
        <div className="relative w-full h-full">
    <div className={`w-full h-full max-h-[calc(100vh-100px)]`}>
          <ReactPlayer
            url={currentItem}
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
              key={item}
              className={`relative w-16 h-12 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                index === state.activeIndex ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => {
                setCurrentIndex(index)
                setIsPlaying(false)
              }}
            >
              {state.mediaType === 'image' ? (
                <Image
                  src={item}
                  alt={item}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                  item.includes('youtube') ?    <Image
                  src={getYouTubeThumbnailUrl(item ?? '') ?? ''}
                  alt={item}
                  layout="fill"
                  objectFit="cover"
                /> :
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
  )
}