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
      <div className="w-[90%] scroll-mt-[180px] mb-[5%]" id="highlights">
        <h2 className="text-[20px] lg:text-[32px] font-semibold mb-[10px]">
          Highlights Of{" "}
          <span className="text-[#148B16]  lg:text-[32px] not-italic font-bold leading-[normal]">
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
                  className="max-w-[20px] max-h-[14px] sm:max-h-[20px] mt-1 sm:mt-[9px]"
                  src={"/abc/Checked.png"}
                />
                <p className="text-[12px] sm:text-[20px] lg:text-[24px] m-0 text-[#212C33] font-medium md:font-semibold ">
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
