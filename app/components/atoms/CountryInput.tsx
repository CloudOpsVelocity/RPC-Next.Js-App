"use client";

import { isdDetailsList } from "@/app/data/isdDetails";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

type props = {
  onSelect: any;
  className: string;
};

export default function CountryInput({ onSelect, className }: props) {
  const [selected, setSelected] = useState("+91");
  return (
    <select
      name="isd"
      onChange={(e) => setSelected(e.target.value)}
      className={clsx(className, "text-black font-medium")}
      style={{ width: `${selected.length * 16.5}px` }}
      value={selected}
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
