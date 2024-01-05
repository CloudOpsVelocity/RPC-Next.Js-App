import React from "react";

type Props = {};

const media = [1, 2, 3, 4, 5];

export default function GalleryBlock({}: Props) {
  return (
    <div className="w-[90%] mb-[5%] h-[462px] ">
      <h1 className="text-[32px] font-[600] text-[#001F35] uppercase">
        gALLERIA of{" "}
        <span className="text-[#148B16] font-[700] uppercase">sarang</span>{" "}
      </h1>

      <p className="text-[24px] font-[500] text-[#4D6677]">
        Gallery Highlights : A Glimpse into good project
      </p>

      <div className=" flex justify-center items-center-full mt-[1%] ">
        {/* IMage display con */}
        <div className="w-[50%] bg-[#dfdcdc] h-[462px] mr-[3%] rounded-[14px] shadow-md  "></div>
        {/* all media display con */}
        <div className="w-[47%]">
          <h3 className="text-[#737579] font-[600] text-[24px] mb-[2%] ">
            Photos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            {media.map((eachImg, ind) => {
              return (
                <div
                  key={ind}
                  className="w-[152px] h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "
                ></div>
              );
            })}
          </div>

          <h3 className="text-[#737579] font-[600] text-[24px] mb-[2%] ">
            Videos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap ">
            <div className="w-[152px] h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "></div>
            <div className="w-[152px] h-[94px] bg-[#dfdcdc] rounded-[5px] shadow-md mb-[4%] "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
