"use client";

import { isdDetailsList } from "@/app/data/isdDetails";
import React from "react";

type props = {
  onSelect: any;
  className: string;
};

// const str = "+91 India";

// const result = str.split(/[ ]+/)[0];

export default function CountryInput({ onSelect, className }: props) {
  return (
    <select
      id="isdCodes"
      name="isd"
      onChange={(e) => onSelect(e.target.value)}
      className={className}
    >
      <option value="ISD" hidden>
        ISD
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
