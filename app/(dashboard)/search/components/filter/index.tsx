import React, { useState } from "react";
import Link from "next/link";
import { MultiSelect, RangeSlider, Select } from "@mantine/core";
import classes from "@/app/styles/search.module.css";
import { useQueryState } from "nuqs";
import useSearchFilters from "@/app/hooks/search";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import { useDebouncedValue } from "@mantine/hooks";
import { DropDownIcon } from "@/app/images/commonSvgs";
import Button from "@/app/components/molecules/home-search/button";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import { propertyDetailsTypes } from "@/app/data/projectDetails";

const SearchDrawerHeader = ({ open, close }: any) => {
  const [name, setName] = useQueryState("q");
  const [debounced] = useDebouncedValue(name, 500);
  const { filters, handleSliderChange, setPropTypes, handleCheckboxClick } =
    useSearchFilters();
  const keys = [35, 33, 31, 34, 32];
  const { data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: () => getData(debounced, "full"),
    enabled: !!debounced,
  });
  const onSearchChange = (value: string) => {
    !value ? setName(null) : setName(value);
  };
  return (
    <div className="m-[2%] w-full flex  pl-[2%] gap-[20px] justify-start   relative">
      <p className="text-[16px] text-[#737579] font-[500] mt-3">
        <span>Home</span> {" > "}
        <Link href={"/project/banglore"}>
          <span className="text-[16px] text-[#4D6677] font-[600]">
            Properties for Sell in Bengaluru
          </span>
        </Link>{" "}
      </p>
      <div className="w-[789px] h-[379px] shrink-0 border rounded-[10px] border-solid border-[#A0D7FF]">
        <div className="  gap-[8px] px-[8px] border-[1px] border-solid flex items-center justify-between ">
          <div className="gap-[8px]  flex items-center">
            {" "}
            <Select
              label=""
              placeholder="Select"
              data={["Buy", "Rent", "Plot"]}
              classNames={{ input: classes.wrapperSelect }}
              defaultValue={"Buy"}
              rightSection={<DropDownIcon />}
            />
            <MultiSelect
              label=""
              placeholder="Enter City"
              data={[
                {
                  group: "State",
                  items: [
                    { value: "1", label: "Bengaluru" },
                    { value: "2", label: "Delhi" },
                  ],
                },
                {
                  group: "Projects",
                  items: [
                    { value: "2*2", label: "Bengaluru" },
                    { value: "2*3", label: "Delhi" },
                  ],
                },
              ]}
              rightSection={<span></span>}
              onSearchChange={onSearchChange}
              searchable
              clearable
              nothingFoundMessage="Nothing found..."
              classNames={{
                input: classes.wrapperMultiSelection,
                pill: classes.MultiSelectionPill,
              }}
              dropdownOpened={false}
              onFocus={() => open()}
            />
          </div>

          <button className="flex justify-center items-center gap-2.5 px-4 py-2 rounded-[9.29px] bg-[#0073c6] ext-white text-base not-italic font-bold text-white">
            Search
          </button>
        </div>
        <section className="p-5 grid gap-5 border-t  ">
          <div>
            <h5 className="text-[#303030] text-base not-italic font-medium mb-2">
              Select Property Type
            </h5>
            <div className="flex gap-5 my-2 flex-wrap">
              {keys.map((keyName) => (
                <Button
                  key={keyName}
                  value={propertyDetailsTypes?.get(keyName)?.name ?? ""}
                  onClick={() =>
                    setPropTypes(
                      propertyDetailsTypes?.get(keyName)?.id as number
                    )
                  }
                  selected={
                    filters.propTypes === propertyDetailsTypes?.get(keyName)?.id
                  }
                ></Button>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-[#303030] text-base not-italic font-medium mb-2">
              Select BHK Type
            </h5>
            <div className="flex gap-6 flex-wrap">
              {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
                <Button
                  key={bhk.value}
                  value={bhk.title}
                  onClick={() => handleCheckboxClick("unitTypes", bhk.value)}
                  selected={filters.unitTypes.includes(bhk.value)}
                ></Button>
              ))}
            </div>
          </div>

          <div className="   gap-[4%]   ">
            <h3 className="  mb-[2%] text-[14px]   text-[#303030] text-base not-italic font-medium">
              Budget
            </h3>
            <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
              ₹ {filters.bugdetValue[0]} - ₹ {filters.bugdetValue[1]} Cr
            </p>
            <RangeSlider
              key="budgetSlider"
              marks={[
                { value: 0, label: "₹ 0" },
                { value: 0.5, label: "₹ 0.5 Cr" },
                { value: 1, label: "₹ 1 Cr" },
                { value: 1.5, label: "₹ 1.5 Cr" },
                { value: 2, label: "₹ 2 Cr" },
                { value: 2.5, label: "₹ 2.5 Cr" },
                { value: 3, label: "₹ 3 Cr" },
                { value: 3.5, label: "₹ 3.5 Cr" },
                { value: 4, label: "₹ 4 Cr" },
                { value: 4.5, label: "₹ 4.5 Cr" },
                { value: 5, label: "₹ 5 Cr" },
              ]}
              minRange={0.2}
              min={0}
              max={5}
              step={0.05}
              onChange={(value) => handleSliderChange("bugdetValue", value)}
              style={{ width: "100%" }}
              defaultValue={[
                filters?.bugdetValue[0] ?? 0,
                filters?.bugdetValue[1] ?? 5,
              ]}
            />
          </div>
        </section>
      </div>
      <CloseSvg onClick={() => close()} />
    </div>
  );
};
export default SearchDrawerHeader;

const CloseSvg = ({ onClick }: any) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      className="absolute top-0 right-10 cursor-pointer"
    >
      <g filter="url(#filter0_d_1706_56774)">
        <rect x="4" width="38" height="38" rx="19" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M31.6588 11.987C31.7669 11.879 31.8526 11.7509 31.9112 11.6098C31.9697 11.4687 31.9999 11.3174 32 11.1647C32.0001 11.0119 31.9701 10.8606 31.9117 10.7195C31.8534 10.5783 31.7678 10.45 31.6598 10.3419C31.5519 10.2338 31.4237 10.1481 31.2826 10.0895C31.1415 10.031 30.9903 10.0008 30.8375 10.0007C30.6847 10.0006 30.5335 10.0306 30.3923 10.089C30.2511 10.1474 30.1228 10.233 30.0148 10.3409L22.9999 17.3559L15.987 10.3409C15.7687 10.1226 15.4726 10 15.1639 10C14.8552 10 14.5592 10.1226 14.3409 10.3409C14.1226 10.5592 14 10.8553 14 11.164C14 11.4727 14.1226 11.7687 14.3409 11.987L21.3558 19L14.3409 26.013C14.2328 26.1211 14.1471 26.2494 14.0886 26.3906C14.0301 26.5318 14 26.6832 14 26.836C14 26.9889 14.0301 27.1403 14.0886 27.2815C14.1471 27.4227 14.2328 27.551 14.3409 27.6591C14.5592 27.8774 14.8552 28 15.1639 28C15.3168 28 15.4681 27.9699 15.6093 27.9114C15.7506 27.8529 15.8789 27.7672 15.987 27.6591L22.9999 20.6441L30.0148 27.6591C30.233 27.8771 30.529 27.9995 30.8375 27.9993C31.146 27.9991 31.4418 27.8764 31.6598 27.6581C31.8778 27.4398 32.0002 27.1438 32 26.8353C31.9998 26.5268 31.8771 26.231 31.6588 26.013L24.6439 19L31.6588 11.987Z"
          fill="#FF0000"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1706_56774"
          x="0"
          y="0"
          width="46"
          height="46"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1706_56774"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1706_56774"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
