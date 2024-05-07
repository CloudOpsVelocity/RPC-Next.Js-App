import { Modal, Select } from "@mantine/core";
import { useId, useRef } from "react";
import {
  DropDownIcon,
  FloorPlanModalIcon,
  ImgCarouselIcon,
  LenseIcon,
  PopupOpenSvg,
  propertyDetailsSvgs,
} from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
import Button from "@/app/elements/button";
import Image from "next/image";
import CarouselModal from "./Carousel";
import { useState } from "react";
import { filterKeysDetails, projectprops } from "@/app/data/projectDetails";
import { useFormContext } from "@/app/context/floorplanContext";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import clsx from "clsx";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { ImgNotAvail } from "@/app/data/project";

type Props = {
  propCgId: any;
  data?: any;
  projName?: string;
};

function FloorPlanModal({ propCgId, data, projName }: Props) {
  const [selectedFloor, setSelectedFloor] = useAtom(selectedFloorAtom);
  const setFloorsArray = useSetAtom(floorPlansArray);
  const [opened, { close }] = useFloorPlanPopup();
  const scrollFiltersRef = useRef<HTMLDivElement>(null);
  const form = useFormContext();
  const handleArrowClick = (side: "R" | "L"): void => {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleClose = () => {
    close();
    setSelectedFloor(data[0]);
    setFloorsArray(data);
    const keys = Object.keys(form.values);
    keys.forEach((key) => form.setFieldValue(key, null));
  };
  const handleSearch = (excludeKey: string): void => {
    const filteredData = data.filter((item: any) => {
      const matches = Object.entries(form.values).every(([formKey, value]) => {
        if (formKey === excludeKey) {
          return true;
        }
        if (value !== null) {
          // @ts-ignore
          const itemValue = String(item[formKey]).toLowerCase();
          // @ts-ignore
          const formValue = String(value).toLowerCase();
          return itemValue === formValue;
        }
        return true;
      });
      return matches;
    });
    setSelectedFloor({
      ...filteredData[0],
      floorPlanUrl: filteredData[0].floorPlanUrl || ImgNotAvail,
    });
    setFloorsArray(filteredData);
  };
  const handleReset = () => {
    setSelectedFloor(null);
    setFloorsArray(data);
    const keys = Object.keys(form.values);
    keys.forEach((key) => form.setFieldValue(key, null));
  };
  const handleRemoveFilter = (key: string) => {
    const keysWithNonNullValues = Object.keys(form.values).filter(
      (key) => form.values[key] !== null
    );
    if (keysWithNonNullValues.length === 1) {
      form.setFieldValue(key, null);
      setSelectedFloor(null);
      setFloorsArray(data);
      return;
    }
    form.setFieldValue(key, null);
    handleSearch(key);
  };
  const [o, {}] = useSubFloorPlanPopup();
  return (
    <>
      <Modal
        opened={opened}
        classNames={{
          title: S.title,
          close: S.close,
          content: S.content,
          overlay: S.overlay,
          inner: o ? S.hidden : undefined,
        }}
        centered
        onClose={handleClose}
        title="Floor Plan"
        size={"100%"}
      >
        <>
          <div className="bg-white w-full h-auto pl-5">
            <p className="text-[#001F35] text-lg not-italic font-medium leading-[normal] mt-2 mb-7">
              See floor plan according to your selections
            </p>

            <div className="flex justify-start items-center w-full h-[35px] relative bottom-[20px] mb-[-35px] ">
              {/* scroll buttons */}
              {Object.values(form.values).filter((each) => each != null)
                .length > 4 && (
                <button
                  onClick={() => handleArrowClick("L")}
                  className="flex mr-8 h-[32px] w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC] "
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
                {Object.entries(form.values).map(
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
                          {value === "0" && key === "floor" ? "G" : value}
                        </span>
                        <span className="mx-1.5 text-[#6e798c]">|</span>
                        <span className="text-[#6e798c] capitalize">
                          {filterKeysDetails?.get(key)?.name != undefined
                            ? filterKeysDetails?.get(key)?.name
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
              {Object.values(form.values).filter((each) => each != null)
                .length > 4 && (
                <button
                  onClick={() => handleArrowClick("R")}
                  className="flex h-[32px] ml-8 w-[32px] rounded-[50%] items-center justify-center bg-[#FCFCFC]"
                >
                  <ImgCarouselIcon />
                </button>
              )}

              {Object.values(form.values).some(
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

            <div className="flex justify-start items-start gap-[45px] flex-col mt-[1.5%] md:flex-row w-full pb-[3%] ">
              <LeftSection propCgId={propCgId} data={data} />
              <MiddleSection projName={projName} propCgId={propCgId} />
              {selectedFloor && (
                <RightSection propCgId={propCgId} data={data} />
              )}
            </div>
          </div>
        </>
      </Modal>
    </>
  );
}

export default FloorPlanModal;

const LeftSection = ({ propCgId, data }: Props) => {
  const [, setFloorsArray] = useAtom(floorPlansArray);
  const [, setFloor] = useAtom(selectedFloorAtom);
  const { getInputProps, values, setFieldValue, setValues } = useFormContext();

  const getOptions = (property: string): string[] => {
    const filteredData = data?.filter((item: any) => {
      return Object.keys(values).every(
        (key) =>
          !values[key] ||
          String(item[key]).toLowerCase() === values[key].toLowerCase()
      );
    });
    if (data[0][property] != undefined) {
      return Array.from(
        new Set(filteredData.map((item: any) => String(item[property])))
      );
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
          String(item[key]).toLowerCase() === values[key].toLowerCase()
      );
    });

    setFloor(filteredData[0]);
    setFloorsArray(filteredData);
    if (key === "unitNumber" && filteredData.length > 0) {
      const filteredItem = filteredData[0];
      const filteredValues: { [key: string]: string } = {};
      Object.keys(filteredItem).forEach((prop) => {
        filteredValues[prop] = String(filteredItem[prop]);
      });
      setValues(setPropertyValues(filteredValues, propCgId));
    }
  };
  const handleOnChange = (value: string, key: string) => {
    setFieldValue(key, value);
    let prevObj = values;
    prevObj[key] = value;
    setValues(prevObj);
    handleSearch(key);
  };
  return (
    <div className="col-span-1 w-full max-w-[392px] mr-[3%]  ">
      <div className="w-[100%] flex justify-between items-start flex-wrap gap-[5%]">
        {propCgId != projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            // mt="md"
            label="Select Unit Type"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("bhkName")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("bhkName")}
            onChange={(value) => handleOnChange(value as string, "bhkName")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
        {(propCgId === projectprops.apartment ||
          propCgId === projectprops.villament) && (
          <Select
            key={useId()}
            w={"full"}
            // mt="md"
            label="Select Tower"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("towerName")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("towerName")}
            onChange={(value) => handleOnChange(value as string, "towerName")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("block").length > 0 && (
            <Select
              key={useId()}
              w={"full"}
              mt={
                propCgId == projectprops.apartment &&
                propCgId != projectprops.plot
                  ? "md"
                  : "0px"
              }
              label="Select Block"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("block").filter(
                (option: string) =>
                  option !== undefined && option !== "undefined"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("block")}
              onChange={(value) => handleOnChange(value as string, "block")}
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            mt={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "0px"
                : "md"
            }
            label={`${
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Select Elevation"
                : "Select Floor"
            }`}
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("floor").map((item) =>
              item === "0"
                ? { value: "0", label: "G" }
                : { value: item, label: item }
            )}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("floor")}
            onChange={(value) => handleOnChange(value as string, "floor")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        <Select
          key={useId()}
          w={"full"}
          mt="md"
          label="Select Unit Number"
          className="!w-[46%]"
          placeholder="-- select --"
          data={getOptions("unitNumber")}
          searchable
          maxDropdownHeight={200}
          {...getInputProps("unitNumber")}
          onChange={(value) => handleOnChange(value as string, "unitNumber")}
          classNames={{ input: S.input, label: S.label, option: S.option }}
          rightSection={<DropDownIcon />}
        />

        <Select
          key={useId()}
          w={"full"}
          mt="md"
          label={`${
            propCgId == projectprops.plot
              ? "Select Plot Facing"
              : "Select Facing"
          } `}
          className="!w-[46%]"
          placeholder="-- select --"
          data={getOptions("facingName")}
          searchable
          maxDropdownHeight={200}
          {...getInputProps("facingName")}
          onChange={(value) => handleOnChange(value as string, "facingName")}
          classNames={{
            input: S.input,
            label: S.label,
            option: S.option,
            root: S.root,
          }}
          rightSection={<DropDownIcon />}
        />

        {propCgId != projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            mt="md"
            label="Super Built-up Area "
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("superBuildUparea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("superBuildUparea")}
            onChange={(value) =>
              handleOnChange(value as string, "superBuildUparea")
            }
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId != projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            mt="md"
            label="Select Carpet Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("caretarea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("caretarea")}
            onChange={(value) => handleOnChange(value as string, "caretarea")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("gardenArea").length > 0 && (
            <Select
              key={useId()}
              w={"full"}
              mt="md"
              label="Select Garden Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("gardenArea").filter((item) => item !== null)}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("gardenArea")}
              onChange={(value) =>
                handleOnChange(value as string, "gardenArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("terraceArea").length > 0 && (
            <Select
              key={useId()}
              w={"full"}
              mt="md"
              label="Select Terrace Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("terraceArea")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("terraceArea")}
              onChange={(value) =>
                handleOnChange(value as string, "terraceArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.apartment &&
          propCgId != projectprops.plot &&
          getOptions("parkingArea").length > 0 && (
            <Select
              key={useId()}
              w={"full"}
              mt="md"
              label="Select Parking Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("parkingArea")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("parkingArea")}
              onChange={(value) =>
                handleOnChange(value as string, "parkingArea")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot &&
          getOptions("noOfCarParking").filter((item) => item !== "0").length >
            0 && (
            <Select
              key={"#esdfsd"}
              w={"full"}
              mt="md"
              label="Select Car Parking"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("noOfCarParking").filter((item) => item !== "0")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("noOfCarParking")}
              onChange={(value) =>
                handleOnChange(value as string, "noOfCarParking")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId == projectprops.apartment &&
          getOptions("parkingType").filter((item) => item !== "None").length >
            0 && (
            <Select
              key={"#sfgf"}
              w={"full"}
              mt="md"
              label="Open/ Covered Parking"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("parkingType").filter((item) => item !== "None")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("parkingType")}
              onChange={(value) =>
                handleOnChange(value as string, "parkingType")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot &&
          getOptions("totalNumberOfBalcony").filter((item) => item !== "0")
            .length > 0 && (
            <Select
              key={"Iweruhjksdfjk"}
              w={"full"}
              mt="md"
              label="Select Balcony"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("totalNumberOfBalcony").filter(
                (item) => item !== "0"
              )}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("totalNumberOfBalcony")}
              onChange={(value) =>
                handleOnChange(value as string, "totalNumberOfBalcony")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {propCgId != projectprops.plot && (
          <Select
            key={"324sdgsfgf"}
            w={"full"}
            mt="md"
            label="Select Bathroom"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("totalNumberofBathroom")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("totalNumberofBathroom")}
            onChange={(value) =>
              handleOnChange(value as string, "totalNumberofBathroom")
            }
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.villament &&
          propCgId != projectprops.plot && (
            <Select
              key={useId()}
              w={"full"}
              mt="md"
              label="Choose Balcony Size"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("totalBalconySize")}
              searchable
              maxDropdownHeight={200}
              {...getInputProps("totalBalconySize")}
              onChange={(value) =>
                handleOnChange(value as string, "totalBalconySize")
              }
              classNames={{ input: S.input, label: S.label, option: S.option }}
              rightSection={<DropDownIcon />}
            />
          )}

        {(propCgId == projectprops.plot || propCgId == projectprops.villa) && (
          <Select
            key={useId()}
            w={"full"}
            mt="md"
            label="Select Plot Area"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("plotArea")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("plotArea")}
            onChange={(value) => handleOnChange(value as string, "plotArea")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            mt="md"
            label="length Of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("length")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("length")}
            onChange={(value) => handleOnChange(value as string, "length")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}

        {propCgId == projectprops.plot && (
          <Select
            key={useId()}
            w={"full"}
            mt="md"
            label="Breadth of Plot"
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("width")}
            searchable
            maxDropdownHeight={200}
            {...getInputProps("width")}
            onChange={(value) => handleOnChange(value as string, "width")}
            classNames={{ input: S.input, label: S.label, option: S.option }}
            rightSection={<DropDownIcon />}
          />
        )}
      </div>
      <Button
        icon={<LenseIcon />}
        title="Search"
        onChange={handleSearch}
        buttonClass=" flex items-center justify-center gap-[10px] border-none text-[#FFF] text-[20px] font-[600] bg-[#0073C6] rounded-[10px] p-[6px]  mt-10"
      />
    </div>
  );
};
const RightSection = ({ propCgId }: Props) => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="bg-[#F4FBFF] p-6 rounded-lg w-full max-w-[342px] shadow">
      <div className="space-y-4">
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.unitType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Unit Type{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.bhkName}
              </span>
            </p>
          </div>
        )}

        {((data.towerName && propCgId === projectprops.apartment) ||
          propCgId === projectprops.villament) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.towerName}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Tower{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.towerName}
              </span>
            </p>
          </div>
        )}

        {data.block &&
          propCgId == projectprops.apartment &&
          propCgId != projectprops.plot && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.block}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Block{" "}
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                  {" "}
                  {data.block}
                </span>
              </p>
            </div>
          )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.floor}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              {`${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "Floor"
              }`}{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data?.floor === 0 ? "G" : data?.floor}
              </span>{" "}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitNumber}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            Unit Number{" "}
            <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
              {" "}
              {data.unitNumber}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.facingName}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            {`${propCgId == projectprops.plot ? "Plot Facing" : "Facing"} `}{" "}
            <span className="text-[#303A42] text-[14px] font-[600] ml-[10px] ">
              {" "}
              {data.facingName}
            </span>
          </p>
        </div>

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.superBuildUparea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Super Builtup Area{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.superBuildUparea} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.caretarea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Carpet Area{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.caretarea} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Car Parking{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noOfCarParking}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && data.parkingType && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Open/Covered Parking{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {data.parkingType} Parking
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberOfBalcony}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balconies{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberOfBalcony}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.totalNumberofBathroom}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Bathroom{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.totalNumberofBathroom}
              </span>
            </p>
          </div>
        )}

        {(propCgId == projectprops.plot || propCgId == projectprops.villa) && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.plotArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Plot Area{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.plotArea} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.length}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Length of Plot{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.length} sq.ft
              </span>
            </p>
          </div>
        )}

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.width}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Breadth of Plot{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.width} sq.ft
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const MiddleSection = ({ hide = false, projName, propCgId }: any) => {
  const data = useAtomValue(selectedFloorAtom);
  const { setValues } = useFormContext();
  const [floorsArray, setFloorsArray] = useAtom<any>(floorPlansArray);
  const [, { open }] = useSubFloorPlanPopup();
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedFloor, setFloor] = useAtom(selectedFloorAtom);
  const selectImg = (index: number) => {
    setFloor({
      ...floorsArray[index],
      floorPlanUrl: floorsArray[index].floorPlanUrl ?? ImgNotAvail,
    });
    setCurrentImg(index);
    setValues(setPropertyValues(floorsArray[index], propCgId));
    handleSearch(index);
  };
  const handleSearch = (index: number): void => {
    const filteredFloors = floorsArray?.filter(
      (floor: any) => floor.unitNumber === floorsArray[index].unitNumber
    );
    // @ts-ignore
    setFloorsArray(filteredFloors);
  };
  return (
    <div className="flex flex-col justify-center items-start shrink-0 w-full sm:max-w-[300px] md:max-w-[500px] xl:max-w-[686px]">
      <p className="text-[#005DA0] w-full text-right mb-[1%] text-[14px] font-[500] ">
        {selectedFloor && (
          <>
            {projName}
            {propCgId != projectprops.plot &&
              selectedFloor?.bhkName &&
              " | " + selectedFloor?.bhkName}
            {propCgId == projectprops.apartment &&
              selectedFloor?.towerName &&
              selectedFloor?.towerName != "NA" &&
              " | Tower " + selectedFloor?.towerName}
            {propCgId != projectprops.plot &&
              " | Floor " +
                `${
                  selectedFloor?.floor?.toString() === "0"
                    ? "G"
                    : selectedFloor?.floor
                }`}
            {selectedFloor?.unitNumber &&
              " | Unit No. " + selectedFloor?.unitNumber}
            {" | Facing " + selectedFloor?.facingName}
            {propCgId != projectprops.plot &&
              selectedFloor?.superBuildUparea &&
              " | Area. " + selectedFloor?.superBuildUparea + " sq.ft"}
            {propCgId == projectprops.plot &&
              selectedFloor?.plotArea &&
              " | Area. " + selectedFloor?.plotArea + " sq.ft"}
          </>
        )}
      </p>
      <div className="relative  w-full flex justify-center items-center border shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px] border-solid border-[#7591A6]">
        {floorsArray != undefined &&
        floorsArray != null &&
        floorsArray.length > 0 &&
        data?.floorPlanUrl ? (
          <Image
            // @ts-ignore
            src={`${data?.floorPlanUrl}?v=${Math.random()}`}
            alt="Floor Plan"
            height={350}
            width={800}
            className="border-none w-full cursor-pointer"
            style={{ aspectRatio: "800 / 400", objectFit: "contain" }}
            onClick={open}
          />
        ) : (
          <div className="flex justify-center items-center flex-col h-[391px] ">
            <FloorPlanModalIcon />
            <p className="text-[#303030] text-2xl not-italic font-medium leading-[normal] tracking-[0.96px] mt-4">
              No Floor Plan Selected
            </p>
            <p className="text-[#303030] text-[15px] not-italic font-medium leading-[normal] tracking-[0.6px]">
              Please select any floor plan to view details or filter to see
              floor plans
            </p>
          </div>
        )}

        {floorsArray != undefined &&
          floorsArray != null &&
          floorsArray.length > 0 &&
          hide === false &&
          selectedFloor && (
            <button onClick={open}>
              <PopupOpenSvg className="absolute bottom-0 right-0 w-[24px] h-[24px] lg:w-[33px] lg:h-[33px] m-[1%] " />
            </button>
          )}
      </div>

      <CarouselModal projName={projName} propCgId={propCgId} />

      {floorsArray != undefined &&
        floorsArray != null &&
        floorsArray.length > 0 && (
          <div className="flex justify-between items-center mt-4 w-full">
            {floorsArray.length > 5 && (
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="flex w-full justify-center gap-[16px] items-center overflow-x-auto scrollbar-hide">
              {floorsArray?.map((eachObj: any, ind: number) => {
                return (
                  <div
                    key={ind}
                    className={clsx(
                      " h-[50px] w-[70px] flex justify-center items-center shadow-md  scrollbar-hide rounded-[5px] border-[0.5px] border-solid border-[#92B2C8]",
                      selectedFloor?.floorPlanUrl == eachObj?.floorPlanUrl &&
                        "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#59A1D6]"
                    )}
                  >
                    <Image
                      // @ts-ignore
                      src={
                        eachObj?.floorPlanUrl + "?v=" + Math.random() ??
                        ImgNotAvail + "?v=" + Math.random()
                      }
                      alt="Floor Plan"
                      width={57}
                      height={37}
                      className="w-[88px] h-[58px]   cursor-pointer "
                      style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                      onClick={() => selectImg(ind)}
                    />
                  </div>
                );
              })}
            </div>

            {floorsArray.length > 5 && (
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
    </div>
  );
};

export { MiddleSection, RightSection };
