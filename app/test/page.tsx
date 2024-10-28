"use client";
// import { indexOf, set } from "lodash";
// import { useEffect, useReducer, useState } from "react";
// import ColorfulProjectBrochures from "./components/Section/ProjectBrochers";
import dynamic from "next/dynamic";
import { getAuthorityNames } from "../utils/api/project";
import Tooltip from "../components/atoms/Tooltip";
import { useRef, useState } from "react";
import VirtualCarousel from "./components/Carousel";
interface Item {
  id: number
  title: string
  color: string
}

const generateItems = (count: number): Item[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }))
}
export default function Page() {
  const items = generateItems(100000) // Generate 100,000 items


  const slides = [
    { id: 1, color: 'bg-red-200', text: 'Slide 1' },
    { id: 2, color: 'bg-blue-200', text: 'Slide 2' },
    { id: 3, color: 'bg-green-200', text: 'Slide 3' },
    { id: 4, color: 'bg-yellow-200', text: 'Slide 4' },
    { id: 5, color: 'bg-purple-200', text: 'Slide 5' },
    { id: 6, color: 'bg-pink-200', text: 'Slide 6' },
    { id: 7, color: 'bg-indigo-200', text: 'Slide 7' },
    { id: 8, color: 'bg-gray-200', text: 'Slide 8' },
  ];

  const renderItem = (slide: { color: string; text: string }) => (
    <div className={`${slide.color} h-64 flex items-center justify-center text-2xl`}>
      {slide.text}
    </div>
  );
  return (
    <div className="w-full mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Virtual Carousel (100,000 items)</h2>
      {/* <CarouselExample /> */}
      {/* <VirtualCarousel 
        items={items}
        renderItem={renderItem}
        itemWidth={250}
        itemHeight={250}
        gap={16}
        overscan={5}
      /> */}
   {/* <Carousel1 slides={slides}  slidesToDrag={2} renderItem={renderItem} /> */}
    </div>
  )
}




