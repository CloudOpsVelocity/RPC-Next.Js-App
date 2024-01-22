import { Select } from "@mantine/core";
import React, { useState } from "react";
import Button from "../../elements/button";
import { LenseIcon } from "../../images/commonSvgs";
import { projectprops } from "../../data/projectDetails";

type Props = {
  propCgId: any;
  data: any;
};

export default function Byunitblock({ propCgId, data }: Props) {
  const uniqueProperties = Array.from(
    new Set(
      data
        .map((item: any) =>
          Object.keys(item).filter((key) => key !== "floorPlanUrl")
        )
        .flat()
    )
  );

  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => item[property])));
  };

  return (
    <div className="p-[3%] w-full flex justify-start flex-col items-start">
      {JSON.stringify(uniqueProperties)}
      <h3 className=" text-[#001F35] text-[20px] lg:text-[24px] font-[500]  ">
        See floor plan according to your selections
      </h3>
      <div className="w-[90%] flex justify-between items-start flex-wrap gap-[5%] ">
        {propCgId == projectprops.apartment ||
        propCgId == projectprops.villament ? (
          <Select
            size="md"
            mt="md"
            label="Tower"
            className="!w-[46%]"
            placeholder="-- select Tower --"
            data={(getOptions("towerName") as string[]) || []}
            searchable
            maxDropdownHeight={200}
          />
        ) : null}

        <Select
          size="md"
          mt="md"
          label="unit Number"
          className="!w-[46%]"
          placeholder="-- select Unit Number--"
          data={(getOptions("unitNumber") as string[]) || []}
          searchable
          maxDropdownHeight={200}
        />

        <Select
          size="md"
          mt="md"
          label="Unit Type"
          className="!w-[46%]"
          placeholder="-- select Unit Type --"
          data={["1", "2", "3", "4", "5"]}
          searchable
          maxDropdownHeight={200}
        />

        {propCgId == projectprops.apartment && (
          <Select
            size="md"
            mt="md"
            label="Block"
            className="!w-[46%]"
            placeholder="-- select Block --"
            data={(getOptions("block") as string[]) || []}
            searchable
            maxDropdownHeight={200}
          />
        )}

        {/* {propCgId != projectprops.plot && (
          <Select
            size="md"
            mt="md"
            className="!w-[46%]"
            label={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Elevation"
                : "Floor"
            }
            placeholder="-- select Floor --"
            data={getOptions("floor") || []}
            searchable
            maxDropdownHeight={200}
          />
        )} */}

        {/* {propCgId == projectprops.plot && (
          <Select
            size="md"
            mt="md"
            label="Area"
            className="!w-[46%]"
            placeholder="-- select Area --"
            data={getOptions("superBuildUparea") || []}
            searchable
            maxDropdownHeight={200}
          />
        )} */}
        <Select
          size="md"
          mt="md"
          label="Facing"
          className="!w-[46%]"
          placeholder="-- select facing --"
          data={getOptions("facingName") || []}
          searchable
          maxDropdownHeight={200}
        />
      </div>

      <div className="w-[90%]  flex items-end justify-end mt-[3%]">
        <Button
          icon={<LenseIcon />}
          title="Search"
          onChange={() => ""}
          buttonClass=" flex items-center justify-center gap-[10px] border-none text-[#FFF] text-[20px] font-[600] bg-[#0073C6] rounded-[10px] p-[6px]  "
        />
      </div>
    </div>
  );
}
