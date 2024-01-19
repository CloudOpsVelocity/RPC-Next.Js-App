import React, { useState } from 'react';
import { searchDetails } from '../data/searchDetails';
import Button from "@/app/elements/button";
import { fourStarIcon } from '../images/commonSvgs';

const FilterPopup = () => {
    const [current, setCurrent] = useState("Project Status")
    return(
        <div className=" flex justify-start  items-start w-[70vw] top-[160px] left-[300px] absolute rounded-[10px] shadow-md bg-[#FFF]">
            <div className="w-[20%] flex shadow-md justify-start items-center flex-col ">
                <p className=" text-[#000] text-[16px] flex justify-center items-center font-[500] p-[2%] w-full ">
                    Quick Filters
                </p>
                <div className="w-full ">
                {searchDetails.map((eachItem, index) => {
                    return(
                        <Button 
                            key={index}
                            title={eachItem}
                            onChange={()=>setCurrent(eachItem)}
                            buttonClass={` whitespace-nowrap w-full text-[12px] flex flex-row-reverse  justify-end pl-[10%] items-center border-solid border-b-[0.5px] items-start font-[500] p-[2%] gap-[8px] ${current == eachItem ? "text-[#148B16] bg-[#F1F9FF]" : "text-[#202020] bg-[#FCFCFC] "} `}
                            icon={current == eachItem ? fourStarIcon : ""}
                        />
                    )
                })}
                </div>

            </div>
            <div className="w-[80%]"></div>
        </div>
    )
};

export default FilterPopup;