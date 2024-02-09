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

const FilterPopup = () => {
  const [current, setCurrent] = useState("Project Status");
  const [locality, setLocality] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 5000]);
  const [sliderBudget, setSliderBudget] = useState<[number, number]>([0, 5]);
  const [propKeys, setPropKeys] = useState([35, 33, 31, 34, 32]);

  const removeLocality = (index: any) => {
    let oldArray = [...locality];
    oldArray.splice(index, 1);
    setLocality(oldArray);
    console.log(index);
  };

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
            <Radio
              iconColor="dark.8"
              color="green"
              label="Ready to Move"
              name="propertyStatus"
              value="check"
            />

            <Radio
              iconColor="dark.8"
              color="green"
              label="New Launch"
              name="propertyStatus"
              value="check"
            />

            <Radio
              iconColor="dark.8"
              color="green"
              label="Under Construction"
              name="propertyStatus"
              value="check"
            />
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
                  name="propertyType"
                  value={propertyDetailsTypes?.get(keyName)?.id}
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Unit Type
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="1 RK" color="green" />
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Area
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            {sliderValue[0]} sq.ft - {sliderValue[1]} sq.ft
          </p>
          <RangeSlider
            defaultValue={sliderValue}
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
            value={sliderValue}
            onChange={setSliderValue}
            style={{ width: "80%" }}
          />

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            ₹ {sliderBudget[0]} - ₹ {sliderBudget[1]} Cr
          </p>
          <RangeSlider
            key="budgetSlider"
            defaultValue={sliderBudget}
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
            value={sliderBudget}
            onChange={setSliderBudget}
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
                />
              );
            })}
          </div>

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            RERA
          </h3>
          <Checkbox label="RERA Verified" color="green" />

          <h3 className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] ">
            Amenities
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Builder" color="green" />
            <Checkbox label="Agent" color="green" />
            <Checkbox label="Owner" color="green" />
          </div>

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
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
