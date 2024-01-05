import React from "react";
import MainCarousel from "../molecules/carousel/main";
import { CarouselSlide } from "@mantine/carousel";

export function ProjectCard() {
  return (
    <>
      <div className="border text-card-foreground min-w-[350px] bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex  space-y-1.5 p-6 bg-[#f5f5f5] px-4 py-2 justify-between items-center">
          <h3 className="tracking-tight text-lg font-semibold text-gray-900">
            Sobha Dream Acres
          </h3>
          <div className="text-xs font-semibold">
            <span className="text-green-600">₹ 2.52 Cr</span> -{" "}
            <span className="text-green-600">₹ 4.52 Cr</span>
            <p className="text-[#00487C] ">₹ 1900/ Price per sqft onwards</p>
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
            <div className="">
              <div className="text-sm font-medium text-gray-800">
                Start - End Date:
              </div>
              <div className="text-sm text-gray-600">
                12 April, 2023 - 24 Mar, 2024
              </div>
            </div>
            <div className="font-medium text-gray-800">
              Apartment, Villa, Villament, Rowhouse
            </div>
            <div className="text-gray-600">
              Devasthanagalu, Varthur, Karnataka 560087
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const ProjectCarousel = () => {
  return (
    <div className="w-[90%] mx-auto mt-[5%] mb-[5%]">
      <h2 className="text-3xl font-semibold">
        <span className="!text-green-600">SARANG BY SUMADHARA </span>
        <span className="">Near BY LOCATIONS</span>
      </h2>
      <p className="text-gray-500 mt-1 mb-2 text-lg italic ">
        Explore near by convernient amenities, entertainment and essesntial
        services
      </p>

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
