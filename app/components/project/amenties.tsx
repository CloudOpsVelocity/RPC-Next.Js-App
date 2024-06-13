"use client";
import useAmenities from "@/app/hooks/useAmenities";
import { amenitiesGroupList } from "@/app/images/commonSvgs";
import { readMoreAtom } from "@/app/store/drawer";
import { AmenityList } from "@/app/validations/types/project";
import { Console } from "console";
import { useAtom } from "jotai";
import React from "react";
import PropertyHeading from "../property/heading";
import { useMediaQuery } from "@mantine/hooks";
import SubHeading from "./headings/SubHeading";

export default function Amenties({
  data,
  type,
  projName,
}: {
  data: AmenityList[];
  type?: string;
  projName: string;
}) {
  const { data: amenitiesFromDB, error, isLoading } = useAmenities();

  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: { data: data, amenitiesFromDB: amenitiesFromDB },
      type: "array",
      title: "Amenities Of",
    }));
  };
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const maxShow = isMobile ? 6 : 20;
  return (
    <div
      className="w-[90%] scroll-mt-[250px] bg-white pt-10 pb-20 "
      id="amenities"
    >
      <div className=" mx-auto ">
        {type === "prop" ? (
          <PropertyHeading
            title="AMENITIES"
            desc="Experience the ultimate in comfort with our amenities"
            className="mb-[40px]"
          />
        ) : (
          <>
            {" "}
            <h2 className="text-[20px] lg:text-[32px]  font-semibold">
              Amenities Of{" "}
              <span className="text-[#148B16] text-[20px] lg:text-[32px] font-bold not-italic  leading-[normal] ">
                {projName}
              </span>
            </h2>
            <SubHeading
              text="Experience the ultimate in comfort with our amenities"
              className="mt-2 mb-[40px]"
            />
          </>
        )}

        <div className="flex flex-wrap ">
          {data?.slice(0, maxShow).map((eachItem, ind) => {
            if (amenitiesGroupList.get(eachItem.id) != null) {
              return (
                amenitiesFromDB != undefined &&
                amenitiesFromDB != null &&
                Object.keys(amenitiesFromDB).map((group, ind) => {
                  return (
                    <div key={ind}>
                      {amenitiesFromDB != undefined &&
                        amenitiesFromDB != null &&
                        amenitiesFromDB[`${group}`] != undefined &&
                        amenitiesFromDB[`${group}`] != null &&
                        amenitiesFromDB[`${group}`].length != 0 &&
                        amenitiesFromDB[group].map(
                          (eachOne: any, index: number) => {
                            if (eachOne.cid == eachItem.id) {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center  gap-[8px]   mr-[24px] mb-[24px]  px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] focus:ring-offset-2 border rounded-[10px] border-solid border-[#b2e0ff] bg-[#FFF] "
                                >
                                  {amenitiesGroupList.get(eachItem.id)}
                                  {eachOne.constDesc}
                                </div>
                              );
                            }
                          }
                        )}
                    </div>
                  );
                })
              );
            }
          })}
          {data && data?.length > maxShow && (
            <button
              className="inline-flex items-center justify-center text-[18px] lg:text-[20px] text-[#0073C6] font-[700] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 "
              onClick={handleReadMoreClick}
            >
              {expanded ? "" : `+ ${data?.length - maxShow} More`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// {data?.map((each, ind) => {
//   if(amenitiesGroupList.get(each.id) != null){
//   return (
//     <div
//       key={ind}
//       className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#a5bfd8] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
//     >
//       {amenitiesGroupList.get(each.id)}
//       {each.name}
//     </div>
//   )
// }
// })}

{
  /* <div
  key={ind}
  className="customAmenitiesItemsCon"
>
  <div
    id={`displayningAmenityBox_${eachOne.cid}`}
    key={eachOne.cid}
  >
    <span>{group}</span> <span>|</span>{" "}
    <span>{eachOne.constDesc}</span>
  </div>
</div> */
}
