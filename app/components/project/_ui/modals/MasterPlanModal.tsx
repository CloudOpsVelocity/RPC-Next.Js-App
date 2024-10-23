'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { GrPowerReset } from "react-icons/gr";
import { FiX, FiShare2, FiDownload, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { PopupOpenSvg } from '@/app/images/commonSvgs';

interface ZoomableMasterplanModalProps {
  imageUrl: string
  altText: string
  title: string
}

export default function FullScreenMasterPlanModal({ 
  imageUrl = '/placeholder.svg?height=1080&width=1920', 
  altText = 'Masterplan', 
  title = 'Project Masterplan 2023'
}: ZoomableMasterplanModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)
  
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
  
  const handleShare = () => {
    console.log('Share functionality to be implemented')
  }

  const handleDownload = () => {
    console.log('Download functionality to be implemented')
  }

  return (
    <div>
      <div className='relative max-h-[300px] min-h-[300px] sm:max-h-[600px]: sm:min-h-[600px]'>
    <Image
        src={`${imageUrl}`}
        onClick={openModal}
     fill
        className="cursor-pointer max-h-[600px] object-contain shadow-[0px_4px_30px_0px_rgba(0,0,0,0.25)] rounded-[14px] border-[0.5px] border-solid border-[#D2CDCD] py-4"
        alt={`${title} Master Plan`}
      />
      <button onClick={openModal}>
        <div className="sm:bg-[#F4FBFF] p-[10px] rounded-[29px] gap-[12px] flex justify-end items-center  cursor-pointer absolute bottom-2 right-1 sm:right-4 z-1 mb-[20px] sm:shadow-[0px_4px_12px_0px_rgba(0,0,0,0.40)]">
          <p className="text-[#0073C6] hidden sm:block sm:text-[14px] xl:text-xl not-italic font-semibold leading-[normal] underline capitalize">
            Click on image to open master plan
          </p>
          <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[28px] lg:h-[28px]  " />
        </div>{" "}
      </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex flex-col bg-black bg-opacity-75 backdrop-blur-sm">
          <div ref={modalRef} className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 bg-[#253F59] text-white">
              <div className="flex items-center gap-x-1 sm:gap-x-4">
                <h2 className="text-lg md:text-xl font-bold">{title}</h2>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Share"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Download"
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={closeModal}
                className="flex ml-1 items-center space-x-2 p-2 bg-red-600 text-white font-semibold rounded-full transition-colors hover:bg-red-700"
                aria-label="Close modal"
              >
                   <span className="hidden sm:inline">Close</span>
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-grow relative">
              <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex space-x-2 md:space-x-4">
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
                      <div className="w-full h-full relative">
                        <Image
                          src={imageUrl}
                          alt={altText}
                          layout="fill"
                          objectFit="contain"
                          quality={100}
                        />
                      </div>
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
