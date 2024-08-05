import React from "react";
import SortBy from "./SortBy";

const NewTabCon = ({ onTabChange, selectedProtype, categoryType, Activities }: any) => {
  return (
    <div className="flex flex-row justify-between items-center  align-middle gap-[3px] md:gap-3  bg-blue-200 shadow-md px-[1px] md:px-4 md:py-2.5;">
      <div className="flex flex-row justify-between items-center  align-middle gap-1 md:gap-3 ">
        {categoryType.map((item: any) => (
          <button
            onClick={() => onTabChange(item.value)}
            className={` text-[12px]  md:text-base leading-0  font-montserrat cursor-pointer   ${
              item.value == selectedProtype
                ? "text-blue-500 underline font-semibold md:font-bold"
                : "text-gray-500"
            }`}
          >
            {" "}
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-row items-center gap-1 md:gap-2 self-end justify-center">
        <h1 className="text-[12px] md:text-base text-gray-400 font-semibold">
          Sort By:
        </h1>
        <SortBy typeProp={selectedProtype}  ActivitiesType={Activities}/>
      </div>
    </div>
  );
};

export default NewTabCon;
