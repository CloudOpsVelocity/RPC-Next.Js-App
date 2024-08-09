import React from "react";
import SortBy from "./SortBy";

const NewTabCon = ({ onTabChange, selectedProtype, categoryType, Activities }: any) => {
  return (
    <div className="flex flex-row justify-between items-center  align-middle flex-wrap sm:flex-nowrap max-w-full gap-[3px] md:gap-3 max-w-full  bg-[#e7f5ff] shadow-md px-[1px] md:px-4 md:py-2.5;">
      <div className="flex flex-row w-[80%] sm:w-auto sm:w justify-between items-center  align-middle gap-1 md:gap-3 ">
        {categoryType.map((item: any) => (
          <button
            onClick={() => onTabChange(item.value)}
            className={` text-[12px] sm:text-[14px] font-[600] xl:text-base leading-0  font-montserrat cursor-pointer   ${
              item.value == selectedProtype
                ? "text-blue-500 underline font-semibold md:font-bold"
                : "text-[#242424]"
            }`}
          >
            {" "}
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-row items-center gap-1 md:gap-2 self-end justify-center">
        <h1 className="text-[12px] text-right sm:text-[14px] xl:text-base text-gray-400 font-semibold">
          Sort By:
        </h1>
        <SortBy typeProp={selectedProtype}  ActivitiesType={Activities}/>
      </div>
    </div>
  );
};

export default NewTabCon;
