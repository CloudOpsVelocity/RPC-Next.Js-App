"use client";
import { Modal, Select } from "@mantine/core";
import { useRef } from "react";
import {
  DropDownIcon,
  FloorPlanModalIcon,
  ImgCarouselIcon,
  LenseIcon,
  PopupOpenSvg,
  PrevCarouselIcon,
  propertyDetailsSvgs,
} from "@/app/images/commonSvgs";
import S from "@/app/styles/Floorplan.module.css";
import Image from "next/image";
import CarouselModal from "./Carousel";
import { filterKeysDetails, projectprops } from "@/app/data/projectDetails";
import { useFormContext } from "@/app/context/floorplanContext";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { floorPlansArray, selectedFloorAtom } from "@/app/store/floor";
import { useFloorPlanPopup } from "@/app/hooks/useFloorPlanPopup";
import { useSubFloorPlanPopup } from "@/app/hooks/useSubFloorplanPopup";
import clsx from "clsx";
import { setPropertyValues } from "@/app/utils/dyanamic/projects";
import { ImgNotAvail } from "@/app/data/project";
import { Carousel } from "@mantine/carousel";
import styles from "@/app/styles/Carousel.module.css";
import { unitFloorsAtom } from "../byunitblock";
import Button from "../../atoms/buttons/variansts";
import SelectedFilters from "./filters/SelectedFilters";

type Props = {
  propCgId: any;
  data?: any;
  projName?: string;
  form: any;
  floorPlanType: string;
};

