/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
import ReactWindowCarousel from "./components/ReactWindowCarousel";
// import Carousel from "./components/Carousel";
import Carousel from "./components/NewCarousel";
type Props = {};

export default function Page({}: Props) {
  const slideData = [
    { title: "Slide 1", description: "This is the first slide" },
    { title: "Slide 2", description: "This is the second slide" },
    { title: "Slide 3", description: "This is the third slide" },
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Optimized Carousel Example</h1>
      <Carousel
  data={slideData}
  renderItem={(item, index) => (
    <div className="text-center bg-gradient-to-r from-green-500 to-blue-500 h-full flex items-center justify-center">
      <h2 className="text-4xl font-bold text-white">{item.title}</h2>
      <p className="text-lg text-white">{item.description}</p>
    </div>
  )}
/>
    </div>
  );
}

// import Carousel from "./carousel";
// export default function CarouselExample() {
//   const items = [
//     <div key="1" className="h-64 rounded-lg bg-blue-500 p-4 text-white">
//       Slide 1
//     </div>,
//     <div key="2" className="h-64 rounded-lg bg-green-500 p-4 text-white">
//       Slide 2
//     </div>,
//     <div key="3" className="h-64 rounded-lg bg-red-500 p-4 text-white">
//       Slide 3
//     </div>,
//     <div key="4" className="h-64 rounded-lg bg-yellow-500 p-4 text-white">
//       Slide 4
//     </div>,
//     <div key="5" className="h-64 rounded-lg bg-purple-500 p-4 text-white">
//       Slide 5
//     </div>,
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="mb-6 text-3xl font-bold">Optimized Carousel Example</h1>
//       <Carousel items={items} desktopSlides={3} mobileSlides={1} />
//     </div>
//   );
// }
