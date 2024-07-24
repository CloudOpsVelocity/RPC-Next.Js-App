import React, { useRef } from "react";
import { Select, Tooltip } from "@mantine/core";
import { DropDownIcon, ImgCarouselIcon } from "../../images/commonSvgs";
import { filterKeysDetails, projectprops } from "../../data/projectDetails";
import { atom, useAtom } from "jotai";
import { selectedFloorAtom } from "@/app/store/floor";
import S from "@/app/styles/Floorplan.module.css";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import Image from "next/image";
import Button from "../atoms/buttons/variansts";

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
            return String(item[property]);
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
  const showClearAll = Object.values(values).some(
    (value) => value !== null && value !== "" && value !== 0
  );
  return (
    <div className="px-[1%] sm:px-[5%] py-[2%] w-full flex justify-start flex-col items-start   ">
      <h3 className="text-[#001F35] sm:text-2xl not-italic font-medium sm:mb-4">
        See floor plan according to your selections
      </h3>
      {isAppliedFilters && (
        <>
          <p className="text-[#001F35] sm:text-lg not-italic font-medium leading-[normal]  mb-2">
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
              className="flex max-w-[90%] scroll-smooth overflow-x-auto overflow-y-hidden scrollbar-hide gap-4"
            >
              {Object.entries(values).map(
                ([key, value]) =>
                  value !== null &&
                  value !== 0 &&
                  value !== "" && (
                    <div
                      className="flex sm:h-[33px]  text-[12px] sm:text-base items-center px-1 sm:px-3 whitespace-nowrap sm:py-1.5 bg-white border border-[#9DB6DC] rounded-[10px]"
                      key={key}
                    >
                      <span className="text-[#148B16] font-semibold">
                        {/* @ts-ignore */}

                        {key === "floor" && value == 0 ? "G" : value}
                      </span>
                      <span className="mx-1.5 text-[#242424]">|</span>
                      <span className="text-[#242424] font-medium capitalize">
                        {filterKeysDetails?.get(key)?.name != undefined
                          ? filterKeysDetails?.get(key)?.name === "Floor" &&
                            (propCgId === 31 || propCgId === 33)
                            ? "Elevation"
                            : filterKeysDetails?.get(key)?.name
                          : key}
                      </span>
                      <button className="ml-2 !w-[14px] !h-[14px]">
                        <Image
                          onClick={() => handleRemoveFilter(key)}
                          src={"/cross.svg"}
                          alt="close"
                          width={14}
                          height={14}
                          className="!w-[14px] !h-[14px]"
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
          </div>
        </>
      )}
      <div className="w-[90%] flex justify-between items-start flex-wrap gap-[5%] pb-2 sm:pb-0">
        {propCgId == projectprops.apartment ||
        propCgId == projectprops.villament ? (
          <Select
            size="md"
            label="Tower"
            className="w-[100%] sm:!w-[46%]"
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
          label="Unit Number"
          className="w-[100%] sm:!w-[46%]"
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
            label="Unit Type"
            className="w-[100%] sm:!w-[46%]"
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
              label="Block"
              className="w-[100%] sm:!w-[46%]"
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
            className="w-[100%] sm:!w-[46%]"
            label={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Elevation"
                : "At Floor"
            }
            placeholder="-- select Floor --"
            data={getOptions("floor").map((item) =>
              item === "0"
                ? { value: "0", label: "G" }
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
            label="Area"
            className="w-[100%] sm:!w-[46%]"
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
          label="Facing"
          className="w-[100%] sm:!w-[46%]"
          placeholder="-- select facing --"
          data={
            (getOptions("facingName").filter(
              (item) => item !== "Don't Know"
            ) as string[]) || []
          }
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
            label="Breadth of Plot"
            className="w-[100%] sm:!w-[46%]"
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
            label="length Of Plot"
            className="w-[100%] sm:!w-[46%]"
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
      <Button
        variant="blue"
        className="sm:text-xl sm:mt-4"
        onClick={handleReset}
        showButton={showClearAll}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default Byunitblock;
