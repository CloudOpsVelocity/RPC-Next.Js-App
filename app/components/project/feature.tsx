import React from "react";

export default function Feature({ data }: { data: string[] }) {
  return (
    <>
      <div className="w-[90%] m-[5%]" id="highlights">
        <h2 className="text-[24px] lg:text-[32px] font-semibold">
          HIGHLIGHTS OF <span className="text-green-500">SARANG</span>
        </h2>
        <p className="text-[20px] lg:text-[24px] text-gray-500 mt-1 italic">
          Key Features: Elegant Design, Spacious Layout, Stunning Views, Modern
          Amenities
        </p>
        <ul className="list-inside mt-4 space-y-2 ml-[2%]">
          {data.map((each, ind) => {
            return (
              <li
                key={ind}
                className="flex items-start justify-start gap-[1%] mb-[1%] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500 mt-[4px]"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
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
