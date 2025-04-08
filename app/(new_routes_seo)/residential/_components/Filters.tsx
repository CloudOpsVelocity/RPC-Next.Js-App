"use client";
import { BasicMultiSelect } from "@/app/(dashboard)/new/components/home-search/filters/BhkTypeSelect";
import { BasicBudgetSelect } from "@/app/(dashboard)/new/components/home-search/filters/BugdetSelect";
import { BasicSelect } from "@/app/(dashboard)/new/components/home-search/filters/Select";
import { toQueryParams } from "@/app/(dashboard)/new/utils/param";
import { homeSearchFiltersAtom } from "@/app/store/home";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {};
const propertyTypes = ["All", "Villa", "Apartment", "Villament", "Plot"];
const priceRanges = [
  "All",
  "Under ₹80 Lakhs",
  "₹80L - ₹1.2 Cr",
  "Above ₹1.2 Cr",
];
const locations = [
  "All",
  "Kengeri",
  "Electronic City",
  "Whitefield",
  "Sarjapur Road",
];

export default function Filters({}: Props) {
  const router = useRouter();
    const [f, dispatch] = useAtom(homeSearchFiltersAtom);
    const onSearch=()=>{
     // alert(JSON.stringify(f))
      const whichPage = (f.propType === 36) ? "/search/listing" : "/search"
      router.push(`${whichPage}?sf=${toQueryParams(f)}`);          
    }

  return (
    <section className=" container mx-auto mt-16 px-4">
      <div className="bg-card shadow-xl rounded-xl p-6 z-[500] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Property Type
            </label>
            <select
              className="w-full p-3 border rounded-lg bg-background"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select className="w-full p-3 border rounded-lg bg-background">
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget</label>
            <select className="w-full p-3 border rounded-lg bg-background">
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div> */}
              <BasicSelect />
                <div className="order-1 sm:order-none">
                  <BasicMultiSelect />
                </div>
             {   <BasicBudgetSelect/>}
          <div className="flex items-end">
            <button onClick={onSearch} className="w-full bg-primary hover:bg-primary/90 p-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <FaSearch /> Search Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
