"use client";

import React, { useState } from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import { projectprops, topics } from "../data/projectDetails";
import Button from "../elements/button";
import Image from "next/image";
import ProjBasicDetails from "./projBasicDetails";
import {
  EndDate,
  IdIcon,
  SecurityIcon,
  StartDate,
  TotalLandArea,
} from "../images/commonSvgs";
import PropertyTypeDetailsCrad from "./propertyTypeDetailsCrad";
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

type Props = {};

export default function ProjecctDetails({}: Props) {
  const [currentBlock, setCurrentBlock] = useState("Overview");
  const [currentPhase, setCurrentPhase] = useState("");

  const scrollTopics = (side: string) => {
    console.log(side);
  };

  const phases = [1, 2, 3, 4, 5];

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
        <div className=" flex justify-center items-center w-full ">
          <Image
            src="/auth/arrow.svg"
            alt=""
            className=" rotate-180 "
            width={41}
            height={64}
            onClick={() => scrollTopics("L")}
          />
          <div className="h-[64px] pl-[24px] pr-[24px] w-[100%] bg-[#FCFCFC] shadow-sm flex justify-start items-center overflow-hidden ">
            {topics.map((each, index) => {
              return (
                <Button
                  title={each}
                  onChange={() => setCurrentBlock(each)}
                  buttonClass={` text-[24px]  mr-[40px] whitespace-nowrap ${
                    currentBlock == each
                      ? "text-[#0073C6] font-[700] decoration-solid underline "
                      : "text-[#4D6677] font-[500]"
                  } `}
                />
              );
            })}
          </div>
          <Image
            src="/auth/arrow.svg"
            alt=""
            className=" "
            width={41}
            height={64}
            onClick={() => scrollTopics("R")}
          />
        </div>

        {/* Overview */}
        <Overview />

        {/* About */}
        <div className="w-[90%] mb-[5%]">
          <h1 className="text-[32px] font-[600] text-[#001F35]">
            About{" "}
            <span className="text-[#148B16] font-[700] uppercase">SARANG</span>{" "}
          </h1>
          <ReadMore
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
            maxLines={10}
          />
        </div>

        {/* Property Details */}
        <div className="w-[90%] mb-[5%]">
          <h1 className="text-[32px] font-[600] text-[#001F35]">
            Property Details{" "}
            <span className="text-[#148B16] font-[700] uppercase">SARANG</span>{" "}
          </h1>

          <p className="text-[24px] font-[500] text-[#4D6677]">
            Know about your dream project and its details; Where comfort meets
            Luxury, Where every details matters
          </p>

          <div className=" flex justify-start items-center mt-[2%] mb-[2%]">
            <p className="text-[24px] font-[500] text-[#333] mr-[20px] ">
              Select one of the phase to see project details
            </p>
            <div className=" flex justify-start items-start flex-wrap gap-[10px] ">
              {phases.map((each, index) => {
                return (
                  <Button
                    title={`Phase ${each}`}
                    onChange={() => setCurrentPhase(`${each}`)}
                    buttonClass={` mb-[5px] text-[20px] bg-[#ECF7FF] p-[8px] xl:p-[16px]  whitespace-nowrap text-[#000] rounded-[8px] ${
                      currentPhase == `${each}`
                        ? " font-[600] border-solid border-[1px] border-[#0073C6] "
                        : " font-[400]"
                    } `}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-start items-start flex-wrap w-[80%]  ">
            <ProjBasicDetails
              key="launchDate"
              icon={<EndDate />}
              title="Launch Date"
              value={"12/ 03/ 2023"}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
            />
            <ProjBasicDetails
              key="possessionDate"
              icon={<StartDate />}
              title="Possession Date"
              value={"12/ 03/ 2023"}
              className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
            />
            <ProjBasicDetails
              key="landArea"
              icon={<TotalLandArea />}
              title="Land Area"
              value={"81 Acers"}
              className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
            />
            <ProjBasicDetails
              key="reraStatus"
              icon={<SecurityIcon />}
              title="RERA STATUS"
              value={"New Launch"}
              className="mr-[3%]  mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
            />
            <ProjBasicDetails
              key="reraId"
              icon={<IdIcon />}
              title="RERA ID"
              value={"PRM/KA/RERA/1257/446/PR/180723/006075"}
              className="mr-[3%] mb-[1%] p-[2%] shadow-md rounded-[10px] border-solid border-[1px] border-[#92B2C8]  "
            />
          </div>

          <div className="flex justify-start items-start gap-[4%] flex-wrap mt-[3%] ">
            <PropertyTypeDetailsCrad cg={projectprops.apartment} />
            <PropertyTypeDetailsCrad cg={projectprops.rowHouse} />
            <PropertyTypeDetailsCrad cg={projectprops.villa} />
            <PropertyTypeDetailsCrad cg={projectprops.villament} />
            <PropertyTypeDetailsCrad cg={projectprops.plot} />
          </div>
        </div>

        {/* Floor Plan Block */}
        <FloorplansBlock
          phases={phases}
          setCurrentPhase={setCurrentPhase}
          currentPhase={currentPhase}
        />

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
