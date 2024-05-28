import React, { useEffect, useId, useRef, useState } from "react";
import { Button, Select } from "@mantine/core";
import {
  DropDownIcon,
  ImgCarouselIcon,
  LenseIcon,
} from "../../images/commonSvgs";
import { filterKeysDetails, projectprops } from "../../data/projectDetails";
import { atom, useAtom } from "jotai";
import { selectedFloorAtom } from "@/app/store/floor";
import S from "@/app/styles/Floorplan.module.css";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import Image from "next/image";

type Props = {
  propCgId: any;
  data: any;
  form: any;
};
export const unitFloorsAtom = atom([]);
const Byunitblock: React.FC<Props> = ({
  propCgId,
  data,
  form: { values, setValues, setFieldValue, getInputProps },
}: Props) => {
  const [floorsArray, setFloorsArray] = useAtom(unitFloorsAtom);
  const [, setFloor] = useAtom(selectedFloorAtom);
  const getOptions = (property: string): string[] => {
    const filteredData = data?.filter((item: any) => {
      return Object.keys(values).every(
        (key) =>
          !values[key] ||
          // @ts-ignore
          String(item[key]).toLowerCase() === values[key].toLowerCase()
      );
    });
    if (data[0][property] != undefined) {
      // @ts-ignore
      return Array.from(
        new Set(
          filteredData.map((item: any) => {
            if (
              item.isBasement &&
              (propCgId === 31 || propCgId === 33) &&
              property === "floor"
            ) {
              return `B+G+${item[property]}`;
            } else {
              // Otherwise, return the value as is
              return String(item[property]);
            }
          })
        )
      ).sort();
    } else {
      return [];
    }
  };

  const handleSearch = (key: string) => {
    const keysWithNonNullValues = Object.keys(values).filter(
      (key) => values[key] !== null
    );
    if (keysWithNonNullValues.length === 0) {
      return;
    }
    const filteredData = data.filter((item: any) => {
      return Object.keys(values).every(
        (key) =>
          !values[key] ||
          // @ts-ignore
          String(item[key]).toLowerCase() === values[key].toLowerCase()
      );
    });
    setFloor(filteredData[0]);
    setFloorsArray(filteredData);
    if (
      key === "unitNumber" &&
      filteredData.length > 0 &&
      values["unitNumber"]
    ) {
      const filteredItem = filteredData[0];
      const filteredValues: { [key: string]: string } = {};
      Object.keys(filteredItem).forEach((prop) => {
        filteredValues[prop] = String(filteredItem[prop]);
      });
      setValues(setPropertyValues(filteredValues, propCgId));
    }
  };

  const handleReset = () => {
    setFloor(null);
    // setFloorsArray(data);
    const keys = Object.keys(values);
    keys.forEach((key) => setFieldValue(key, null));
  };
  const handleOnChange = (key: string, value: string) => {
    setFieldValue(key, value);
    let prevObj = values;
    prevObj[key] = value;
    setValues(prevObj);
    handleSearch(key);
  };
  const scrollFiltersRef = useRef<HTMLDivElement>(null);
  const handleArrowClick = (side: "R" | "L"): void => {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };
  const handleRemoveFilter = (key: string) => {
    const keysWithNonNullValues = Object.keys(values).filter(
      (key) => values[key] !== null
    );
    if (keysWithNonNullValues.length === 1) {
      setFieldValue(key, null);
      null;
      setFloor(data);
      return;
    }
    setFieldValue(key, null);
    handleSearch(key);
  };
  const isAppliedFilters =
    Object.values(values).filter((each) => each != null).length > 0;

  return (
    <div className="px-[3%] w-full flex justify-start flex-col items-start   h-full">
      <h3 className="text-[#001F35] text-2xl not-italic font-medium">
        See floor plan according to your selections
      </h3>
      {isAppliedFilters && (
        <>
          <p className="text-[#001F35] text-lg not-italic font-medium leading-[normal] mt-4 mb-2">
            Applied Filters
          </p>
          <div className="flex justify-start items-center w-full h-[35px]   ">
            {/* scroll buttons */}
            {Object.values(values).filter((each) => each != null).length >
              4 && (
              <button
                onClick={() => handleArrowClick("L")}
                className="flex mr-4 h-[32px] w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D2D5D7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            <div
              ref={scrollFiltersRef}
              className="flex max-w-[60%] scroll-smooth overflow-x-auto overflow-y-hidden scrollbar-hide gap-4"
            >
              {Object.entries(values).map(
                ([key, value]) =>
                  value !== null &&
                  value !== 0 &&
                  value !== "" && (
                    <div
                      className="flex h-[33px] items-center px-3 whitespace-nowrap py-1.5 bg-white border border-[#c4f1f9] rounded-full"
                      key={key}
                    >
                      <span className="text-[#57a773] font-semibold">
                        {/* @ts-ignore */}

                        {key === "floor" && value == 0
                          ? "G"
                          : (propCgId === 31 || propCgId === 33) &&
                            key === "floor"
                          ? `G+${value}`
                          : value}
                      </span>
                      <span className="mx-1.5 text-[#6e798c]">|</span>
                      <span className="text-[#6e798c] capitalize">
                        {filterKeysDetails?.get(key)?.name != undefined
                          ? filterKeysDetails?.get(key)?.name === "Floor" &&
                            (propCgId === 31 || propCgId === 33)
                            ? "Elevation"
                            : filterKeysDetails?.get(key)?.name
                          : key}
                      </span>
                      <button className="ml-2 !w-[10px] !h-[10px]">
                        <Image
                          onClick={() => handleRemoveFilter(key)}
                          src={"/cross.svg"}
                          alt="close"
                          width={10}
                          height={10}
                          className="!w-[10px] !h-[10px]"
                        />
                      </button>
                    </div>
                  )
              )}
            </div>

            {/* scroll buttons */}
            {Object.values(values).filter((each) => each != null).length >
              4 && (
              <button
                onClick={() => handleArrowClick("R")}
                className="flex h-[32px] ml-8 w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC]"
              >
                <ImgCarouselIcon />
              </button>
            )}

            {Object.values(values).some(
              (value) => value !== null && value !== "" && value !== 0
            ) && (
              <button
                className="flex whitespace-nowrap items-center px-2.5 border-none py-0.5 w-fit font-[500] text-[18px] lg:text-[20px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-[#FFF] text-secondary-foreground hover:bg-gray-100/80 fnt-[600] text-[#0073C6] underline"
                onClick={handleReset}
              >
                Clear All Filter
              </button>
            )}
          </div>
        </>
      )}
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
            rightSection={<DropDownIcon />}
            maxDropdownHeight={200}
            {...getInputProps("towerName")}
            onChange={(value) => handleOnChange("towerName", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        ) : null}

        <Select
          rightSection={<DropDownIcon />}
          size="md"
          mt="md"
          label="Unit Number"
          className="!w-[46%]"
          placeholder="-- select Unit Number--"
          data={(getOptions("unitNumber") as string[]) || []}
          searchable
          clearable
          maxDropdownHeight={200}
          {...getInputProps("unitNumber")}
          onChange={(value) => handleOnChange("unitNumber", value as string)}
          classNames={{ input: S.input, label: S.labelByBhk, option: S.option }}
        />
        {propCgId !== projectprops.plot && (
          <Select
            rightSection={<DropDownIcon />}
            size="md"
            mt="md"
            label="Unit Type"
            className="!w-[46%]"
            placeholder="-- select Unit Type --"
            data={getOptions("bhkName")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("bhkName")}
            onChange={(value) => handleOnChange("bhkName", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        )}

        {propCgId == projectprops.apartment &&
          getOptions("block").filter((item) => item !== "undefined").length >
            0 && (
            <Select
              rightSection={<DropDownIcon />}
              size="md"
              mt="md"
              label="Block"
              className="!w-[46%]"
              placeholder="-- select Block --"
              data={(getOptions("block") as string[]) || []}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("block")}
              onChange={(value) => handleOnChange("block", value as string)}
              classNames={{
                input: S.input,
                label: S.labelByBhk,
                option: S.option,
              }}
            />
          )}

        {propCgId !== projectprops.plot && (
          <Select
            rightSection={<DropDownIcon />}
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
            data={getOptions("floor").map((item) =>
              item === "0"
                ? { value: "0", label: "G" }
                : propCgId == projectprops.rowHouse ||
                  propCgId == projectprops.villa
                ? {
                    value: item,
                    label: `G+${item}`,
                  }
                : { value: item, label: item }
            )}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("floor")}
            onChange={(value) => handleOnChange("floor", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            rightSection={<DropDownIcon />}
            size="md"
            mt="md"
            label="Area"
            className="!w-[46%]"
            placeholder="-- select Area --"
            data={(getOptions("plotArea") as string[]) || []}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("plotArea")}
            onChange={(value) => handleOnChange("plotArea", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        )}
        <Select
          rightSection={<DropDownIcon />}
          size="md"
          mt="md"
          label="Facing"
          className="!w-[46%]"
          placeholder="-- select facing --"
          data={(getOptions("facingName") as string[]) || []}
          searchable
          maxDropdownHeight={200}
          {...getInputProps("facingName")}
          onChange={(value) => handleOnChange("facingName", value as string)}
          classNames={{ input: S.input, label: S.labelByBhk, option: S.option }}
        />
        {propCgId == projectprops.plot && (
          <Select
            rightSection={<DropDownIcon />}
            w={"full"}
            size="md"
            mt="md"
            label="Breadth of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("width")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("width")}
            onChange={(value) => handleOnChange("width", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        )}
        {propCgId == projectprops.plot && (
          <Select
            rightSection={<DropDownIcon />}
            w={"full"}
            size="md"
            mt="md"
            label="length Of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("length")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("length")}
            onChange={(value) => handleOnChange("length", value as string)}
            classNames={{
              input: S.input,
              label: S.labelByBhk,
              option: S.option,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Byunitblock;