function FloorPlanModal({
  propCgId,
  data,
  projName,
  form: unitTypeForm,
  floorPlanType,
}: Props) {
  const [selectedFloor, setSelectedFloor] = useAtom(selectedFloorAtom);
  const [floorsArray, setFloorsArray] = useAtom(floorPlansArray);
  const setUnitsFloor = useSetAtom(unitFloorsAtom);
  const [opened, { close }] = useFloorPlanPopup();
  const form = useFormContext();
  const scrollFiltersRef = useRef<HTMLDivElement>(null);
  const handleArrowClick = (side: "R" | "L"): void => {
    const scrollAmount = side === "R" ? 100 : -100;
    if (scrollFiltersRef.current) {
      scrollFiltersRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleClose = () => {
    close();
    if (!selectedFloor) {
      setSelectedFloor(data[0]);
      setFloorsArray(data);
    }
    if (floorPlanType === "unit") {
      unitTypeForm.setValues(setPropertyValues(selectedFloor, propCgId));
      setUnitsFloor(floorsArray);
    }
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
      floorPlanUrl: filteredData[0]?.floorPlanUrl ?? ImgNotAvail,
    });
    setFloorsArray(filteredData);
  };

  const handleReset = () => {
    setSelectedFloor(null);
    setFloorsArray(data);
    const keys = Object.keys(form.values);
    // dont' do one by one
    // keys.forEach((key) => form.setFieldValue(key, null));
    const resetValues = keys.reduce((acc: any, key) => {
      acc[key] = null;
      return acc;
    }, {});
    form.setValues(resetValues);
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
  const showClearAll = Object.values(form.values).some(
    (value) => value !== null && value !== "" && value !== 0
  );
  if (!opened) {
    return null;
  }
  return (
    <>
      <Modal
        opened={opened}
        classNames={{
          root: S.mainComntainerFloorPlan,
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
          <div className="bg-white w-full h-auto px-1 xl:pl-5">
            <p
              className={`text-[#001F35] text-[13px] xl:text-xl not-italic font-semibold mt-2   ${
                showClearAll ? "mb-2 sm:mb-7" : "mb-0"
              }`}
            >
              See floor plan according to your selections
            </p>

            <SelectedFilters
              form={form}
              propCgId={propCgId}
              projectprops={projectprops}
              showClearAll={showClearAll}
              handleRemoveFilter={handleRemoveFilter}
              filterKeysDetails={filterKeysDetails}
            />

            <div className="flex justify-start items-start gap-5 xl:gap-[45px] flex-col mt-[1.5%] md:flex-row w-full xl:pb-[3%] ">
              <LeftSection
                propCgId={propCgId}
                data={data}
                handleReset={handleReset}
                showClearAll={showClearAll}
              />
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
const LeftSection = ({ propCgId, data, handleReset, showClearAll }: any) => {
  const [, setFloorsArray] = useAtom(floorPlansArray);
  const [, setFloor] = useAtom(selectedFloorAtom);
  const { getInputProps, values, setFieldValue, setValues } = useFormContext();
  const getOptions = (property: string): string[] => {
    const filteredData = data?.filter((item: any) => {
      if (
        item.hasOwnProperty(property) &&
        item[property] !== "null" &&
        item[property] !== "undefined" &&
        item[property] !== "None"
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (filteredData[0][property] != undefined) {
      let options = Array.from(
        new Set(filteredData.map((item: any) => String(item[property])))
      );
      // @ts-ignore
      return options;
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
    setFloor({
      ...filteredData[0],
      floorPlanUrl: filteredData[0]?.floorPlanUrl ?? ImgNotAvail,
    });
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
      <div className="w-[100%] flex justify-between items-start flex-wrap gap-[5%] z-[100000]">
        <Select
          key={"unitNumber"}
          {...(propCgId === 32 && { mt: "md" })}
          w={"full"}
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

        {(propCgId === projectprops.apartment ||
          propCgId === projectprops.villament) && (
          <Select
            key={"towerName"}
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
          getOptions("block").filter(
            (option: string) => option !== undefined && option !== "undefined"
          ).length > 0 && (
            <Select
              key={"block"}
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
            key={
              propCgId == projectprops.rowHouse ||
              propCgId == projectprops.villa
                ? "Elevation"
                : "Floor"
            }
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
                : "Select At Floor"
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

        {propCgId != projectprops.plot && (
          <Select
            key={"bhkName"}
            w={"full"}
            mt="md"
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

        {getOptions("facingName").filter(
          (option: string) => option !== "Don't Know"
        ).length > 0 && (
          <Select
            key={"facingName"}
            w={"full"}
            mt="22px"
            label={`${
              propCgId == projectprops.plot
                ? "Select Plot Facing"
                : "Select Facing"
            } `}
            className="!w-[46%]"
            placeholder="-- select --"
            data={getOptions("facingName").filter(
              (option: string) => option !== "Don't Know"
            )}
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
        )}

        {propCgId != projectprops.plot && (
          <Select
            key={"sba"}
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
            key={"carpet_area"}
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
          getOptions("gardenArea").filter((item) => item !== "undefined")
            .length > 0 && (
            <Select
              key={"gardenArea"}
              w={"full"}
              mt="md"
              label="Select Garden Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("gardenArea").filter(
                (item) => item !== "undefined"
              )}
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
          getOptions("terraceArea").filter(
            (item) => item !== "undefined" && item != "null"
          ).length > 0 && (
            <Select
              key={"terrace Area"}
              w={"full"}
              mt="md"
              label="Select Terrace Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("terraceArea").filter(
                (item) => item !== "undefined" && item != "null"
              )}
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
          getOptions("parkingArea") != undefined &&
          getOptions("parkingArea").filter((item) => item !== "None").length >
            0 && (
            <Select
              key={"parkingarea"}
              w={"full"}
              mt="md"
              label="Select Parking Area"
              className="!w-[46%]"
              placeholder="-- select --"
              data={getOptions("parkingArea").filter(
                (item) => item !== "undefined"
              )}
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
              label="Open/Covered Parking"
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
          propCgId != projectprops.plot &&
          getOptions("totalBalconySize").length > 0 && (
            <Select
              key={"totalBalconySize"}
              w={"full"}
              mt="md"
              label="Select Balcony Size"
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

        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse) && (
          <Select
            key={"plotArea123"}
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
            key={"lengthOfPlot"}
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
            key={"widthOfPlot"}
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
        variant="blue"
        className="text-[14px] xl:!text-lg mt-4"
        onClick={handleReset}
        showButton={showClearAll}
      >
        Clear All Filters
      </Button>
    </div>
  );
};
const RightSection = ({ propCgId }: any) => {
  const data = useAtomValue(selectedFloorAtom);
  return (
    <div className="bg-[#F4FBFF] xl:mt-10 p-6 rounded-lg w-[100%] xl:mb-[10%] xl:w-full max-w-[342px] shadow">
      <div className="space-y-4">
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.unitType}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Unit Type{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data?.bhkName}
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
                <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] capitalize">
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
                  : "At Floor"
              }`}{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data?.floor === 0
                  ? "G"
                  : propCgId === projectprops.rowHouse ||
                    propCgId === projectprops.villa
                  ? `${data?.floor}`
                  : data?.floor}
              </span>{" "}
            </p>
          </div>
        )}

        <div className="flex items-center space-x-3">
          {propertyDetailsSvgs.unitNumber}
          <p className="text-[#4D6677] text-[14px] font-[500]">
            Unit Number{" "}
            <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] capitalize">
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

        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.gardenArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Garden Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.gardenArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data?.terraceArea &&
          data.terraceArea !== "null" && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.caretarea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Terrace Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.terraceArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {(propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse ||
          propCgId == projectprops.villament) &&
          data.parkingArea !== "None" &&
          data.parkingArea && (
            <div className="flex items-center space-x-3">
              {propertyDetailsSvgs.parkingArea}
              <p className="text-[#4D6677] text-[14px] font-[500]">
                Parking Area{" "}
                <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                  {" "}
                  {data.parkingArea} sq.ft
                </span>
              </p>
            </div>
          )}
        {propCgId == projectprops.villament && data?.totalBalconySize && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.parkingArea}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Balcony Size{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.totalBalconySize} sq.ft
              </span>
            </p>
          </div>
        )}
        {(propCgId == projectprops.plot ||
          propCgId == projectprops.villa ||
          propCgId == projectprops.rowHouse) && (
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
        {propCgId != projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.noOfCarParking}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Car Parking{" "}
              <span className="text-[#303A42] text-[14px] ml-[10px] font-[600] ">
                {" "}
                {data.noOfCarParking ? data.noOfCarParking : "N/A"}
              </span>
            </p>
          </div>
        )}

        {propCgId != projectprops.plot &&
          data.parkingType &&
          data.parkingType !== "None" && (
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

        {propCgId != projectprops.plot && data?.totalNumberOfBalcony > 0 && (
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

        {propCgId == projectprops.plot && (
          <div className="flex items-center space-x-3">
            {propertyDetailsSvgs.length}
            <p className="text-[#4D6677] text-[14px] font-[500]">
              Length of Plot{" "}
              <span className="text-[#303A42] ml-[10px] text-[14px] font-[600] ">
                {" "}
                {data.length} .ft
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
                {data.width} .ft
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
  const [selectedFloor, setFloor] = useAtom(selectedFloorAtom);
  const selectImg = (index: number) => {
    // if (selectedFloor?.unitNumber !== floorsArray[index].unitNumber) {
    setFloor({
      ...floorsArray[index],
      floorPlanUrl: floorsArray[index].floorPlanUrl ?? ImgNotAvail,
    });
    setValues(setPropertyValues(floorsArray[index], propCgId));
    handleSearch(index);
    // }
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
      <p className=" w-full  mb-[1%] text-[#001F35] text-[12px] text-center p-2 xl:text-right xl:text-sm not-italic font-medium leading-[normal] tracking-[0.56px] ">
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
              ` | ${
                propCgId == projectprops.rowHouse ||
                propCgId == projectprops.villa
                  ? "Elevation"
                  : "Floor"
              } ` +
                `${
                  selectedFloor?.floor?.toString() === "0" &&
                  propCgId == projectprops.apartment &&
                  propCgId != projectprops.villament
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
      <div className="relative h-[250px]  xl:h-full px-1 w-full flex justify-center items-center border shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)] rounded-[14px] border-solid border-[#7591A6]">
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
            <p className="text-[#303030] font-bold text-[14px] xl:text-2xl not-italic xl:font-medium leading-[normal] tracking-[0.96px] mt-4">
              No Floor Plan Selected
            </p>
            <p className="text-[#303030] text-[12px] xl:text-[15px]  text-center not-italic font-medium leading-[normal] tracking-[0.6px]">
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
          <div className="flex justify-center items-center mb-6 sm:mb-0  mt-4 w-full">
            <Carousel
              align={"start"}
              classNames={styles}
              slideSize={{ base: "50%", sm: "auto" }}
              slideGap={{ base: "16px", sm: "0px" }}
              nextControlIcon={<ImgCarouselIcon />}
              previousControlIcon={<PrevCarouselIcon />}
              className="!max-w-[250px] sm:!max-w-[700px] px-10 h-[60px]"
            >
              {floorsArray?.map((eachObj: any, ind: number) => {
                return (
                  <Carousel.Slide h={60}>
                    <div
                      key={ind}
                      className={clsx(
                        " sm:h-[50px] ml-1.5 sm:ml-10 w-[100px] sm:max-w-[250px] flex justify-center items-center shadow-md  scrollbar-hide rounded-[5px] border-[0.5px] border-solid border-[#92B2C8]",
                        selectedFloor?.floorPlanUrl == eachObj?.floorPlanUrl &&
                          "shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] rounded-[5px] border-2 border-solid border-[#59A1D6]"
                      )}
                    >
                      <Image
                        // @ts-ignore
                        src={
                          eachObj?.floorPlanUrl
                            ? `${eachObj?.floorPlanUrl}?v=${Math.random()}`
                            : ImgNotAvail
                        }
                        alt="Floor Plan"
                        width={57}
                        height={37}
                        className="w-full h-full cursor-pointer rounded-[5px]"
                        style={{ aspectRatio: "100 / 50", objectFit: "cover" }}
                        onClick={() => selectImg(ind)}
                      />
                    </div>
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          </div>
        )}
    </div>
  );
};

export { MiddleSection, RightSection };
