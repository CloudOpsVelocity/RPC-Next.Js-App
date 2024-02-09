import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox } from "@mantine/core";
import React from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";

export default function PropTypeFilter() {
  const keys = [35, 33, 31, 34, 32];
  return (
    <div className="max-w-[300px] ">
      <ClearAll />
      <div className="p-3">
        {" "}
        <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
          Unit Type
        </h3>
        <div className="flex  mb-[3%] t gap-[4%]  flex-wrap justify-start items-center ">
          {keys.map((keyName, index) => {
            return (
              <Checkbox
                w={130}
                key={index}
                color="green"
                mt={10}
                label={propertyDetailsTypes?.get(keyName)?.name}
                value={propertyDetailsTypes?.get(keyName)?.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
