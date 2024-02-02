"use client";
import { QuotesIcon, specificationsList } from "@/app/images/commonSvgs";
import { SpecificationList } from "@/app/validations/types/project";
import { Box, Group, Paper } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { spec } from "node:test/reporters";
import React, { useState } from "react";
import { MdOutlineDoorSliding } from "react-icons/md";

export default function Specifications({
  data,
  projName,
}: {
  data: SpecificationList[];
  projName: string;
}) {
  const [specs, setSpecs] = useState<SpecificationList[]>(data);
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(0);

  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >();

  const handleSpecClick = (index: number, obj: any) => {
    if (selectedSpecIndex !== index) {
      setSelectedSpecIndex(index);

      const newData = [...specs];

      const itemIndex = newData.indexOf(obj);
      if (itemIndex > 0) {
        const selectedSpec = newData.splice(itemIndex, 1)[0];
        newData.unshift(selectedSpec);

        setSpecs(newData);
        scrollIntoView();
      }
    }
  };

  return (
    <div
      className="w-[90%] scroll-mt-[90px] mx-auto mb-[5%] max-h-[539px]"
      id="specifications"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-h-[539px] ">
        <div className="flex-1 bg-gradient-to-tr from-blue-100 p-8">
          <h2 className="text-[24px] lg:text-[32px] font-semibold mb-[12px]">
            SPECIFICATION OF
            <span className="!text-green-600"> {projName}</span>
          </h2>
          <p className="text-[16px] text-[#212C33] md:text-[22px] italic font-semibold leading-[normal] tracking-[0.88px]  mb-4 flex justify-start items-start ">
            <span>
              {" "}
              Vital Details: Size, Amenities, Features- Unveiling your dream
              project{" "}
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            {data?.map((spec, index) => (
              <a
                key={index}
                className={` px-5 py-2 text-[20px] flex gap-2 bg-[#fafafafa] items-center cursor-pointer rounded-[10px] border-[0.5px] border-solid border-[#76AEFF] ${
                  selectedSpecIndex === index
                    ? "shadow-md text-[#00487C] font-[700]"
                    : "shadow-none text-[#233] font-[500]"
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
            <Paper
              ref={scrollableRef}
              h={539}
              style={{ overflowY: "scroll", flex: 1 }}
            >
              <Box>
                <Paper
                  ref={targetRef}
                  style={{
                    width: "100%",
                  }}
                >
                  {data?.map((spec, index) => (
                    <div
                      key={index}
                      id={spec.specName.toLowerCase()}
                      className="px-[2%] mt-10 w-full items-start justify-start flex-col"
                    >
                      <h1
                        className={` flex items-center gap-2 text-[#00487C] min-w-[10%] max-w-[15%] text-[24px] italic font-[600] py-2 px-2 rounded-xl  ${
                          index == 0 ? "specification" : "bg-transparent"
                        }  `}
                      >
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
