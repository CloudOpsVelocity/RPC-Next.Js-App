import { propertyDetailsTypes, projectprops } from "../data/projectDetails";
import Button from "../elements/button";
import React, { useState } from "react";
import {
  PlotIcon,
  VillamentIcon,
  VillaIcon,
  RowHouseIcon,
  ApartmentIcon,
} from "../images/commonSvgs";

type Props = {
  phases: any[];
  setCurrentPhase: any;
  currentPhase: any;
};

export default function FloorplansBlock({
  phases,
  setCurrentPhase,
  currentPhase,
}: Props) {
  const [allKeys, setAllKeys] = useState([35, 33, 31, 34, 32]);
  const [propCgId, setPropCgId] = useState("");

  const getPropertyType = (data: any) => {
    setPropCgId(data.id);
    console.log(data);
  };

  const iconStyles: string =
    " flex items-center justify-center w-[40px] h-[40px] bg-[#FAFDFF] rounded-[50%] ";

  const getIcon = (id: number) => {
    if (id == projectprops.apartment) {
      return <ApartmentIcon className={iconStyles} />;
    } else if (id == projectprops.rowHouse) {
      return <RowHouseIcon className={iconStyles} />;
    } else if (id == projectprops.villa) {
      return <VillaIcon className={iconStyles} />;
    } else if (id == projectprops.villament) {
      return <VillamentIcon className={iconStyles} />;
    } else if (id == projectprops.plot) {
      return <PlotIcon className={iconStyles} />;
    }
  };

  return (
    <div className="w-[90%] mb-[5%]">
      <h1 className="text-[32px] font-[600] text-[#001F35]">
        FLOOR PLANS for sarang by sumadhura
      </h1>
      <p className="text-[24px] font-[500] text-[#4D6677]">
        see floor plans as per your selected property type
      </p>
      <div className=" flex justify-start items-center mt-[2%] mb-[2%]">
        <p className="text-[24px] font-[500] text-[#333] mr-[20px] ">
          Select one of the phase to see project details
        </p>
        <div className=" flex justify-start items-start ">
          {phases.map((each, index) => {
            return (
              <Button
                title={`Phase ${each}`}
                onChange={() => setCurrentPhase(`${each}`)}
                buttonClass={` text-[20px] bg-[#ECF7FF] p-[16px] mr-[40px] whitespace-nowrap text-[#000] rounded-[8px] ${
                  currentPhase == `${each}`
                    ? " font-[600] border-solid border-1 border-[#0073C6] "
                    : " font-[400]"
                } `}
              />
            );
          })}
        </div>
      </div>
      <div className=" flex justify-start items-start ">
        {propertyDetailsTypes != undefined &&
          propertyDetailsTypes != null &&
          allKeys.map((keyName, ind) => {
            let name =
              //@ts-ignore
              propertyDetailsTypes.get(keyName).name != undefined
                ? //@ts-ignore
                  propertyDetailsTypes.get(keyName).name
                : "";
            return (
              <Button
                key={keyName}
                buttonClass={`flex justify-start bg-[#D5EDFF] items-center ml-[24px] text-[18px] ${
                  propCgId == `${keyName}`
                    ? "text-[#001F35] font-[500]"
                    : "text-[#303A42] font-[400]"
                } `}
                onChange={() =>
                  getPropertyType(propertyDetailsTypes.get(keyName))
                }
                title={name}
                icon={getIcon(keyName)}
              />
            );
          })}
      </div>
    </div>
  );
}
