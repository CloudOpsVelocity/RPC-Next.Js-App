"use client";
import React, { useState } from "react";
import { searchDetails } from "../data/searchDetails";
import Button from "@/app/elements/button";
import {
  fourStarIcon,
  lensSvg,
  miniItemsCrossIcon,
  notificationIcon,
} from "../images/commonSvgs";
import { Checkbox, MultiSelect, Radio, RangeSlider } from "@mantine/core";
import classes from "../styles/search.module.css";
import { propertyDetailsTypes, projectprops } from "../data/projectDetails";
import ClearAll from "./components/ClearAll";
import { SEARCH_FILTER_DATA } from "../data/search";
import { useAtom } from "jotai";
import { searachFilterAtom } from "../store/search";
import useSearchFilters from "../hooks/search";

const FilterPopup = () => {
  const [current, setCurrent] = useState("Project Status");
  const [locality, setLocality] = useState<string[]>([]);
  const propKeys = [35, 33, 31, 34, 32];

  const removeLocality = (index: any) => {
    let oldArray = [...locality];
    oldArray.splice(index, 1);
    setLocality(oldArray);
    console.log(index);
  };
  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    setStatus,
    handleBooleanCheck,
    handleSliderChange,
  } = useSearchFilters();

  return (
    <div className=" flex justify-start items-start w-[70vw] top-[160px] left-[70%]  rounded-[10px] shadow-md bg-[#FFF] ">
      <div className="w-[20%] flex shadow-md justify-start items-center flex-col ">
        <p className=" text-[#000] text-[16px] flex justify-center items-center font-[500] p-[2%] w-full ">
          Quick Filters
        </p>
        <div className="w-full ">
          {searchDetails.map((eachItem, index) => {
            return (
              <Button
                key={index}
                title={eachItem}
                onChange={() => setCurrent(eachItem)}
                buttonClass={` whitespace-nowrap w-full text-[12px] flex flex-row-reverse  justify-end pl-[10%] items-center border-solid border-b-[0.5px] items-start font-[500] p-[2%] h-[31px] gap-[8px] ${
                  current == eachItem
                    ? "text-[#148B16] bg-[#F1F9FF]"
                    : "text-[#202020] bg-[#FCFCFC] "
                } `}
                icon={current == eachItem ? fourStarIcon : ""}
              />
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <ClearAll />
        {/* Right Side Fields Con */}
        <div className="w-full p-[1%] pl-[2%] max-h-[400px] overflow-y-auto pb-[5%] ">
          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] ">
            Property Status
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {SEARCH_FILTER_DATA.projectstatus.map((eachStatus, index) => {
              return (
                <Radio
                  checked={eachStatus.cid == filters.current}
                  value={eachStatus.cid}
                  iconColor="dark.8"
                  color="green"
                  onChange={() => setStatus(eachStatus.cid)}
                  label={eachStatus.Label}
                  name="propertyStatus"
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] ">
            Locality
          </h3>

          {locality.length > 0 && (
            <div className="flex mb-[3%] justify-start items-start gap-[4%]">
              {locality.map((eachLocality, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center items-center p-[1%] rounded-[10px] border-[#92B2C8] border-solid border-[1px]  "
                  >
                    {eachLocality}
                    <span
                      className="cursor-pointer"
                      onClick={() => removeLocality(index)}
                    >
                      {miniItemsCrossIcon}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <MultiSelect
            classNames={{ pill: classes.pill }}
            label=""
            placeholder="Search Locality"
            data={[
              { value: "1", label: "Whitefield" },
              { value: "2", label: "KR Puram" },
            ]}
            searchable
            nothingFoundMessage="Nothing found..."
            value={locality}
            comboboxProps={{ withinPortal: false }}
            onChange={setLocality}
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "50%" }}
          />

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] flex items-center gap-[5px] ">
            Property Type {notificationIcon}
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {propKeys.map((keyName, i) => {
              return (
                <Radio
                  key={i}
                  iconColor="dark.8"
                  color="green"
                  label={propertyDetailsTypes?.get(keyName)?.name}
                  value={propertyDetailsTypes?.get(keyName)?.id}
                  name="propertyType"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() =>
                    setPropTypes(
                      propertyDetailsTypes?.get(keyName)?.id as number
                    )
                  }
                  checked={
                    filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
                  }
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Unit Type
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {SEARCH_FILTER_DATA.bhkDetails.map((eachStatus, index) => {
              return (
                <Checkbox
                  label={eachStatus.title}
                  color="green"
                  key={index}
                  onClick={() =>
                    handleCheckboxClick("unitTypes", eachStatus.value)
                  }
                  checked={filters.unitTypes.includes(eachStatus.value)}
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Area
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            {filters.areaValue[0]} sq.ft - {filters.areaValue[1]} sq.ft
          </p>
          <RangeSlider
            marks={[
              { value: 0, label: "0 sq.ft" },
              { value: 1000, label: "1000 sq.ft" },
              { value: 2000, label: "2000 sq.ft" },
              { value: 3000, label: "3000 sq.ft" },
              { value: 4000, label: "4000 sq.ft" },
              { value: 5000, label: "5000 sq.ft" },
            ]}
            min={0}
            max={5000}
            value={filters.areaValue}
            onChange={(value) => handleSliderChange("areaValue", value)}
            style={{ width: "80%" }}
          />

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            ₹ {filters.bugdetValue[0]} - ₹ {filters.bugdetValue[1]} Cr
          </p>
          <RangeSlider
            key="budgetSlider"
            marks={[
              { value: 0, label: "₹ 0" },
              { value: 1, label: "₹ 1 Cr" },
              { value: 2, label: "₹ 2 Cr" },
              { value: 3, label: "₹ 3 Cr" },
              { value: 4, label: "₹ 4 Cr" },
              { value: 5, label: "₹ 5 Cr+" },
            ]}
            min={0}
            max={5}
            value={filters.bugdetValue}
            onChange={(value) => handleSliderChange("bugdetValue", value)}
            style={{ width: "80%" }}
          />

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] ">
            Bath
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {[...Array(6)].map((x, i) => {
              return (
                <Checkbox
                  key={i}
                  label={`${i == 5 ? "+5" : i + 1} Bath`}
                  color="green"
                  onClick={() => handleCheckboxClick("bathRooms", i + 1)}
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Amenities
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Lift" color="green" />
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] ">
            Parking
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {[...Array(7)].map((x, i) => {
              return (
                <Checkbox
                  key={i}
                  label={`${i == 6 ? "+6" : i + 1}`}
                  color="green"
                  onClick={() => handleCheckboxClick("parkings", i + 1)}
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            RERA
          </h3>
          <Checkbox
            label="RERA Verified"
            color="green"
            mb={"3%"}
            onClick={() => handleBooleanCheck()}
          />

          {/* <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Listed By
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Builder" color="green" />
            <Checkbox label="Agent" color="green" />
            <Checkbox label="Owner" color="green" />
          </div> */}

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] ">
            Builder
          </h3>

          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {locality.map((eachLocality, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center p-[1%] rounded-[10px] border-[#92B2C8] border-solid border-[1px]  "
                >
                  {eachLocality}
                  <span
                    className="cursor-pointer"
                    onClick={() => removeLocality(index)}
                  >
                    {miniItemsCrossIcon}
                  </span>
                </div>
              );
            })}
          </div>

          <MultiSelect
            classNames={{ pill: classes.pill }}
            label=""
            placeholder="Search Locality"
            data={[
              { value: "1", label: "Whitefield" },
              { value: "2", label: "KR Puram" },
            ]}
            searchable
            nothingFoundMessage="Nothing found..."
            value={locality}
            onChange={setLocality}
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "50%" }}
            comboboxProps={{ withinPortal: false }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
