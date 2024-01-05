import React from "react";

export default function Feature() {
  const highlights = [1, 2, 3, 4, 5];
  return (
    <>
      <div className="w-[90%] m-[5%]">
        <h2 className="text-2xl font-semibold">
          HIGHLIGHTS OF <span className="text-green-500">SARANG</span>
        </h2>
        <p className="text-md text-gray-500 mt-1 italic">
          Key Features: Elegant Design, Spacious Layout, Stunning Views, Modern
          Amenities
        </p>
        <ul className="list-inside mt-4 space-y-2 ml-[2%]">
          {highlights.map((each, ind) => {
            return (
              <li key={ind} className="flex  items-center gap-[1%] mb-[1%] ">
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
                  className="text-green-500"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <p className="text-[24px] text-[#212C33] font-semibold ">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
