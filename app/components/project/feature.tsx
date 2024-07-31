import Image from "next/image";
import React from "react";
import SubHeading from "./headings/SubHeading";

export default function Feature({
  data,
  projName,
}: {
  data: string[];
  projName: string;
}) {
  return (
    <>
      <div className="w-[90%] mt-[35px] scroll-mt-[180px] mb-[5%]" id="highlights">
        <h2 className="text-h2 sm:text-[22px] xl:text-[32px]  font-[600] text-[#001F35] mb-[12px] capitalize break-words sm:text-nowrap w-[78%]">
          Highlights Of{" "}
          <span className="text-[#148B16]  font-[700]">
            {projName}
          </span>
        </h2>
        <SubHeading
          text="Key features: Elegant design, spacious layout, stunning views, modern amenities"
          className="mb-[24px] sm:mb-[36px]"
        />

        <ul className="list-inside flex flex-col mt-4  ml-[2%]">
          {data?.map((each, ind) => {
            return (
              <li key={ind} className="  inline-flex gap-[1%] mb-[1%] ">
                <Image
                  width={20}
                  height={20}
                  alt="Checked"
                  className="w-[12px] h-[12px] sm:max-w-[20px] max-h-[14px] sm:max-h-[20px] sm:h-[20px] sm:w-[20px] mt-[3.5px] sm:mt-[10px]"
                  src={"/abc/Checked.png"}
                />
                <p className="text-[12px] sm:text-[18px]  m-0 text-[#212C33] font-medium sm:font-500 ">
                  {each}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
