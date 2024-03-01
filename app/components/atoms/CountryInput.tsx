"use client";

import { isdDetailsList } from "@/app/data/isdDetails";
import React, {useRef} from "react";

type props = {
  onSelect: any;
  className: string;
};

export default function CountryInput({ onSelect, className }: props) {
    // let Country = 
  
    // useEffect(() => {
    //   var countrycode = document.getElementById("isdCodes");
    //   countrycode.options[countrycode.selectedIndex].text = "+91";
    // }, []);

    // const [isdValue, setIsdidValue] = useState("");

    // const displayCountryCode = () => {
    //   var countrycode = document.getElementById("isdCodes");
    //   setIsdidValue(countrycode.options[countrycode.selectedIndex].text);
    //   countrycode.options[countrycode.selectedIndex].text = countrycode.value;
    // };

    // $("#isdCodes").mousedown(function () {
    //   var countrycode = document.getElementById("isdCodes");
    //   countrycode.options[countrycode.selectedIndex].text = isdValue;
    // });

  return (
    <select
      id="isdCodes"
      name="isd"
      onChange={(e) => onSelect(e.target.value.split(" ")[0])}
      className={className}
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
