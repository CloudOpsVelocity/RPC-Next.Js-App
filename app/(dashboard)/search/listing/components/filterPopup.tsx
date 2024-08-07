"use client";
import React, { useRef, useState } from "react";
import { ListingSearchDetails, searchDetails } from "@/app/data/searchDetails";
import Button from "@/app/elements/button";
import {
  DropDownIcon,
  fourStarIcon,
  lensSvg,
  miniItemsCrossIcon,
  notificationIcon,
} from "@/app/images/commonSvgs";
import {
  Checkbox,
  MultiSelect,
  Radio,
  RangeSlider,
  ScrollArea,
} from "@mantine/core";
import classes from "@/app/styles/search.module.css";
import { projectprops, propertyDetailsTypes } from "@/app/data/projectDetails";
import ClearAll from "./ClearAll";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useSearchFilters from "@/app/hooks/search";
import { useDebouncedState } from "@mantine/hooks";
import { useQuery } from "react-query";
import { getData } from "@/app/utils/api/search";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const FilterPopup = () => {
  const path = usePathname();
  const [current, setCurrent] = useState("Bhk");
  const propKeys = [35, 33, 31, 34, 32];
  const [localitySearch, setSearchLocality] = useDebouncedState("", 500);

  const { data } = useQuery({
    queryFn: () => getData(localitySearch, "loc"),
    queryKey: ["search" + "loc" + localitySearch],
    enabled: localitySearch !== "",
  });

  const {
    filters,
    handleCheckboxClick,
    setPropTypes,
    handleSliderChange,
    setFilters,
    remnoveSearchOptions,
    setSingleType,
    isFilterApplied,
  } = useSearchFilters();
  const viewport = useRef<HTMLDivElement>(null);
  const scrollWhereIsSelected = (item: string) => {
    setCurrent(item);
    // @ts-ignore
    const selectedElement = document.getElementById(item);

    if (selectedElement) {
      const titleHeight = selectedElement?.offsetHeight || 0;
      const position = selectedElement.offsetTop - titleHeight;

      viewport.current!.scrollTo({
        top: position - 20,
        behavior: "smooth",
      });
    }
  };
  const filteredSearchDetails =
    filters.propTypes === projectprops.plot
      ? ListingSearchDetails.filter(
          (item) => !["Parking", "Unit Type", "Bath"].includes(item)
        )
      : ListingSearchDetails;
  return (
    <div className=" flex justify-start items-start w-[70vw] top-[160px] left-[70%]">
      <div className="w-[20%] flex shadow-md justify-start items-center flex-col ">
        <p className=" text-[#000] text-[16px] bg-[#F4F4F4] flex justify-start px-6  items-center font-[500] py-[3.5%] w-full ">
          Quick Filters
        </p>
        <div className="w-full ">
          {filteredSearchDetails.map((eachItem, index) => {
            return (
              <Button
                key={index}
                title={eachItem}
                onChange={() => scrollWhereIsSelected(eachItem)}
                buttonClass={clsx(
                  `whitespace-nowrap w-full text-[15px] flex flex-row-reverse justify-end pl-[10%] items-center border-solid border-b-[0.5px] items-start px-4 py-4 h-[31px] gap-[8px]`,
                  current == eachItem
                    ? "text-[#148B16] bg-[#F1F9FF] font-[700]"
                    : "text-[#202020] bg-[#FCFCFC] font-[500]"
                )}
                icon={
                  current == eachItem || isFilterApplied(eachItem)
                    ? fourStarIcon
                    : ""
                }
              />
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <ClearAll type="all" />
        {/* Right Side Fields Con */}
        <ScrollArea
          h={400}
          className="w-full pt-[1%] pl-[2%]    "
          viewportRef={viewport}
        >
          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[1%] "
                id="Bhk"
              >
                BHK
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
            </React.Fragment>
          )}
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] "
            id="Project Status"
          >
            Property Status
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            {SEARCH_FILTER_DATA.listingStatus.map((eachStatus, index) => {
              return (
                <Radio
                  checked={eachStatus.cid == filters.propStatus}
                  value={eachStatus.cid}
                  iconColor="dark.8"
                  color="green"
                  onChange={() => setSingleType("propStatus", eachStatus.cid)}
                  label={eachStatus.Label}
                  name="propertyStatus"
                />
              );
            })}
          </div>
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] flex items-center gap-[5px] "
            id="Property Type"
          >
            Property Type {/* {notificationIcon} */}
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
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] flex items-center gap-[5px] "
            id="Posted By"
          >
            Listed By
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {SEARCH_FILTER_DATA.listedBy
              .filter(({ value }) => !(value === "B" && path === "/search"))
              .map(({ value, constDesc }, i) => (
                <Radio
                  key={i}
                  iconColor="dark.8"
                  color="green"
                  label={constDesc}
                  value={value}
                  name="ListedBy"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("listedBy", value)}
                  checked={filters.listedBy === value}
                />
              ))}
          </div>

          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] "
            id="Locality"
          >
            Locality
          </h3>

          {filters.locality.length > 0 && (
            <div className="flex mb-[3%] justify-start items-start gap-[4%]">
              {filters.locality.map((eachLocality, index) => {
                return (
                  <div
                    key={index}
                    className="capitalize flex justify-center items-center p-[1%] r shadow-[0px_4px_10px_0px_rgba(202,233,255,0.30)]   border rounded-[5px] border-solid border-[#92B2C8]"
                  >
                    {eachLocality.split("+")[0]}
                    <span
                      className="cursor-pointer "
                      onClick={() => remnoveSearchOptions(index, "locality")}
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
            data={data}
            searchable
            nothingFoundMessage={
              localitySearch !== "" ? "Nothing found..." : "Search somehitng..."
            }
            value={filters.locality}
            comboboxProps={{ withinPortal: false }}
            onChange={(value) => setFilters({ ...filters, locality: value })}
            leftSectionPointerEvents="none"
            leftSection={lensSvg}
            style={{ width: "50%" }}
            onSearchChange={(value) => setSearchLocality(value)}
            rightSection={<DropDownIcon />}
          />

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] "
                id="Facing"
              >
                Facing
              </h3>
              <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
                {SEARCH_FILTER_DATA.facing.map((x, i) => {
                  return (
                    <Checkbox
                      key={i}
                      label={x.constDesc}
                      color="green"
                      onClick={() => handleCheckboxClick("facings", x.cid + 1)}
                      checked={filters.facings.includes(x.cid + 1)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] "
                id="Bath"
              >
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
                      checked={filters.bathRooms.includes(i + 1)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] "
            id="Budget"
          >
            Budget
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            ₹ {filters.bugdetValue[0]} - ₹ {filters.bugdetValue[1]} Cr
          </p>
          <RangeSlider
            color="green"
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
            style={{ width: "80%" }}
            defaultValue={[filters.bugdetValue[0], filters.bugdetValue[1]]}
            mb={"5%"}
          />
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] "
            id="Area"
          >
            Area
          </h3>
          <p className="text-[#4D6677] text-[16px] font-[600] mb-[2%] ">
            {filters.areaValue[0]} sq.ft - {filters.areaValue[1]} sq.ft
          </p>
          <RangeSlider
            color="green"
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
            mb={"5%"}
          />

          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] flex items-center gap-[5px] "
            id="Photos & Videos"
          >
            Photos & Videos
          </h3>
          <div className="flex  mb-[3%] justify-start items-start flex-wrap gap-[4%]">
            {SEARCH_FILTER_DATA.photoAvail.map(({ id, label }, i) => {
              return (
                <Radio
                  key={i}
                  iconColor="dark.8"
                  color="green"
                  label={label}
                  value={id}
                  name="propertyType"
                  style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                  onClick={() => setSingleType("pnb", id)}
                  checked={filters.pnb === id}
                />
              );
            })}
          </div>
          <React.Fragment>
            <h3
              className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] "
              id="Furnishing"
            >
              Furnishing
            </h3>
            <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
              {SEARCH_FILTER_DATA.furnish.map(({ constDesc, cid }, i) => {
                return (
                  <Radio
                    key={i}
                    iconColor="dark.8"
                    color="green"
                    label={constDesc}
                    value={cid}
                    name="ListedBy"
                    style={{ whiteSpace: "nowrap", marginBottom: "10px" }}
                    onClick={() => setSingleType("furnish", cid)}
                    checked={filters.furnish === cid}
                  />
                );
              })}
            </div>
          </React.Fragment>
          <h3
            className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[3%] "
            id="Amenities"
          >
           <div className="flex  mb-[3%] justify-start items-center gap-[4%] flex-wrap ">
            <Checkbox label="Lift" color="green" />
            {SEARCH_FILTER_DATA.amenities.map((i, ind)=>{
              return(
                <Checkbox
                className="my-2"
                      key={i.cid}
                      label={i.constDesc}
                      color="green"
                      onClick={() => handleCheckboxClick("amenities", i.cid)}
                      checked={filters.amenities.includes(i.cid)}
                    />
              )
            })}
          </div>
          </h3>
          <div className="flex  mb-[3%] justify-start items-start gap-[4%]">
            <Checkbox label="Lift" color="green" />
          </div>

          {filters?.propTypes != projectprops.plot && (
            <React.Fragment>
              <h3
                className=" text-[#202020] mb-[2%] text-[14px] font-[500] mt-[5%] "
                id="Parking"
              >
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
                      checked={filters.parkings.includes(i + 1)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export { FilterPopup };
