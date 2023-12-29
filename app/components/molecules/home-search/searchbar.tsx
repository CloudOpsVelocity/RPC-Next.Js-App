import config from "./config";
import Button from "./button";
import { useState } from "react";
import { Checkbox, Transition } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaLocationDot } from "react-icons/fa6";
import { useClickOutside } from "@mantine/hooks";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Transform } from "stream";

interface filters {
  bhks: string[];
  postedBy: string;
  houseType: string[];
  propertyType: string;
  priceRange: [number, number];
}

const initialFilters: filters = {
  bhks: [],
  postedBy: "",
  houseType: [],
  propertyType: "",
  priceRange: [0, 100],
};

const Searchbar = () => {
  const [filters, setFilters] = useState<filters>(initialFilters);
  const [opened, { close, toggle }] = useDisclosure(false);
  const wrapperRef = useClickOutside(() => close());

  // styles
  const rangeSliderClasses = {
    bar: "!bg-transparent",
    thumb: "!bg-green-600 !border-none",
  };

  // handlers
  const handlePropertyType = (type: string) => {
    return setFilters((prev) => ({
      ...prev,
      houseType: prev.houseType.includes(type)
        ? prev.houseType.filter((b) => b !== type)
        : [...prev.houseType, type],
    }));
  };

  const handleBHK = (bhk: string) => {
    return setFilters((prev) => ({
      ...prev,
      bhks: prev.bhks.includes(bhk)
        ? prev.bhks.filter((b) => b !== bhk)
        : [...prev.bhks, bhk],
    }));
  };
  const handlePostedBy = (by: string) => {
    return setFilters((prev) => ({ ...prev, postedBy: by }));
  };
  const rangeSlider = (range: [number, number]) => {
    return setFilters((prev) => ({ ...prev, priceRange: range }));
  };

  return (
    <>
      {/* {JSON.stringify(filters)} */}
      {/* uncomment this to see the filters state in action */}
      <div
        ref={wrapperRef}
        className="border border-[#CBE9FF] rounded-3xl bg-white  w-full overflow-hidden relative"
        style={{ boxShadow: "0px 4px 14px 0px rgba(116, 196, 255, 0.19)" }}
      >
        <section className="w-full grid grid-cols-[300px_auto] h-[80px]">
          <div className="grid items-center">
            <button
              onClick={toggle}
              className="text-[24px] text-[#737579] text-center flex items-center justify-center gap-5"
            >
              Residential{" "}
              <FaCaretDown
                style={{
                  transform: opened ? "rotate(180deg)" : "",
                  transitionDuration: "0.5s",
                }}
              />
            </button>
          </div>
          <div className="grid grid-cols-[auto_auto_auto] ">
            <div className="border-l flex gap-3 px-3">
              <div className="flex items-center">
                <FaLocationDot size={20} />
              </div>
              <input
                className="h-full text-[24px] placeholder:text-slate-500 placeholder:text-[24px] w-full border-none outline-none "
                type="text"
                name=""
                id=""
                placeholder="Search By Location"
              />
            </div>

            <div className="flex items-center px-3">
              <button className="flex items-center gap-3 text-[24px] text-slate-500">
                <FaLocationCrosshairs size={22} />
                Near Me
              </button>
            </div>

            <div className="flex items-center">
              <button className="bg-green-600  text-[24px] text-white py-2 rounded-xl  px-5 ">
                Search
              </button>
            </div>
          </div>
        </section>
        {opened && (
          <section className="p-5 grid gap-5 border-t  ">
            <div className="flex gap-14 my-2 flex-wrap">
              {config.houseType.map((type) => (
                <Checkbox
                  size="md"
                  key={type}
                  label={type}
                  onClick={() => handlePropertyType(type)}
                >
                  {type}
                </Checkbox>
              ))}
            </div>

            <div>
              <h5 className="text-sm font-semibold mb-2">BHKs</h5>
              <div className="flex gap-6 flex-wrap">
                {config.bhks.map((bhk) => (
                  <Button
                    key={bhk}
                    value={bhk}
                    onClick={() => handleBHK(bhk)}
                    selected={filters.bhks.includes(bhk)}
                  ></Button>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-start items-start flex-col md:flex-row">
              <div className="w-[100%] md:w-[40%] mb-[3%] ">
                <h5 className="text-sm font-semibold mb-2">Budget</h5>
                <p className="flex">
                  Price Range
                  <p className="text-green-600 font-semibold ml-2">
                    ₹{filters.priceRange.at(0)} - ₹{filters.priceRange.at(1)}
                  </p>
                </p>

                <RangeSlider
                  min={0}
                  step={1}
                  max={1000}
                  minRange={0}
                  thumbSize={14}
                  onChange={rangeSlider}
                  classNames={rangeSliderClasses}
                  defaultValue={filters.priceRange}
                />
              </div>

              <div className="w-[100%] md:w-[40%] mb-[3%]">
                <h5 className="text-sm font-semibold mb-2">Posted by</h5>
                <div className="flex gap-5">
                  {config.postedBy.map((by) => (
                    <Button
                      key={by}
                      value={by}
                      selected={filters.postedBy === by}
                      onClick={() => handlePostedBy(by)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default Searchbar;
