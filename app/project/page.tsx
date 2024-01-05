import React, { useState } from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import FloorplansBlock from "./floorplansBlock";
import AboutBuilder from "./aboutBuilder";
import GalleryBlock from "./galleryBlock";
import Nearby from "../components/project/nearby";
import Spec from "../components/project/spec";
import Banner from "../components/project/banner";
import Feature from "../components/project/feature";
import Reviews from "../components/project/reviews";
import Amenties from "../components/project/amenties";
import Loans from "../components/project/loans";
import { FaqWithBg } from "../components/project/faq";
import ProjectCarousel from "../components/project/ProjectCard";
import FirstBlock from "../components/project/firstBlock";
import Overview from "../components/project/overview";
import Testimonials from "./testimonials";
import ReadMore from "../components/atoms/readmore";
import About from "../components/project/about";
import Navigation from "../components/project/navigation";

type Props = {};

export default function ProjecctDetails({}: Props) {
  return (
    <div className="w-full">
      <Header />
      <div className="mt-[90px] w-full pb-[2%] flex items-center justify-center flex-col">
        <div className="p-[2%] w-full">
          <p className=" text-[16px] text-[#565D70] font-[500] mb-[1%] ">
            <span>home</span>
            {" > "}
            <span>Project In Bengaluru</span>
            {" > "}
            <span>Project In BTM Layout Bengaluru</span>
            {" > "}
            <span>Sarang By Sumadhura</span>
          </p>

          {/* Top Cover Image Card */}
          <FirstBlock />
        </div>
        {/* Navigations Container */}
        <Navigation />
        {/* Overview */}
        <Overview />
        {/* About */}
        <About
          heading="about"
          projName="sarang"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
      repllllllllll rehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur. Excepteur sint occaecat cupidatatttt non
      proident, sunt in culp a qui officia deserunt mollit anim id est
      laborum por incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
      repllllllllll rehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur. Excepteur sint occaecat cupidatatttt n"
        />
        {/* Property Details */}
        {/* Floor Plan Block */}
        <FloorplansBlock />
        <GalleryBlock />
        {/* About Builder */}
        <AboutBuilder />
        <Nearby />
        <Spec />
        <Banner />
        <Feature />
        <Loans />
        {/* <Why /> */}
        <Amenties />
        {/* Why Buy This */}
        <About
          heading="Why Buy"
          projName="SARANG BY SUMADHURA ?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
      repllllllllll rehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur. Excepteur sint occaecat cupidatatttt non
      proident, sunt in culp a qui officia deserunt mollit anim id est
      laborum por incididunt ut labore et dolore magna aliqua. Ut enim
      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
      repllllllllll rehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur. Excepteur sint occaecat cupidatatttt n"
        />
        <Testimonials />
        <Reviews />
        <FaqWithBg />
        <ProjectCarousel
          type="proj"
          heading="nEAR BY pROJECTS OF sarang by sumadhura"
          content="See what other customers also viewed"
        />
        <ProjectCarousel
          type="prop"
          heading="Projects By Developers"
          content="See what developers has posted"
        />
      </div>

      <Footer />
    </div>
  );
}
