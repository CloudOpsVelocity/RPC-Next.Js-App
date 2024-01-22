"use client";
import { specificationsList } from "@/app/images/commonSvgs";
import { SpecificationList } from "@/app/validations/types/project";
import React, { useState } from "react";
import { MdOutlineDoorSliding } from "react-icons/md";

export default function Specifications({
  data,
}: {
  data: SpecificationList[];
}) {
  const [specs, setSpecs] = useState<SpecificationList[]>(data);
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(
    null
  );

  const handleSpecClick = (index: number) => {
    if (selectedSpecIndex !== index) {
      setSelectedSpecIndex(index);

      // Move the selected item to the beginning
      const newData = [...specs];
      const selectedSpec = newData.splice(index, 1)[0];
      newData.unshift(selectedSpec);

      setSpecs(newData);
    }
  };

  return (
    <div className="w-[90%] mx-auto mb-[5%] max-h-[539px]" id="specifications">
      <div className="bg-white rounded-lg shadow-md flex overflow-hidden max-h-[539px] ">
        <div className="flex-1 bg-gradient-to-tr from-blue-100 p-8">
          <h2 className="text-[24px] lg:text-[32px] font-semibold">
            SPECIFICATION OF
            <span className="!text-green-600"> SARANG</span>
          </h2>
          <p className="text-[16px] lg:text-[20px] text-gray-600 mt-2 mb-4 flex items-start justify-start">
            <span>
              Vital Details: Size, Amenities, Features- Unveiling your dream
              project
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            {data?.map((spec, index) => (
              <a
                key={index}
                className={`border px-5 py-2 rounded-lg bg-white font-semibold flex gap-2 items-center cursor-pointer ${
                  selectedSpecIndex === index ? "bg-gray-300" : ""
                }`}
                onClick={() => handleSpecClick(index)}
              >
                {specificationsList?.get(spec?.specId)?.url} {spec.specName}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-4 rounded-lg overflow-y-scroll">
          {specs?.map((spec, index) => (
            <div key={index} id={spec.specName.toLowerCase()}>
              <h1 className="bg-gradient-to-tr from-blue-100 flex items-center gap-2 text-xl py-2 px-2 rounded-xl">
                {specificationsList?.get(spec?.specId)?.url}{" "}
                <span className="">{spec.specName}</span>
              </h1>
              <div>
                <ul className="list-disc ml-8 grid gap-2 my-2">
                  {spec.values.map((value, valueIndex) => (
                    <li key={valueIndex}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
