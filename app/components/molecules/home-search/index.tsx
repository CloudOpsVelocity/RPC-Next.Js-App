"use client";
import Image from "next/image";
import { useState } from "react";
const propertyTypes = ["Buy", "Rent", "Plot"];
import Searchbar from "./searchbar";

const HomeSearch = () => {
  const [selectedType, setSelectedType] = useState(propertyTypes[0]);

  return (
    <div className="h-screen max-w-[1920px] w-screen border-2 grid grid-cols-[1.5fr_2fr] gap-2 px-20 ">
      <div className="flex items-center justify-center">
        <Image
          src={"/home-search.svg"}
          alt="home-search"
          height={300}
          width={500}
        />
      </div>
      <div className="flex items-center ">
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
                className={"text-3xl text-left font- text-gray-500"}
              >
                {type}
              </button>
            ))}
          </div>
          <Searchbar />
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
