import React from "react";

type Props = {};

const media = [1, 2, 3, 4, 5];

export default function GalleryBlock({}: Props) {
  return (
    <div className="w-[90%] mb-[5%] h-full ">
      <h1 className="text-[24px] lg:text-[32px] font-[600] text-[#001F35] uppercase">
        gALLERIA of{" "}
        <span className="text-[#148B16] font-[700] uppercase">sarang</span>{" "}
      </h1>

      <p className="text-[20px] lg:text-[24px] font-[500] text-[#4D6677]">
        Gallery Highlights : A Glimpse into good project
      </p>

      <div className=" flex justify-center flex-col md:flex-row items-center-full mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[100%] md:w-[50%] bg-[#dfdcdc] h-[394px] lg:h-[462px] mb-[3%] md:mb-[0%] mr-[3%] rounded-[14px] shadow-md  "></div>
        {/* all media display con */}
        <div className="w-[100%] md:w-[47%]">
          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
            Photos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {media.map((eachImg, ind) => {
              return (
                <div
                  key={ind}
                  className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "
                ></div>
              );
            })}
          </div>

          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-[2%] ">
            Videos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            <div className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "></div>
            <div className="w-[110px] lg:w-[152px] h-[68px] lg:h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
