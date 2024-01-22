"use client";
import { QuotesIcon, specificationsList } from "@/app/images/commonSvgs";
import { SpecificationList } from "@/app/validations/types/project";
import { Box, Group, Paper } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
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

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();

  const handleSpecClick = (index: number, obj:any) => {
    if (selectedSpecIndex !== index) {
      setSelectedSpecIndex(index);

      // Move the selected item to the beginning
      const newData = [...specs];
      
      const itemIndex = newData.indexOf(obj);
      if(itemIndex > 0){
        const selectedSpec = newData.splice(itemIndex, 1)[0];
        newData.unshift(selectedSpec);

        setSpecs(newData);
        scrollIntoView();
      }
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
          <p className="text-[16px] lg:text-[22px] text-[#212C33] font-[500] mt-2 mb-4 flex justify-start items-start ">

              <QuotesIcon className="mr-[4px]" />

              <span> Vital Details: Size, Amenities, Features- Unveiling your dream
              project </span>

              <QuotesIcon className="self-end" />
            
          </p>
          <div className="flex flex-wrap gap-4">
            {data?.map((spec, index) => (
              <a
                key={index}
                className={`border px-5 py-2 rounded-lg text-[20px] flex gap-2 bg-[#fafafafa] items-center cursor-pointer ${
                  selectedSpecIndex === index ? "shadow-md text-[#00487C] font-[700]" : "shadow-none text-[#233] font-[500]"
                }`}
                onClick={() => handleSpecClick(index, spec)}
              >
                {specificationsList?.get(spec?.specId)?.url} {spec.specName}
              </a>
            ))}
          </div>
        </div>

        
        <div className="flex-1 bg-gray-50 rounded-lg">
        <Group>
          <Paper ref={scrollableRef} h={539} style={{ overflowY: 'scroll', flex: 1 }}>
            <Box>
              <Paper
                ref={targetRef}
                style={{
                  width: '100%',
                }}
              >

              {specs?.map((spec, index) => (
                <div key={index} id={spec.specName.toLowerCase()} className="p-[2%] w-full items-start justify-start flex-col" >
                  <h1 className={` flex items-center gap-2 text-[#00487C] min-w-[10%] max-w-[50%] text-[24px] italic font-[600] py-2 px-2 rounded-xl ${index == 0 ? "bg-gradient-to-tr from-blue-100" : "bg-transparent"} `}>
                    {specificationsList?.get(spec?.specId)?.url}{" "}
                    <span className="">{spec.specName}</span>
                  </h1>
                  <div>
                    <ul className="list-disc ml-8 grid gap-2 my-2 text-[#233333] text-[20px] font-[500]">
                      {spec.values.map((value, valueIndex) => (
                        <li key={valueIndex}>{value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              </Paper>
          </Box>
        </Paper>
        </Group>
        </div>
        
      </div>
    </div>
  );
}
