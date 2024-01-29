import React, { useState } from "react";
import { Button, Select } from "@mantine/core";
import { LenseIcon } from "../../images/commonSvgs";
import { projectprops } from "../../data/projectDetails";
import { useAtom } from "jotai";
import { selectedFloorAtom } from "@/app/store/floor";

type Props = {
  propCgId: any;
  data: any;
};

type SelectedValues = {
  towerName: string;
  unitNumber: string;
  unitType: string;
  block: string;
  floor: string;
  area: string;
  facingName: string;
  width: string;
  length: string;
};

const Byunitblock: React.FC<Props> = ({ propCgId, data }: Props) => {
  const [, setFloor] = useAtom(selectedFloorAtom);

  const getOptions = (property: string): string[] => {
    return Array.from(new Set(data.map((item: any) => String(item[property]))));
  };
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({
    towerName: "",
    unitNumber: "",
    unitType: "",
    block: "",
    floor: "",
    area: "",
    facingName: "",
    width: "",
    length: "",
  });

  const handleInputChange = (property: keyof SelectedValues, value: string) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [property]: value,
    }));
    handleSearch();
  };

  const handleSearch = () => {
    // Implement your filtering logic here based on selectedValues
    const filteredData = data.filter((item: any) => {
      return Object.keys(selectedValues).every(
        (key) =>
          !selectedValues[key as keyof SelectedValues] ||
          String(item[key]) === selectedValues[key as keyof SelectedValues]
      );
    });
    setFloor(filteredData[0]);
    // Log the filtered data for demonstration purposes
    console.log(filteredData);
  };

  return (
    <div className="p-[3%] w-full flex justify-start flex-col items-start">
      <h3 className="text-[#001F35] text-[20px] lg:text-[24px] font-[500]">
        See floor plan according to your selections
      </h3>
      <div className="w-[90%] flex justify-between items-start flex-wrap gap-[5%]">
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
            onChange={(value) =>
              handleInputChange("towerName", value as string)
            }
          />
        ) : null}

        <Select
          size="md"
          mt="md"
          label="Unit Number"
          className="!w-[46%]"
          placeholder="-- select Unit Number--"
          data={(getOptions("unitNumber") as string[]) || []}
          searchable
          maxDropdownHeight={200}
          onChange={(value) => handleInputChange("unitNumber", value as string)}
        />
        {propCgId !== projectprops.plot && (
          <Select
            size="md"
            mt="md"
            label="Unit Type"
            className="!w-[46%]"
            placeholder="-- select Unit Type --"
            data={getOptions("bhkName")}
            searchable
            maxDropdownHeight={200}
            onChange={(value) => handleInputChange("unitType", value as string)}
          />
        )}

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
            onChange={(value) => handleInputChange("block", value as string)}
          />
        )}

        {propCgId !== projectprops.plot && (
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
            data={(getOptions("floor") as string[]) || []}
            searchable
            maxDropdownHeight={200}
            onChange={(value) => handleInputChange("floor", value as string)}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            size="md"
            mt="md"
            label="Area"
            className="!w-[46%]"
            placeholder="-- select Area --"
            data={(getOptions("superBuildUparea") as string[]) || []}
            searchable
            maxDropdownHeight={200}
            onChange={(value) => handleInputChange("area", value as string)}
          />
        )}
        <Select
          size="md"
          mt="md"
          label="Facing"
          className="!w-[46%]"
          placeholder="-- select facing --"
          data={(getOptions("facingName") as string[]) || []}
          searchable
          maxDropdownHeight={200}
          onChange={(value) => handleInputChange("facingName", value as string)}
        />
        {propCgId == projectprops.plot && (
          <Select
            w={"full"}
            size="md"
            mt="md"
            label="Breadth of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("width")}
            searchable
            maxDropdownHeight={200}
            onChange={(value) => handleInputChange("width", value as string)}
          />
        )}
        {propCgId == projectprops.plot && (
          <Select
            w={"full"}
            size="md"
            mt="md"
            label="length Of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("length")}
            searchable
            maxDropdownHeight={200}
            onChange={(value) => handleInputChange("length", value as string)}
          />
        )}
      </div>

      <div className="w-[90%] flex items-end justify-end mt-[3%]">
        <Button
          leftSection={<LenseIcon />}
          title="Search"
          onClick={handleSearch}
          className="flex items-center justify-center gap-[10px] border-none text-[#FFF] text-[20px] font-[600] bg-[#0073C6] rounded-[10px] p-[6px]"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Byunitblock;
