import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { Checkbox, Radio } from "@mantine/core";
import React from "react";
import ClearAll from "../ClearAll";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import useSearchFilters from "@/app/hooks/search";

export default function PropTypeFilter() {
  const { filters, setPropTypes } = useSearchFilters();
  const keys = [35, 33, 31, 34, 32, 633];
  return (
    <div className="max-w-[300px] ">
      <ClearAll type="propType" />
      <div className="p-3">
        <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
          Unit Type
        </h3>
        <div className="flex  mb-[3%] t gap-[4%]  flex-wrap justify-start items-center ">
          {keys.map((keyName, index) => {
            return (
              <Radio
                key={index}
                iconColor="dark.8"
                color="green"
                label={propertyDetailsTypes?.get(keyName)?.name}
                value={propertyDetailsTypes?.get(keyName)?.id}
                name="propertyType"
                style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                onClick={() =>
                  setPropTypes(propertyDetailsTypes?.get(keyName)?.id as number)
                }
                checked={
                  filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
