import React from "react";
import HeaderActions from "./HeaderActions";
import MainSection from "./Main";

type Props = {
  partialUnitData: any;
  projName: string;
  phaseList: any;
};

export default function PartialUnitData({
  partialUnitData,
  projName,
  phaseList,
}: Props) {
  return (
    <div
      className={`w-[90%] scroll-mt-[180px] mb-[2%] sm:mb-[5%]  ${partialUnitData.length >0 && "min-h-[300px]"}`}
      id="floorPlans"
    >
      <HeaderActions
        partialUnitData={partialUnitData}
        projName={projName}
        phaseList={phaseList}
      />
      <MainSection partialUnitData={partialUnitData} />
      
    </div>
  );
}
