import React from "react";

export default function Blogs() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-sky-100 w-full max-w-full  mx-auto h-[500px]">
      {/* Heading */}
      <div className=" justify-center items-center gap-9 flex flex-col pt-[6%]">
        <div className="text-neutral-800 text-5xl font-bold font-['Montserrat'] leading-10 tracking-widest">
          Blogs
        </div>
        <div className=" text-center text-slate-400 text-2xl font-medium  leading-loose tracking-wide">
          Elevate your Real Estate knowledge: Explore insightful blogs and
          videos. Discover market Trends, Buying Tips, Investment Strategies,
          and Homeownership advice on our Informative Platform
        </div>
      </div>
      {/* Grids */}
      <div className="grid grid-rows-3 grid-flow-col gap-4 max-w-[1400px] m-auto">
        <div className="row-span-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
          cupiditate, iure dignissimos quia in dicta laboriosam quae inventore
          optio hic. Aut, autem officiis? Blanditiis deleniti nostrum laborum
          cupiditate esse provident.
        </div>
        <div className="col-span-2 ">02</div>
        <div className="row-span-2 col-span-2 ">03</div>
      </div>
    </div>
  );
}
