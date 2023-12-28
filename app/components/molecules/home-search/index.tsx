"use client";
import Image from "next/image";
import { useState } from "react";
const propertyTypes = ["Buy", "Rent", "Plot"];
import Searchbar from "./searchbar";

const HomeSearch = () => {
  const [selectedType, setSelectedType] = useState(propertyTypes[0]);

  return (
    <div className="  h-auto md:h-screen max-w-[1920px] w-screen border-2 gap-2 px-20 flex justify-center items-center pb-[30px] pt-[130px] md:p-[0px] ">
      <div className="items-center justify-center hidden md:flex relative h-[463px] md:bottom-[30px] w-[37%]">
        <Image
          src={"/home-search.svg"}
          alt="home-search"
          height={300}
          width={500}
        />
      </div>
      <div className="flex items-center md:w-[60%] lg:w-[60%] w-[100%]">
        <div className="flex-col flex gap-6 w-full">
          <div className="w-[400px] border-2-- grid grid-cols-3 pl-3">
            {propertyTypes.map((type) => (
              <button
                onClick={() => setSelectedType(type)}
                key={type}
                style={
                  selectedType === type
                    ? {
                        color: "#148B16",
                        fontWeight: "bold",
                        textUnderlineOffset: "5px",
                        textDecoration: "underline 3px #148B16 ",
                      }
                    : undefined
                }
                className="text-[#8791AE] text-[26px] md:text-[32px] font-[500] "
              >

                {type}
              </button>
            ))}
          </div>
          <Searchbar />

          <h1 className=" text-[34px] font-[500] text-[#65BB67] m-0">10K+<span className=" text-[32px] font-[500] text-[#767270]"> Active User</span></h1>
          <p className="text-[24px] font-[500] text-[#8791AE]">
          Join our vibrant online community of 10k active users today. Discover endless possibilities, connect, and share experiences like never before.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
