import { Checkbox } from "@mantine/core";
import React from "react";

export default function BhkFilter() {
  return (
    <div>
      
      <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
        Unit Type
      </h3>
      <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
        <Checkbox label="1 RK" color="green" />
      </div>
    </div>
  );
}
