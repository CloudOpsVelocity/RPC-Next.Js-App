'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FiX, FiShare2, FiDownload, FiChevronLeft, FiChevronRight, FiPlay, FiPause, FiZoomIn, FiZoomOut } from 'react-icons/fi'
import ReactPlayer from 'react-player'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { GrPowerReset } from 'react-icons/gr'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { galleryStateAtom } from '@/app/store/project/gallery'
import { searchShareAtom } from '@/app/(dashboard)/search/components/SharePopup'
import { imageUrlParser } from '@/app/utils/image'
import GalleryModalContent from './GalleryModalContent'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

export default function MediaGalleryModal() {
const state = useAtomValue(galleryStateAtom)
  return (
   state.opened && (
      <GalleryModalContent />
      )
  )
}