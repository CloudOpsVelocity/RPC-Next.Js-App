"use client";
// import { amenitiesGroupList } from "@/app/images/commonSvgs";
// import { readMoreAtom } from "@/app/store/drawer";
import { AmenityList } from "@/app/validations/types/project";
// import { useAtom } from "jotai";
import React from "react";
import PropertyHeading from "../property/heading";
import { useMediaQuery } from "@mantine/hooks";
import SubHeading from "./headings/SubHeading";
import AmenitiesDisplay from "./_ui/Amenities";

export default function Amenties({
  data,
  type,
  projName,
  amenitiesFromDB,
}: {
  data: AmenityList[];
  type?: string;
  projName: string;
  amenitiesFromDB: any;
}) {
  // const [{ expanded }, setReadMore] = useAtom(readMoreAtom);
  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const maxShow = isMobile ? 6 : 20;
  const shouldShowMore = data && data?.length > maxShow;
  // const handleReadMoreClick = () => {
  //   shouldShowMore &&
  //     setReadMore((prev) => ({
  //       ...prev,
  //       expanded: !prev.expanded,
  //       content: { data: data, amenitiesFromDB: amenitiesFromDB },
  //       type: "array",
  //       title: "Amenities Of",
  //     }));
  // };

  return (
    <div
      className="w-[95%] sm:w-[90%] xl:w-[90%] relative scroll-mt-[130px]  bg-white sm:pt-10 mb-[3%] "
      id="amenities"
    >
      <div className=" mx-auto ">
        {type === "prop" ? (
          <PropertyHeading
            title="Amenities"
            desc="Experience the ultimate in comfort with our amenities"
            className="mb-[10px] sm:mb-[8px]"
          />
        ) : (
          <>
            {" "}
            <h2 className="text-h2 sm:text-[22px] xl:text-[32px] font-[600] text-[#001F35] mb-[12px] capitalize break-words text-wrap w-[78%]">
              Amenities Of{" "}
              <span className="text-[#148B16] font-[700] ">{projName}</span>
            </h2>
            <SubHeading
              text="Experience the ultimate in comfort with our amenities"
              className="text-[13px] sm:text-[16px] xl:text-2xl  text-[#344273]  italic font-semibold leading-[normal] mb-4 sm:mb-2"
            />
          </>
        )}

        <div className="flex flex-wrap sm:mt-4" >
       <AmenitiesDisplay data={data} amenitiesData={amenitiesFromDB} />
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
