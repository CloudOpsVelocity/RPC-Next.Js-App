import config from "./config";
import Button from "./button";
import { useState } from "react";
import { Checkbox, Pill, PillsInput, Transition } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaLocationDot } from "react-icons/fa6";
import { useClickOutside } from "@mantine/hooks";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Transform } from "stream";
import useSearchFilters from "@/app/hooks/search";
import { propertyDetailsTypes } from "@/app/data/projectDetails";
import { SEARCH_FILTER_DATA } from "@/app/data/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import FilterSection from "@/app/(dashboard)/search/components/filter/filter";
import Results from "@/app/(dashboard)/search/components/filter/results";
import classes from "@/app/styles/search.module.css";
import { filterParser } from "@/app/utils/search";
import { createQueryString } from "@/app/utils/search/query";

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
  const {
    filters: f,
    setPropTypes,
    handleCheckboxClick,
    handleSliderChange,
    remnoveSearchOptions,
    setFilters,
  } = useSearchFilters();
  const { onSearchChange, debounced, name } = useQsearch();

  const [userLocation, setUserLocation] = useState(null);

  // Function to get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      // Request user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          // Extract latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          // Set user's location in state
          // @ts-ignore
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  const [opened, { close, toggle, open }] = useDisclosure(false);
  const wrapperRef = useClickOutside(() => close());

  // styles
  const rangeSliderClasses = {
    bar: "!bg-transparent",
    thumb: "!bg-green-600 !border-none",
  };

  // handlers

  const keys = [35, 33, 31, 34, 32];
  const handleSearch = () => {
    const parsedData = filterParser(f);
    const query = createQueryString(parsedData);
    return query.replace("+", "%2B");
  };
  return (
    <>
      <div
        ref={wrapperRef}
        className="border border-[#CBE9FF] rounded-3xl bg-white  w-full overflow-hidden relative"
        style={{ boxShadow: "0px 4px 14px 0px rgba(116, 196, 255, 0.19)" }}
      >
        <section className="w-full grid grid-cols-[300px_auto] h-[80px]">
          <div className="grid items-center">
            <button
              onClick={toggle}
              className="text-[16px] md:text-[20px] lg:text-[24px] text-[#737579] text-center flex items-center justify-center gap-5"
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
            <div className="border-l flex gap-3 px-3 place-items-center">
              <div className="flex items-center ">
                <FaLocationDot size={20} />
              </div>
              <PillsInput classNames={{ input: classes.homePageSearch }}>
                <Pill.Group>
                  {f.city && (
                    <Pill
                      className="capitalize"
                      withRemoveButton
                      classNames={{ root: classes.MultiSelectionPill }}
                      onRemove={() =>
                        setFilters((prev) => ({ ...prev, city: null }))
                      }
                    >
                      {f.city.split("+")[0]}
                    </Pill>
                  )}
                  {f.locality?.map((each, index) => (
                    <Pill
                      className="capitalize"
                      onRemove={() => remnoveSearchOptions(each, "locality")}
                      key={index}
                      withRemoveButton
                      classNames={{ root: classes.MultiSelectionPill }}
                    >
                      {each.split("+")[0]}
                    </Pill>
                  ))}

                  <PillsInput.Field
                    onFocus={open}
                    placeholder={
                      f.locality.length > 0
                        ? "Add More"
                        : "Enter City,Locality & Project"
                    }
                    value={name ?? ""}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </Pill.Group>
              </PillsInput>
            </div>

            <div className="flex items-center px-3">
              <button
                className="text-[16px] md:text-[20px] lg:text-[24px] flex items-center gap-3 text-slate-500"
                onClick={getUserLocation}
              >
                <FaLocationCrosshairs size={22} />
                Near Me
              </button>
            </div>

            <div className="flex items-center">
              <a
                target="_blank"
                href={`/search?${handleSearch()}`}
                className="bg-green-600  text-[24px] text-white py-2 rounded-xl  px-5 "
              >
                Search
              </a>
            </div>
          </div>
        </section>
        {opened &&
          (!debounced ? (
            <section className="p-5 grid gap-5 border-t  ">
              <h5 className="text-sm font-semibold ">Select Property Type</h5>
              <div className="flex gap-14 my-2 flex-wrap">
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
                      f.propTypes === propertyDetailsTypes?.get(keyName)?.id
                    }
                  ></Button>
                ))}
              </div>

              <div>
                <h5 className="text-sm font-semibold mb-6">Select BHK Type</h5>
                <div className="flex gap-6  flex-wrap">
                  {SEARCH_FILTER_DATA.bhkDetails.map((bhk) => (
                    <Button
                      key={bhk.value}
                      value={bhk.title}
                      onClick={() =>
                        handleCheckboxClick("unitTypes", bhk.value)
                      }
                      selected={f.unitTypes.includes(bhk.value)}
                    ></Button>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-start items-start flex-col md:flex-row">
                <div className="w-[100%] md:w-[70%] mb-[3%] ">
                  <h5 className="text-sm font-semibold mb-2">Budget</h5>
                  <p className="flex">
                    Price Range
                    <p className="text-green-600 font-semibold ml-2">
                      ₹{f.bugdetValue.at(0)} - ₹{f.bugdetValue.at(1)}
                    </p>
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
                    onChange={(value) =>
                      handleSliderChange("bugdetValue", value)
                    }
                    style={{ width: "100%" }}
                    defaultValue={[
                      f?.bugdetValue[0] ?? 0,
                      f?.bugdetValue[1] ?? 5,
                    ]}
                  />
                </div>
              </div>
            </section>
          ) : (
            <Results />
          ))}
      </div>
    </>
  );
};

export default Searchbar;
