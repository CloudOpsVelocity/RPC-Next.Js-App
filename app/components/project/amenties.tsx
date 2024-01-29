"use client";
import useAmenities from "@/app/hooks/useAmenities";
import { amenitiesGroupList } from "@/app/images/commonSvgs";
import { readMoreAtom } from "@/app/store/drawer";
import { AmenityList } from "@/app/validations/types/project";
import { Console } from "console";
import { useAtom } from "jotai";
import React from "react";

export default function Amenties({ data }: { data: AmenityList[] }) {
  const { data: amenitiesFromDB, error, isLoading } = useAmenities();
  // const keys = Object.keys(amenitiesFromDB);

  const [{ expanded }, setReadMore] = useAtom(readMoreAtom);
  const handleReadMoreClick = () => {
    setReadMore((prev) => ({
      ...prev,
      expanded: !prev.expanded,
      content: { data: data, amenitiesFromDB: amenitiesFromDB },
      type: "array",
    }));
  };

  return (
    <div className="w-[90%] bg-white py-10 mt-12" id="amenities">
      <div className=" mx-auto px-4">
        <h2 className="text-2xl font-semibold">AMENITIES</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Experience the ultimate in comfort with our amenities
        </p>
        <div className="flex flex-wrap ">
          {data?.map((eachItem, ind) => {
            if (amenitiesGroupList.get(eachItem.id) != null) {
              return (
                <React.Fragment>
                  {amenitiesFromDB != undefined &&
                    amenitiesFromDB != null &&
                    Object.keys(amenitiesFromDB).map((group, ind) => {
                      return (
                        <div key={group + ind}>
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
                                      key={ind}
                                      className="flex items-center rounded-[10px] gap-[8px] shadow-md border-solid border-[1px] mr-[24px] mb-[24px] border-[#a5bfd8] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
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
                    })}
                </React.Fragment>
              );
            }
          })}
          {data && data?.length > 50 && (
            <button
              className="inline-flex items-center justify-center text-[18px] lg:text-[20px] text-[#0073C6] font-[700] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2"
              onClick={handleReadMoreClick}
            >
              {expanded ? "Collapse" : `+ ${data?.length - 50} More`}
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
