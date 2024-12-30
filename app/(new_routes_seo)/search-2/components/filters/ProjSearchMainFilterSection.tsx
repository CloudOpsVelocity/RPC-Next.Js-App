import React, { memo } from "react";
import ProjectFilters from "./ProjectHeaderFilter";
import ProjSearchCityDropDown from "../FilterComponents/city/ProjectSearchCityDropdown";

type Props = {};

function ProjSearchMainFilterSection({}: Props) {
  return (
    <div className="flex flex-row items-start gap-2 ">
      <ProjSearchCityDropDown />
      <ProjectFilters />
    </div>
  );
}

export default memo(ProjSearchMainFilterSection);
