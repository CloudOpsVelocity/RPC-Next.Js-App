import React from "react";

export default function Amenties() {
  const amenities = [1, 2, 3, 4, , 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <>
      <div className="w-[90%] bg-white py-10 mb-[5%]">
        <div className=" mx-auto px-4">
          <h2 className="text-2xl font-semibold">AMENITIES</h2>
          <p className="text-gray-600 mt-2 mb-6">
            Experience the ultimate in comfort with our amenities
          </p>
          <div className="flex flex-wrap gap-4 ">
            {amenities.map((each, ind) => {
              return (
                <div
                  key={ind}
                  className="flex items-center rounded-[10px] shadow-md border-solid border-[1px] border-[#7cc5f5] px-2.5 py-0.5 w-fit text-[#001F35] font-[500] text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80"
                >
                  Maintenance Staff
                </div>
              );
            })}

            <button className="inline-flex items-center justify-center text-[20px] text-[#0073C6] font-[700] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2">
              + 23 More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
