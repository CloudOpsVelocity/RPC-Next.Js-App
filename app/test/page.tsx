/* eslint-disable react/no-array-index-key */
'use client'
import React from 'react'
import ReactWindowCarousel from './components/ReactWindowCarousel'
type Props = {}

export default function Page({}: Props) {
  const slideWidth = 200;
  const slideHeight = 250;

  const initialSlide = 0;

  const slidesList = new Array(5000)
    .fill(0)
    .map((i, index) => <Slide key={index} index={index} />);
  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
        <ReactWindowCarousel
          {...{ initialSlide, slidesList, slideWidth, slideHeight }}
        />
      </div>
  )
}


const Slide = ({ index }:{index:number}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontSize: 30,
        justifyContent: "space-between"
      }}
    >
      <a href={`https://picsum.photos/200/200?i=${index}`} target="_blank">
        <img
          src={`https://picsum.photos/200/200?i=${index}`}
          alt="random"
          title="random"
        />
      </a>
      {index}
    </div>
  );
};