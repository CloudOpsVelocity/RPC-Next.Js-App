"use client";
import React from "react";
import MainCarousel from "../molecules/carousel/main";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import Image from "next/image";
import Button from "../../elements/button";
import { Phone, ReraIcon, shortlistIconSvg } from "@/app/images/commonSvgs";
import { formatCurrency } from "@/app/utils/numbers";
import { formatDate } from "@/app/utils/date";

type Props = {
  type: string;
  title: string;
  projName?: string;
  content: string;
  data?: any;
};

type CardProps = {
  type: string;
  projName?: string;
  cardData?: any;
};

export function ProjectCard({ type, cardData }: CardProps) {
  console.log(type);
  return (
    <>
      <div
        key={cardData.projIdEnc}
        className="border text-card-foreground min-w-[350px] bg-white rounded-lg shadow-md overflow-hidden"
      >
        {type == "proj" && (
          <div className="flex space-y-1.5 p-6 bg-[#f5f5f5] px-4 py-2 justify-between items-center">
            <h3 className="tracking-tight text-[18px] font-[600] text-[#565D70]">
              {cardData.projName}
            </h3>
            <div className="text-xs font-semibold text-right ">
              <span className="text-[16px] font-[700] text-[#148B16]">
                {formatCurrency(cardData.minPrice)}
              </span>{" "}
              -{" "}
              <span className="text-[16px] font-[700] text-[#148B16]">
                {formatCurrency(cardData.maxPrice)}
              </span>
              {/* <p className="text-[12px] font-[600] text-[#00487C] ">
              ₹ 1900/ Price per sqft onwards
            </p> */}
            </div>
          </div>
        )}

        <div className="p-4">
          {type == "proj" && (
            <p className="mb-[-30px] relative z-10 p-[2px] text-[#FFF] text-[14px] font-[700] w-[30%] flex pl-[4px] items-center bg-gradient-to-r from-[#006102] /0 to-[#FFF]/100">
              <ReraIcon />
              RERA
            </p>
          )}

          {type != "proj" && (
            <p className="mb-[-30px] relative z-10 p-[2px] text-[#148B16] text-[14px] font-[700] w-[40%] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100 shadow-md rounded-[18px] border-[#92B2C8] border-[0.5px] border-solid ">
              Ready to move
            </p>
          )}

          <Image
            src="/property.png"
            alt="Sobha Dream Acres"
            className="w-full h-auto mb-4"
            width={300}
            height={150}
          />

          <div className=" flex justify-end items-end w-[95%] ">
            <p className="mt-[-30px] rounded-[10px] relative bottom-[50px] z-10 p-[8px] text-[#0073C6] text-[18px] font-[700] flex pl-[4px] justify-center items-center bg-gradient-to-r from-[#EFF5FF] /0 to-[#F2FAFF]/100">
              <span className=" w-[24px] h-[24px] ">{shortlistIconSvg}</span>
              Shortlist
            </p>
          </div>

          <div className="text-sm">
            {type != "proj" && (
              <p className="text-[18px] font-[600] text-[#303030] mb-[8px] ">
                3BHK Villa for Sale in {cardData.cityName},{" "}
                <span className="text-[18px] font-[700] text-[#148B16] ">
                  {" "}
                  Rs 3.2 Lakh
                </span>{" "}
              </p>
            )}

            {type == "proj" && (
              <p className="text-[14px] mb-[6px] font-[600] text-[#565D70] ">
                Start - End Date:
                <span className="ml-[4px] text-[#001F35]">
                  {formatDate(cardData.launchDate)} -{" "}
                  {formatDate(cardData.possassionDate)}
                </span>
              </p>
            )}

            {cardData.propTypes && 
            <p className="text-[14px] mb-[6px] font-[600] text-[#00487C]">
              {cardData.propTypes.map((eachCity: string) => eachCity)}
            </p>
            }

            {type != "proj" && (
              <p className="text-[16px] mb-[6px] font-[600] text-[#4D6677]">
                Available From: 12/ 02/ 2023
              </p>
            )}

            {cardData.pinCode &&
            <p className="text-[18px] mb-[6px] font-[600] text-[#8791AE]">
              {cardData.city} {cardData.pinCode}
            </p>
            }

            {type != "proj" && (
              <p className="text-[16px] font-[500] text-[#4D6677]">
                Posted by Agent
              </p>
            )}
            <Button
              icon={<Phone />}
              title="Request a Callback"
              buttonClass=" text-[#FFF] mt-[12px] text-[16px] font-[600] bg-[#0073C6] rounded-[5px] shadow-md whitespace-nowrap flex items-center p-[6px]  "
              onChange={() => ""}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectCarousel = ({ type, content, title, projName, data }: Props) => {
  return (
    <div className="w-[100%] mb-[5%]">
      <h2 className="text-[24px] lg:text-[32px] font-semibold uppercase">
        {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
        {title}
        <span className="text-[#148B16] font-[700] uppercase ml-4 ">
          {projName}
        </span>
      </h2>
      <p className="text-gray-500 mt-1 mb-2 text-lg italic ">{content}</p>

      <MainCarousel >
          {data &&
            data?.map((project: any, index: number) => {
              
              return  <CarouselSlide >
                  <ProjectCard key={index} type={type} cardData={project} />
                </CarouselSlide>
            })}
        
      </MainCarousel>
    </div>
  );
};

export default ProjectCarousel;
