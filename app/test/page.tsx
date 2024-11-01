/* eslint-disable react/no-array-index-key */
"use client";
import React from "react";
import ReactWindowCarousel from "./components/ReactWindowCarousel";
// import Carousel from "./components/Carousel";
import Carousel from "./components/NewCarousel";
type Props = {};

export default function Page({}: Props) {
const getData = (array:number[]) =>{
      for (let i = 0; i < array.length; i++) {
for (let j = 0; j < array.length; j++) {
  const element = array[j];
  
}
      }
    return array
}
console.log(getData([3,5,1,58,765,4,343,23,65]))
  return (
 <div>f</div>
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
