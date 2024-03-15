"use client";

import { isdDetailsList } from "@/app/data/isdDetails";
import React, { useRef, useState } from "react";

type props = {
  onSelect: any;
  className: string;
};

export default function CountryInput({ onSelect, className }: props) {
  const [isdValue, setIsdidValue] = useState("+91 India");
  const countryRef = useRef<any>(null);
  const displayCountryCode = () => {
    setIsdidValue(
      countryRef.current.options[countryRef.current?.selectedIndex].text
    );
    countryRef.current.options[countryRef.current.selectedIndex].text =
      countryRef.current.value;
    onSelect(countryRef.current.value);
  };

  countryRef.current?.addEventListener("mousedown", () => {
    countryRef.current.options[countryRef.current.selectedIndex].text =
      countryRef.current.value;
  });

  return (
    <select
      //id="isdCodes"
      ref={countryRef}
      name="isd"
      //onChange={(e) => onSelect(e.target.value.split(" ")[0])}
      onChange={() => displayCountryCode()}
      className={className}
      style={{ width: `${isdValue.length * 6}px` }}
      // value={}
    >
      <option value="ISD" hidden>
        +91
      </option>
      {isdDetailsList.map((eachOne, ind) => {
        return (
          <option
            key={ind}
            className="dropdown-item widthContactDropDown"
            value={eachOne.id}
          >{`${eachOne.id} ${eachOne.name}`}</option>
        );
      })}
    </select>
  );
}
