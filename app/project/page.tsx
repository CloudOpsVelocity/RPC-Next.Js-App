"use client";

import React, { useState } from "react";
import Footer from "../components/layouts/primary/footer";
import Header from "../components/layouts/primary/header";
import { projectprops, topics } from "../data/projectDetails";
import Button from "../elements/button";
import Image from "next/image";
import ProjBasicDetails from "./projBasicDetails";
import PriceBag, {
  City,
  EndDate,
  IdIcon,
  Locality,
  Phone,
  Pincode,
  ProjectStatus,
  PropertyAvailable,
  SecurityIcon,
  ShearIcon,
  StartDate,
  State,
  TotalLandArea,
  WhatsAppButton,
} from "../images/commonSvgs";
import PropertyTypeDetailsCrad from "./propertyTypeDetailsCrad";
import FloorplansBlock from "./floorplansBlock";
import AboutBuilder from "./aboutBuilder";
import Nearby from "../components/project/nearby";
import Spec from "../components/project/spec";
import Banner from "../components/project/banner";
import Feature from "../components/project/feature";
import Reviews from "../components/project/reviews";

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
          <div
            className={` rounded-[10px] bg-gray-50 h-[680px] bg-cover flex justify-between items-start flex-col p-[2%] `}
          >
            <div>
              <p className="shadow-md rounded-[10px] bg-gradient-to-r p-[8px] from-[#EFF5FF] /0  to-[#F2FAFF]/100 text-[#000] text-[16px] font-[500]">
                Current Project Status:{" "}
                <span className="text-[#148B16] text-[16px] font-[700]">
                  {" "}
                  On-Going
                </span>{" "}
              </p>
              <p className="shadow-md p-[8px] flex justify-center items-center rounded-[20px] bg-[#F3F7FF] text-[#0073C6] text-[14px] font-[600] mt-[13px] max-w-[140px] ">
                <ShearIcon />
                Share Project
              </p>
            </div>
            <div className="w-[100%] justify-between items-start border-solid border-white-500 rounded-[10px] bg-gradient-to-l from-[#EFEFEF] /50 to-[#c3c3c3bd]/50  shadow-md flex flex-row ">
              <div className=" w-[40%] ">
                <p className=" rounded-tl-lg text-center text-[24px] font-[600] text-[#FFF] bg-gradient-to-r w-[122px] from-[#148B16] /50 to-[#00370100]/50">
                  RERA
                </p>

                <div className=" ml-[2%]">
                  <h3 className="text-[32px] font-[700] text-[#00487C]">
                    sarang by sumadhura
                  </h3>
                  <p className="text-[24px] font-[600] text-[#001F35]">
                    Start - End Date:
                    <span className="text-[24px] font-[600] text-[#737579]">
                      {" "}
                      12 March, 2023 - 14 June, 2024
                    </span>
                  </p>
                  <p className="text-[16px] font-[600] text-[#4D6677]">
                    Posted By: Builder
                  </p>
                </div>
              </div>

              <div className="w-[40%] flex justify-end items-end flex-col p-[2%] ">
                <h2 className="text-[32px] font-[700] text-[#001F35]">
                  ₹ 2.52 Cr - ₹ 4.52 Cr
                </h2>
                <p className="text-[24px] font-[600] text-[#00487C] ">
                  ₹ 1900/ Price per sqft onwards
                </p>
                <p className="text-[20px] font-[600] text-[#2A4C70] bg-[#FFF] rounded-[10px] shadow-md p-[8px] ">
                  20 Floors Plans
                </p>
              </div>
            </div>
          </div>
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

        {/* Details Contaioner */}

        <div className="pt-[2%] w-[90%] rounded-[24px] shadow-md mb-[5%] mt-[2%] bg-gradient-to-r from-[#F6F6F6] /0 via-[#FFF] /45 to-[#FEFFFF]/100 ">
          <div className="pl-[2%] pr-[2%] flex justify-between items-center ">
            <div>
              <h2 className="text-[32px] text-[#148B16] font-[700]">
                sarang by sumadhura
              </h2>
              <p className="text-[24px] text-[#505050] font-[500]">
                Folium by Sumadhura, Borewell Rd, Whitefield, Palm Meadows,
                Ramagondanahalli, Bengaluru, Karnataka 560066
              </p>
            </div>
            <div className=" flex justify-center items-end flex-col ">
              <p className="text-[24px] text-[#4D6677] font-[700] whitespace-nowrap">
                4.0 Ratings
              </p>
              <p className="text-[24px] text-[#0073C6] font-[600] decoration-dashed underline whitespace-nowrap ">
                Call now
              </p>
            </div>
          </div>

          <div className="pl-[2%] pr-[2%] flex justify-between items-end w-full mb-[3%] mt-[3%]">
            <div className="flex justify-start items-start flex-wrap w-[80%] ">
              <ProjBasicDetails
                key="propertyAvailable"
                icon={<PropertyAvailable />}
                title="Property Available"
                value={"Apartment, Rowhouse, Villa, Villament, Plot"}
                className="mr-[5%]  pt-[2%]"
              />
              <ProjBasicDetails
                key="projectStatus"
                icon={<ProjectStatus />}
                title="Project Status"
                value={"New Launch"}
                className="mr-[5%]  pt-[2%]"
              />

              <ProjBasicDetails
                key="totalLandArea"
                icon={<TotalLandArea />}
                title="Total Land Area"
                value={"81 Acers"}
                className="mr-[5%]  pt-[2%]"
              />

              <ProjBasicDetails
                key="totalLandArea"
                icon={<TotalLandArea />}
                title="Elevation"
                value={"G +3"}
                className="mr-[5%]  pt-[2%]"
              />

              <ProjBasicDetails
                key="totalLandArea"
                icon={<TotalLandArea />}
                title="Total No: of Units"
                value={"1500 Units"}
                className="mr-[5%]  pt-[2%]"
              />

              <ProjBasicDetails
                key="locality"
                icon={<Locality />}
                title="Locality"
                value={"Whitefield, Bengaluru"}
                className="mr-[5%]  pt-[2%]"
              />

              <ProjBasicDetails
                key="startDate"
                icon={<StartDate />}
                title="Start Date"
                value={"12/ 03/ 2023"}
                className="mr-[5%]  pt-[2%]"
              />
              <ProjBasicDetails
                key="endDate"
                icon={<EndDate />}
                title="End Date"
                value={"12/ 03/ 2023"}
                className="mr-[5%]  pt-[2%]"
              />
            </div>
            <div className=" flex justify-end items-end flex-col ">
              <p className="text-[24px] text-[#0073C6] font-[600] underline decoration-dashed ">
                Add to Compare
              </p>
              <p className="text-[24px] text-[#0073C6] font-[600] underline decoration-dashed ">
                Add to Shortlist
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center w-full flex-row bg-gradient-to-r from-[#EFF5FF] /50 to-[#F2FAFF ]/50 ">
            <PriceBag />

            <div className="flex justify-between items-center w-[100%] flex-row ml-[3%]">
              <div className=" ">
                <p className="text-[#212C33] text-[32px] font-[600]">
                  PRICE RANGE{" "}
                  <span className="text-[#00487C] text-[40px] font-[700]">
                    ₹ 2.52 Cr - ₹ 4.52 Cr
                  </span>
                </p>
                <Button
                  icon={<Phone />}
                  title="Request a Callback"
                  onChange={() => ""}
                  buttonClass=" text-[#FFF] text-[16px] font-[600] bg-[#0073C6]  rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
                />
              </div>

              <WhatsAppButton className="cursor-pointer" onClick={""} />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="w-[90%] mb-[5%]">
          <h1 className="text-[32px] font-[600] text-[#001F35]">
            About{" "}
            <span className="text-[#148B16] font-[700] uppercase">SARANG</span>{" "}
          </h1>
          <p className="text-[24px] font-[500] text-[#233333]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis auteeeee irure dolor in
            repllllllllll rehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatatttt non
            proident, sunt in culp a qui officia deserunt mollit anim id est
            laborum...
            <span className="text-[24px] font-[700] text-[#0073C6]">
              Read More
            </span>
          </p>
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

        {/* About Builder */}
        <AboutBuilder />
        <Nearby />
        <Spec />
        <Banner />
        <Feature />
        {/* <Why /> */}
        <Reviews />
      </div>

      <Footer />
    </div>
  );
}
