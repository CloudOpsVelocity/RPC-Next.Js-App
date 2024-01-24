import Image from "next/image";
import React from "react";

export default function Feature({ data }: { data: string[] }) {
  return (
    <>
      <div className="w-[90%] mb-[5%]" id="highlights">
        <h2 className="text-[24px] lg:text-[32px] font-semibold">
          HIGHLIGHTS OF <span className="text-green-500">SARANG</span>
        </h2>
        <p className="text-[20px] lg:text-[24px] text-gray-500 mt-1 italic">
          Key Features: Elegant Design, Spacious Layout, Stunning Views, Modern
          Amenities
        </p>
        <ul className="list-inside mt-4 space-y-2 ml-[2%]">
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
                  src={"/project/Checked.png"}
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
