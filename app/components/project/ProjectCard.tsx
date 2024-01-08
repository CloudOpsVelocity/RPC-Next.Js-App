import React from "react";
import MainCarousel from "../molecules/carousel/main";
import { CarouselSlide } from "@mantine/carousel";

type Props = {
  type: string;
  title: string;
  projName?: string;
  content: string;
};

export function ProjectCard() {
  return (
    <>
      <div className="border text-card-foreground min-w-[350px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex space-y-1.5 p-6 bg-[#f5f5f5] px-4 py-2 justify-between items-center">
          <h3 className="tracking-tight text-[18px] font-[600] text-[#565D70]">
            Sobha Dream Acres
          </h3>
          <div className="text-xs font-semibold text-right ">
            <span className="text-[16px] font-[700] text-[#148B16]">
              ₹ 2.52 Cr
            </span>{" "}
            -{" "}
            <span className="text-[16px] font-[700] text-[#148B16]">
              ₹ 4.52 Cr
            </span>
            <p className="text-[12px] font-[600] text-[#00487C] ">
              ₹ 1900/ Price per sqft onwards
            </p>
          </div>
        </div>
        <div className="p-4">
          <img
            src="property.png"
            alt="Sobha Dream Acres"
            className="w-full h-auto mb-4"
            width={300}
            height={150}
            style={{ aspectRatio: "300 / 150", objectFit: "cover" }}
          />
          <div className="text-sm">
            <p className="text-[14px] font-[600] text-[#565D70] ">
              Start - End Date:
              <span className="ml-[4px] text-[#001F35]">
                12 April, 2023 - 24 Mar, 2024
              </span>
            </p>
            <div className="text-[14px] font-[600] text-[#00487C]">
              Apartment, Villa, Villament, Rowhouse
            </div>
            <div className="text-[14px] font-[600] text-[#565D70]">
              Devasthanagalu, Varthur, Karnataka 560087
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectCarousel = ({ type, content, title, projName }: Props) => {
  return (
    <div className="w-[90%] mb-[5%]">
      <h2 className="text-[24px] lg:text-[32px] font-semibold uppercase">
        {/* <span className="!text-green-600">SARANG BY SUMADHARA </span> */}
        {title}
        <span className="text-[#148B16] font-[700] uppercase ml-4 ">
          {projName}
        </span>
      </h2>
      <p className="text-gray-500 mt-1 mb-2 text-lg italic ">{content}</p>

      <MainCarousel>
        <CarouselSlide>
          <ProjectCard />
        </CarouselSlide>
        <CarouselSlide>
          <ProjectCard />
        </CarouselSlide>
        <CarouselSlide>
          <ProjectCard />
        </CarouselSlide>
        <CarouselSlide>
          <ProjectCard />
        </CarouselSlide>
        <CarouselSlide>
          <ProjectCard />
        </CarouselSlide>
      </MainCarousel>
    </div>
  );
};

export default ProjectCarousel;
