import Image from "next/image";
import React from "react";

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
          HIGHLIGHTS OF{" "}
          <span className="text-[#148B16] text-[0px] lg:text-[32px] not-italic font-bold leading-[normal] uppercase">
            {projName}
          </span>
        </h2>
        <p className="text-[16px] lg:text-[24px] text-gray-500  italic mb-[36px]">
          Key Features: Elegant Design, Spacious Layout, Stunning Views, Modern
          Amenities
        </p>
        <ul className="list-inside mt-4  ml-[2%]">
          {data?.map((each, ind) => {
            return (
              <li
                key={ind}
                className="flex items-center justify-start gap-[1%] mb-[1%] "
              >
                <Image
                  width={20}
                  height={20}
                  className=""
                  alt="Checked"
                  src={"/abc/Checked.png"}
                />
                <p className="text-[20px] lg:text-[24px] m-0 text-[#212C33] font-semibold ">
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
